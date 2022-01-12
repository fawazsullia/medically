const cloudinary = require('cloudinary').v2

const cloudinaryConfig = cloudinary.config({ 
    cloud_name: 'indiagoesremote', 
    api_key: '586198561628276', 
    api_secret: '1GCzIudNsAw8un-DHYMxUD7EVI8',
    secure: true
  });

  module.exports = cloudinaryConfig