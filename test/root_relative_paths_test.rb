require "test_helper"
require "blog/root_relative_paths"

# The live site is served under a baseurl (/portfolio), but Markdown images and
# links written as /assets/... or /about/ are emitted exactly as typed. These
# cover the rewrite that puts the baseurl in front of them.
class RootRelativePathsTest < Minitest::Test
  def prefix(html, baseurl = "/portfolio")
    Blog::RootRelativePaths.prefix(html, baseurl)
  end

  def test_prefixes_root_relative_image_sources
    assert_equal '<img src="/portfolio/assets/images/post/shot.png" alt="Shot">',
                 prefix('<img src="/assets/images/post/shot.png" alt="Shot">')
  end

  def test_prefixes_root_relative_links
    assert_equal '<a href="/portfolio/about/">about</a>', prefix('<a href="/about/">about</a>')
  end

  def test_handles_single_quoted_attributes_from_raw_html
    assert_equal "<img src='/portfolio/assets/a.png'>", prefix("<img src='/assets/a.png'>")
  end

  def test_leaves_absolute_protocol_relative_fragment_and_relative_urls_alone
    html = '<a href="https://example.com/x">a</a> <img src="//cdn.example.com/a.png"> ' \
           '<a href="#notes">b</a> <img src="shot.png">'
    assert_equal html, prefix(html)
  end

  def test_does_not_double_prefix_paths_already_under_the_baseurl
    html = '<img src="/portfolio/assets/a.png"> <a href="/portfolio">home</a>'
    assert_equal html, prefix(html)
  end

  def test_still_prefixes_paths_that_merely_start_with_the_same_letters
    assert_equal '<a href="/portfolio/portfolio-ideas/">x</a>', prefix('<a href="/portfolio-ideas/">x</a>')
  end

  def test_leaves_paths_shown_inside_code_samples_untouched
    html = '<pre class="highlight"><code>&lt;img src="/assets/a.png"&gt;</code></pre> ' \
           '<p>Inline <code>&lt;a href="/about/"&gt;</code> and <a href="/tags/">tags</a></p>'
    expected = html.sub('href="/tags/"', 'href="/portfolio/tags/"')
    assert_equal expected, prefix(html)
  end

  def test_ignores_attributes_that_only_end_in_src_or_href
    html = '<img data-src="/assets/a.png">'
    assert_equal html, prefix(html)
  end

  def test_changes_nothing_when_the_site_has_no_baseurl
    html = '<img src="/assets/a.png">'
    assert_equal html, prefix(html, "")
    assert_equal html, prefix(html, nil)
  end
end
