require "test_helper"
require "stringio"

class CLITest < Minitest::Test
  include BlogTestHelpers

  def setup
    @site = Dir.mktmpdir
    @out = StringIO.new
    @err = StringIO.new
    @cli = Blog::CLI.new(site_root: @site, clock: fixed_clock, out: @out, err: @err)
  end

  def teardown
    FileUtils.rm_rf(@site)
  end

  def test_new_post_joins_arguments_into_the_title_and_reports_the_relative_path
    assert_equal 0, @cli.new_post(%w[Hello there world])
    assert_equal "Created _drafts/hello-there-world.md\n", @out.string
  end

  def test_new_post_without_a_title_prints_usage_and_fails
    assert_equal 1, @cli.new_post([])
    assert_match "Usage: bin/new-post", @err.string
  end

  def test_publish_reports_the_new_post_path
    @cli.new_post(["Ship It"])

    assert_equal 0, @cli.publish(["ship-it"])
    assert_includes @out.string, "Published _posts/2026-09-30-ship-it.md\n"
  end

  def test_publish_without_an_argument_prints_usage_and_fails
    assert_equal 1, @cli.publish([])
    assert_match "Usage: bin/publish", @err.string
  end

  def test_errors_are_printed_without_a_backtrace_and_fail
    assert_equal 1, @cli.publish(["missing"])
    assert_equal "Error: No draft found for \"missing\"\n", @err.string
  end
end
