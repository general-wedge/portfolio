module Blog
  # The site is served under a baseurl (e.g. /portfolio), but images and links
  # written in Markdown as /assets/... or /about/ come out exactly as typed.
  # This puts the baseurl in front of them; _plugins/root_relative_paths.rb
  # runs it on every converted post and page.
  module RootRelativePaths
    PATTERN = %r{
      (?<code><(?<tag>pre|code)\b.*?</\k<tag>>)               # code samples show paths, they don't use them
      |
      (?<=\s)(?<attr>(?:src|href)=(?<quote>["']))(?<path>/(?!/)[^"']*)
    }mx

    def self.prefix(html, baseurl)
      return html if baseurl.nil? || baseurl.empty?

      html.gsub(PATTERN) do
        match = Regexp.last_match
        next match[:code] if match[:code]

        path = match[:path]
        already_prefixed = path == baseurl || path.start_with?("#{baseurl}/")
        already_prefixed ? match[0] : "#{match[:attr]}#{baseurl}#{path}"
      end
    end
  end
end
