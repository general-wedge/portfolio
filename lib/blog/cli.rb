module Blog
  # Command-line entry points behind bin/new-post and bin/publish.
  # Each returns a process exit status.
  class CLI
    def initialize(site_root:, clock: -> { Time.now }, out: $stdout, err: $stderr)
      @site_root = site_root
      @clock = clock
      @out = out
      @err = err
    end

    def new_post(args)
      return usage('bin/new-post "Post title"') if args.empty?

      report("Created") { DraftCreator.new(site_root: @site_root).create(args.join(" ")) }
    end

    def publish(args)
      return usage("bin/publish <draft-slug-or-path>") if args.empty?

      report("Published") { Publisher.new(site_root: @site_root, clock: @clock).publish(args.first) }
    end

    private

    def report(verb)
      @out.puts "#{verb} #{relative(yield)}"
      0
    rescue Error => e
      @err.puts "Error: #{e.message}"
      1
    end

    def usage(text)
      @err.puts "Usage: #{text}"
      1
    end

    def relative(path)
      path.delete_prefix("#{@site_root}/")
    end
  end
end
