require "test_helper"

class PublisherTest < Minitest::Test
  include BlogTestHelpers

  def setup
    @site = Dir.mktmpdir
    FileUtils.mkdir_p(File.join(@site, "_drafts"))
    @publisher = Blog::Publisher.new(site_root: @site, clock: fixed_clock)
  end

  def teardown
    FileUtils.rm_rf(@site)
  end

  def write_draft(name, contents)
    File.join(@site, "_drafts", name).tap { |path| File.write(path, contents) }
  end

  DRAFT = <<~MD
    ---
    title: "On Writing"
    tags: [craft]
    description: Thoughts.
    ---

    Body text with a --- horizontal rule inside.
  MD

  def test_moves_draft_into_posts_with_todays_date_prefix
    draft = write_draft("on-writing.md", DRAFT)

    path = @publisher.publish("on-writing")

    assert_equal File.join(@site, "_posts", "2026-09-30-on-writing.md"), path
    assert File.exist?(path)
    refute File.exist?(draft)
  end

  def test_accepts_a_path_to_the_draft_as_well_as_a_slug
    write_draft("on-writing.md", DRAFT)

    path = @publisher.publish("_drafts/on-writing.md")

    assert_equal "2026-09-30-on-writing.md", File.basename(path)
  end

  def test_adds_publish_date_directly_after_the_title
    write_draft("on-writing.md", DRAFT)

    path = @publisher.publish("on-writing")

    assert_equal ['title: "On Writing"', "date: 2026-09-30 14:05:09 -0500", "tags: [craft]"],
                 File.read(path).lines.map(&:chomp)[1, 3]
    assert_equal FIXED_TIME, front_matter_of(path)["date"]
  end

  def test_replaces_an_existing_date_rather_than_duplicating_it
    write_draft("dated.md", "---\ntitle: Dated\ndate: 2020-01-01\n---\nBody\n")

    path = @publisher.publish("dated")

    assert_equal 1, File.read(path).scan(/^date:/).size
    assert_equal FIXED_TIME, front_matter_of(path)["date"]
  end

  def test_adds_date_at_top_of_front_matter_when_there_is_no_title
    write_draft("untitled.md", "---\ntags: []\n---\nBody\n")

    path = @publisher.publish("untitled")

    assert_equal "date: 2026-09-30 14:05:09 -0500", File.read(path).lines[1].chomp
  end

  def test_leaves_the_body_untouched
    write_draft("on-writing.md", DRAFT)

    path = @publisher.publish("on-writing")

    assert_equal "\n\nBody text with a --- horizontal rule inside.\n", body_of(path)
  end

  def test_errors_when_the_draft_does_not_exist
    error = assert_raises(Blog::Error) { @publisher.publish("nope") }
    assert_match "No draft", error.message
  end

  def test_errors_when_the_draft_has_no_front_matter
    write_draft("bare.md", "Just text\n")

    error = assert_raises(Blog::Error) { @publisher.publish("bare") }
    assert_match "front matter", error.message
  end

  def test_refuses_to_overwrite_an_existing_post_and_keeps_the_draft
    draft = write_draft("on-writing.md", DRAFT)
    FileUtils.mkdir_p(File.join(@site, "_posts"))
    File.write(File.join(@site, "_posts", "2026-09-30-on-writing.md"), "already here")

    assert_raises(Blog::Error) { @publisher.publish("on-writing") }
    assert File.exist?(draft)
  end
end
