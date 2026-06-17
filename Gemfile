source "https://rubygems.org"

# Jekyll static site generator.
gem "jekyll", "~> 4.3"

# Plugins.
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.17"     # RSS/Atom feed at /feed.xml
  gem "jekyll-seo-tag", "~> 2.8"   # <title>, meta description, Open Graph
  gem "jekyll-sitemap", "~> 1.4"   # sitemap.xml
end

# Windows / JRuby timezone data and faster file watching.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Ruby 3.4+ no longer ships these as default gems.
gem "csv"
gem "base64"
gem "bigdecimal"
