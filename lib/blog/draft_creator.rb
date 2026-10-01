require "fileutils"

module Blog
  # Creates a new, undated draft in _drafts/ with the site's standard front matter.
  # Jekyll shows drafts only when served with --drafts, so they never ship by accident.
  class DraftCreator
    def initialize(site_root:)
      @drafts_dir = File.join(site_root, "_drafts")
    end

    def create(title)
      path = File.join(@drafts_dir, "#{Slug.from(title)}.md")
      raise Error, "Draft already exists: #{path}" if File.exist?(path)

      FileUtils.mkdir_p(@drafts_dir)
      File.write(path, template(title))
      path
    end

    private

    def template(title)
      <<~MD
        ---
        title: #{quote(title)}
        tags: []
        description: ""
        ---

        Start writing here.
      MD
    end

    # YAML double-quoted scalar, so titles containing ':' or '"' stay valid.
    def quote(text)
      %("#{text.gsub("\\", "\\\\\\\\").gsub('"', '\\"')}")
    end
  end
end
