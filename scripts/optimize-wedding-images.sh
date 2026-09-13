#!/usr/bin/env bash
set -euo pipefail

if ! command -v cwebp >/dev/null; then
  echo "Missing cwebp. Install the WebP tools, then run this command again."
  exit 1
fi

source_root="source-images"
image_root="public/images"

optimize() {
  local source="$1" width="$2" output="$3"
  cwebp -quiet -q 84 -resize "$width" 0 "$source" -o "$output.tmp"
  mv "$output.tmp" "$output"
}

optimize "$source_root/hero-wedding.jpg" 1920 "$image_root/hero-wedding.webp"
optimize "$source_root/groom.jpg" 1080 "$image_root/groom.webp"
optimize "$source_root/bride.jpg" 1080 "$image_root/bride.webp"

for image in "$source_root"/gallery-*.jpg; do
  output="$image_root/$(basename "${image%.jpg}").webp"
  cwebp -quiet -q 80 -resize 1200 0 "$image" -o "$output.tmp"
  mv "$output.tmp" "$output"
done

echo "Optimized wedding images into WebP."
