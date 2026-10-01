# Writing tools for this Jekyll site: start a draft, then publish it as a post.
# Used by the scripts in bin/; tested in test/.
module Blog
  # Raised for problems the writer should see as a plain message (no backtrace).
  class Error < StandardError; end
end

require "blog/slug"
require "blog/draft_creator"
require "blog/publisher"
require "blog/cli"
