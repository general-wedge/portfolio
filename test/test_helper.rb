require "minitest/autorun"
require "tmpdir"
require "yaml"
require "blog"

module BlogTestHelpers
  # Fixed point in time so dated filenames and front matter are predictable.
  FIXED_TIME = Time.new(2026, 9, 30, 14, 5, 9, "-05:00")

  def fixed_clock
    -> { FIXED_TIME }
  end

  def front_matter_of(path)
    YAML.safe_load(File.read(path).split(/^---[ \t]*$/, 3)[1], permitted_classes: [Time])
  end

  def body_of(path)
    File.read(path).split(/^---[ \t]*$/, 3)[2]
  end
end
