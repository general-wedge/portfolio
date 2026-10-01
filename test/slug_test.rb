require "test_helper"

class SlugTest < Minitest::Test
  def test_lowercases_and_hyphenates_words
    assert_equal "hello-world", Blog::Slug.from("Hello World")
  end

  def test_drops_punctuation_and_collapses_separators
    assert_equal "whats-new-in-ruby-3-4", Blog::Slug.from("What's new in Ruby 3.4?!")
  end

  def test_trims_leading_and_trailing_separators
    assert_equal "spaced-out", Blog::Slug.from("  --Spaced  out--  ")
  end

  def test_rejects_titles_with_no_usable_characters
    assert_raises(Blog::Error) { Blog::Slug.from("?!?") }
  end
end
