require "test_helper"

class DraftCreatorTest < Minitest::Test
  include BlogTestHelpers

  def setup
    @site = Dir.mktmpdir
    @creator = Blog::DraftCreator.new(site_root: @site)
  end

  def teardown
    FileUtils.rm_rf(@site)
  end

  def test_creates_draft_named_after_the_title_slug
    path = @creator.create("My First Draft")

    assert_equal File.join(@site, "_drafts", "my-first-draft.md"), path
    assert File.exist?(path)
  end

  def test_draft_front_matter_has_title_and_empty_tags_and_description_but_no_date
    path = @creator.create("My First Draft")

    assert_equal({ "title" => "My First Draft", "tags" => [], "description" => "" },
                 front_matter_of(path))
  end

  def test_title_with_quotes_and_colons_round_trips_through_yaml
    title = %q{Ruby: "the good parts" \ more}
    path = @creator.create(title)

    assert_equal title, front_matter_of(path)["title"]
  end

  def test_refuses_to_overwrite_an_existing_draft
    path = @creator.create("Keep Me")
    File.write(path, "my precious words")

    error = assert_raises(Blog::Error) { @creator.create("Keep me") }
    assert_match "already exists", error.message
    assert_equal "my precious words", File.read(path)
  end
end
