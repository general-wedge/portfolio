# Lets posts write images and links as /assets/... or /about/ and still work
# when the site is served under a baseurl. See lib/blog/root_relative_paths.rb.
require_relative "../lib/blog/root_relative_paths"

Jekyll::Hooks.register [:documents, :pages], :post_convert do |doc|
  doc.content = Blog::RootRelativePaths.prefix(doc.content, doc.site.config["baseurl"])
end
