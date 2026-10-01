require "fileutils"

module Blog
  # Promotes a draft to a post: stamps the publish date into its front matter
  # and moves it to _posts/YYYY-MM-DD-<slug>.md.
  class Publisher
    FRONT_MATTER = /\A---\s*\n(.*?)^---\s*$/m

    def initialize(site_root:, clock: -> { Time.now })
      @site_root = site_root
      @clock = clock
    end

    def publish(draft)
      source = resolve(draft)
      now = @clock.call
      target = File.join(@site_root, "_posts", "#{now.strftime('%Y-%m-%d')}-#{File.basename(source)}")
      raise Error, "Post already exists: #{target}" if File.exist?(target)

      contents = with_date(File.read(source), now, source)
      FileUtils.mkdir_p(File.dirname(target))
      File.write(target, contents)
      File.delete(source)
      target
    end

    private

    def resolve(draft)
      candidates = [draft, File.join(@site_root, draft), File.join(@site_root, "_drafts", "#{draft}.md")]
      candidates.find { |path| File.file?(path) } or raise Error, "No draft found for #{draft.inspect}"
    end

    def with_date(contents, now, source)
      match = FRONT_MATTER.match(contents) or raise Error, "#{source} has no front matter"

      date_line = "date: #{now.strftime('%Y-%m-%d %H:%M:%S %z')}\n"
      lines = match[1].lines.reject { |line| line.start_with?("date:") }
      title_index = lines.index { |line| line.start_with?("title:") }
      lines.insert(title_index ? title_index + 1 : 0, date_line)

      "---\n#{lines.join}#{contents[match.end(1)..]}"
    end
  end
end
