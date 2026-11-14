#!/usr/bin/env bash
# Watermarks the project-gallery photos.
#
# Clean, unwatermarked masters live in design-assets/project-gallery/. This
# script reads those and writes the watermarked .jpg and .webp that the site
# serves into public/project-gallery/. It is safe to re-run: it never reads
# from public/, so the watermark is never applied twice.
#
# Needs ImageMagick (`brew install imagemagick`). Run from the repo root:
#   bash scripts/watermark-gallery.sh
set -euo pipefail

SRC_DIR="design-assets/project-gallery"
OUT_DIR="public/project-gallery"
F_BOLD="design-assets/fonts/DMSans-700.ttf"
F_MED="design-assets/fonts/DMSans-500.ttf"

# ImageMagick 7 renamed `convert` to `magick`.
IM=$(command -v magick || command -v convert)
[ -n "$IM" ] || { echo "ImageMagick not found (brew install imagemagick)"; exit 1; }

WORK=$(mktemp -d); trap 'rm -rf "$WORK"' EXIT

# One tile of the wordmark, padded, then repeated across a canvas larger than
# the photo and rotated. Two layers at opposite angles make the cross, offset
# so the words interleave rather than collide.
"$IM" -background none -fill white -font "$F_BOLD" -pointsize 25 -kerning 5 \
  label:"EMPIRE DESIGN CONSULTANCY" "$WORK/text.png"
"$IM" "$WORK/text.png" -background none -gravity center -extent 640x300 "$WORK/tile.png"
"$IM" -size 1700x1900 tile:"$WORK/tile.png" -background none -rotate -32 \
  -gravity center -extent 800x1067 "$WORK/down.png"
"$IM" -size 1700x1900 tile:"$WORK/tile.png" -roll +320+150 -background none -rotate 32 \
  -gravity center -extent 800x1067 "$WORK/up.png"

OPACITY=0.07   # per layer; where the two cross it reads about double

for src in "$SRC_DIR"/*.jpg; do
  name=$(basename "$src" .jpg)
  # exterior-garden is foliage-heavy and needs a little more WebP quality.
  if [ "$name" = "exterior-garden" ]; then q=85; else q=82; fi

  "$IM" "$src" \
    \( "$WORK/down.png" -alpha set -channel A -evaluate multiply $OPACITY +channel \) -compose over -composite \
    \( "$WORK/up.png"   -alpha set -channel A -evaluate multiply $OPACITY +channel \) -compose over -composite \
    \( -background none -fill white -font "$F_BOLD" -pointsize 30 -kerning 6 label:"EMPIRE" \) \
      -gravity southwest -geometry +34+62 -composite \
    \( -background none -fill white -font "$F_MED" -pointsize 16 -kerning 4 label:"DESIGN CONSULTANCY" \) \
      -gravity southwest -geometry +36+34 -composite \
    "$WORK/$name.png"

  "$IM" "$WORK/$name.png" -quality 85 "$OUT_DIR/$name.jpg"
  "$IM" "$WORK/$name.png" -quality $q -define webp:method=6 "$OUT_DIR/$name.webp"
  printf '%-22s jpg %4dKB   webp %4dKB\n' "$name" \
    $(( $(stat -f%z "$OUT_DIR/$name.jpg" 2>/dev/null || stat -c%s "$OUT_DIR/$name.jpg") / 1024 )) \
    $(( $(stat -f%z "$OUT_DIR/$name.webp" 2>/dev/null || stat -c%s "$OUT_DIR/$name.webp") / 1024 ))
done
echo "Done. Re-run after replacing a master in $SRC_DIR."
echo
echo "NOTE: bump GALLERY_VERSION in src/components/ProjectGallery.jsx so"
echo "      returning visitors are not served the 30-day cached copies."
