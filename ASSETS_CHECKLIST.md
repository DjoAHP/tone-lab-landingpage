# Assets Checklist

## Required Assets to Add

### From User:
- [ ] **Logo SVG** → `public/assets/logo.svg` (used in Topbar + Footer)
- [ ] **Screenshot app** → `public/assets/screenshot.png` (Hero, 1200x675px, 16:9 ratio)
- [ ] **Video MP4** → `public/assets/demo/tonelab-demo.mp4` (1920x1080, < 10 MB)
- [ ] **Video WebM** → `public/assets/demo/tonelab-demo.webm` (fallback)
- [ ] **Video poster** → `public/assets/demo/poster.png` (image shown before play)
- [ ] **Executable .exe** → `public/download/tonelab-setup-v2.1.4.exe` (or use GitHub Releases)

### Auto-generated:
- ✅ lucide-react icons (direct import, no files needed)
- [ ] **Favicon** → `public/favicon.ico` (optional, can be logo resized)

## How to Add Assets

1. Place files in the paths listed above
2. Restart dev server: `npm run dev`
3. Assets will be served from `public/` folder automatically

## Video Encoding (if needed)

### Using HandBrake (GUI):
1. Open HandBrake
2. Import your screen recording
3. Select "Fast 1080p30" preset
4. Format: MP4 (H.264)
5. Video tab: Constant Quality 23, Preset: Medium
6. Start encode

### Using FFmpeg (CLI):
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4
```

## Executable Hosting Options

### Option 1: Local (public/download/)
- Simple, works for testing
- Vite copies `public/` to build root automatically
- Link: `<a href="/download/tonelab-setup-v2.1.4.exe" download>`

### Option 2: GitHub Releases (recommended for distribution)
- Create release: https://github.com/user/tone-lab-electron/releases/new
- Tag: v2.1.4
- Upload .exe as asset
- Link: `https://github.com/user/tone-lab-electron/releases/download/v2.1.4/tonelab-setup-v2.1.4.exe`
- Advantage: Versioning automatic, CDN global, no file size limit
