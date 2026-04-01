// Image configuration for permanent facility and sports gallery photos
// Store actual image files in /public/images/ folder
// Paths are relative to public folder

export const facilityImages = {
  classrooms: [
    '/images/facilities/classrooms/classroom-1.jpg',
    '/images/facilities/classrooms/classroom-2.jpg',
    '/images/facilities/classrooms/classroom-3.jpg',
  ],
  science_labs: [
    '/images/facilities/science-labs/lab-1.jpg',
    '/images/facilities/science-labs/lab-2.jpg',
    '/images/facilities/science-labs/lab-3.jpg',
  ],
  computer_lab: [
    '/images/facilities/computer-lab/lab-1.jpg',
    '/images/facilities/computer-lab/lab-2.jpg',
    '/images/facilities/computer-lab/lab-3.jpg',
  ],
  multipurpose_hall: [
    '/images/facilities/multipurpose-hall/hall-1.jpg',
    '/images/facilities/multipurpose-hall/hall-2.jpg',
    '/images/facilities/multipurpose-hall/hall-3.jpg',
  ],
  practical_rooms: [
    '/images/facilities/practical-rooms/room-1.jpg',
    '/images/facilities/practical-rooms/room-2.jpg',
    '/images/facilities/practical-rooms/room-3.jpg',
  ],
};

export const sportsImages = [
  { id: 1, url: '/images/sports/sports-1.jpg', caption: 'Football Finals 2024' },
  { id: 2, url: '/images/sports/sports-2.jpg', caption: 'Inter-School Athletics' },
  { id: 3, url: '/images/sports/sports-3.jpg', caption: 'Sports Day Event' },
];

// Instructions for adding images:
// 1. Add your image files to the /public/images/ folder with same structure above
// 2. Replace the paths in this file with your actual image filenames
// 3. Supported formats: JPG, PNG, WEBP
// 4. Recommended image size: 800x600px for best performance
// 5. Files will be deployed with Netlify when you push to GitHub
