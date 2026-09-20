#!/usr/bin/env bash
set -euo pipefail

if ! command -v cwebp >/dev/null; then
  echo "Missing cwebp. Install the WebP tools, then run this command again."
  exit 1
fi

source_root="source-images"
image_root="public/images"
thumbnail_root="$image_root/thumbs"

optimize() {
  local source="$1" width="$2" output="$3" quality="${4:-84}"
  cwebp -quiet -q "$quality" -resize "$width" 0 "$source" -o "$output.tmp"
  mv "$output.tmp" "$output"
}

optimize "$source_root/hero-wedding.jpg" 1920 "$image_root/hero-wedding.webp"
optimize "$source_root/groom.jpg" 1080 "$image_root/groom.webp"
optimize "$source_root/bride.jpg" 1080 "$image_root/bride.webp"
mkdir -p "$thumbnail_root"

gallery_images=(
  DSC06642 DSC06710 DSC06774 DSC06838
  DSC06483 DSC06530 DSC06542 DSC06566
  DSC06288 DSC05855 DSC06367 DSC06394 DSC06433 DSC06464
  DSC05891 DSC06025 DSC06134 DSC06254 DSC06270
  DSC05606 DSC05670 DSC05702 DSC05759 DSC05838
)

for image in "${gallery_images[@]}"; do
  optimize "$source_root/$image.jpg" 1200 "$image_root/$image.webp" 80
  optimize "$source_root/$image.jpg" 480 "$thumbnail_root/$image.webp" 74
done

echo "Optimized wedding images and gallery thumbnails into WebP."
