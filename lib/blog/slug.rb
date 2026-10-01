module Blog
  # Turns a post title into the URL-safe slug used for its filename.
  module Slug
    def self.from(title)
      slug = title.downcase.delete("'’").gsub(/[^a-z0-9]+/, "-").gsub(/\A-|-\z/, "")
      raise Error, "Can't make a filename from title #{title.inspect}" if slug.empty?

      slug
    end
  end
end
