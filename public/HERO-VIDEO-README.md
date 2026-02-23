# Hero background video

To show a moving video behind the first block of the homepage:

1. Get a short video (e.g. people giving/donating boxes, smiling, slow motion) from a free stock site like [Pexels](https://www.pexels.com/search/videos/donation%20boxes/) or [Coverr](https://coverr.co/).
2. Save it as **`hero-bg.mp4`** in this folder (`public/`). Use a **dash** between `hero` and `bg` (not an underscore).
3. The hero will use it automatically: muted, looped, and softened with an overlay so the text stays readable.

If `hero-bg.mp4` is missing, the hero still shows the normal off-white background.

### Using more than one video (rotating sequence)

If your first clip is short and you want several to play in order:

1. Add extra videos to `public/` (e.g. `hero-bg-2.mp4`, `hero-bg-3.mp4`).
2. Open `src/components/hero-with-video.tsx` and add their paths to the `HERO_VIDEO_SOURCES` array:
   ```ts
   const HERO_VIDEO_SOURCES = [
     "/hero-bg.mp4",
     "/hero-bg-2.mp4",
     "/hero-bg-3.mp4",
   ];
   ```
3. The hero will play them in order and then repeat from the first.
