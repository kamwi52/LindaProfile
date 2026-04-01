# How to Add Images

## Folder Structure

```
/public/images/
├── facilities/
│   ├── classrooms/
│   │   ├── classroom-1.jpg
│   │   ├── classroom-2.jpg
│   │   └── classroom-3.jpg
│   ├── science-labs/
│   │   ├── lab-1.jpg
│   │   ├── lab-2.jpg
│   │   └── lab-3.jpg
│   ├── computer-lab/
│   │   ├── lab-1.jpg
│   │   ├── lab-2.jpg
│   │   └── lab-3.jpg
│   ├── multipurpose-hall/
│   │   ├── hall-1.jpg
│   │   ├── hall-2.jpg
│   │   └── hall-3.jpg
│   └── practical-rooms/
│       ├── room-1.jpg
│       ├── room-2.jpg
│       └── room-3.jpg
└── sports/
    ├── sports-1.jpg
    ├── sports-2.jpg
    └── sports-3.jpg
```

## Adding Your Images

1. **Add image files** to each folder following the naming convention above
2. **Update `/src/imageConfig.js`** if you change filenames
3. **Supported formats**: JPG, PNG, WEBP
4. **Recommended size**: 800x600px for best performance on Netlify
5. **Push to GitHub** - all images will deploy with Netlify automatically

## Image Usage

- Images in these folders are **permanent** and deploy with your site
- Users can still **upload temporary photos** (stored in browser memory) to facilities via the upload buttons
- Permanent images here appear as defaults/initial gallery content
- All image paths are relative (e.g., `/images/facilities/classrooms/classroom-1.jpg`)

## Example

Replace the placeholder paths in `imageConfig.js`:

```javascript
classrooms: [
  '/images/facilities/classrooms/classroom-1.jpg',
  '/images/facilities/classrooms/classroom-2.jpg',
  '/images/facilities/classrooms/classroom-3.jpg',
]
```

Add your actual classroom images to `/public/images/facilities/classrooms/` and keep the same filenames.
