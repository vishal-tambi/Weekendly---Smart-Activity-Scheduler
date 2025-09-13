const activities = [
  // Food & Dining
  { name: "Brunch", category: "food", duration: 2, mood: "relaxed", icon: "Coffee", description: "Enjoy a leisurely brunch", isIndoor: true },
  { name: "Cook Together", category: "food", duration: 3, mood: "happy", icon: "ChefHat", description: "Prepare a meal together", isIndoor: true },
  { name: "Food Market", category: "food", duration: 2, mood: "energetic", icon: "ShoppingCart", description: "Explore local food markets", isIndoor: false },
  
  // Outdoor Activities
  { name: "Hiking", category: "outdoor", duration: 4, mood: "energetic", icon: "Mountain", description: "Nature trail adventure", isIndoor: false },
  { name: "Park Picnic", category: "outdoor", duration: 3, mood: "relaxed", icon: "Trees", description: "Relaxing outdoor meal", isIndoor: false },
  { name: "Beach Day", category: "outdoor", duration: 5, mood: "happy", icon: "Waves", description: "Sun, sand, and relaxation", isIndoor: false },
  { name: "Bike Ride", category: "outdoor", duration: 2, mood: "energetic", icon: "Bike", description: "Cycling adventure", isIndoor: false },
  
  // Entertainment
  { name: "Movie Night", category: "entertainment", duration: 3, mood: "relaxed", icon: "Film", description: "Cozy movie watching", isIndoor: true },
  { name: "Board Games", category: "entertainment", duration: 2, mood: "happy", icon: "Gamepad2", description: "Fun board game session", isIndoor: true },
  { name: "Concert", category: "entertainment", duration: 4, mood: "energetic", icon: "Music", description: "Live music experience", isIndoor: false },
  { name: "Museum Visit", category: "entertainment", duration: 3, mood: "relaxed", icon: "Building", description: "Cultural exploration", isIndoor: true },
  
  // Wellness & Relaxation
  { name: "Spa Day", category: "wellness", duration: 4, mood: "relaxed", icon: "Heart", description: "Pampering and relaxation", isIndoor: true },
  { name: "Yoga Session", category: "wellness", duration: 1, mood: "relaxed", icon: "Activity", description: "Mindful movement", isIndoor: true },
  { name: "Reading", category: "wellness", duration: 2, mood: "relaxed", icon: "Book", description: "Quiet reading time", isIndoor: true },
  { name: "Meditation", category: "wellness", duration: 1, mood: "relaxed", icon: "Brain", description: "Mindfulness practice", isIndoor: true },
  
  // Social & Family
  { name: "Friends Gathering", category: "social", duration: 4, mood: "happy", icon: "Users", description: "Social time with friends", isIndoor: true },
  { name: "Family Time", category: "social", duration: 3, mood: "happy", icon: "Home", description: "Quality family moments", isIndoor: true },
  { name: "Game Night", category: "social", duration: 3, mood: "happy", icon: "Dice1", description: "Fun games with others", isIndoor: true },
  
  // Creative & Learning
  { name: "Art & Craft", category: "creative", duration: 3, mood: "happy", icon: "Palette", description: "Creative expression", isIndoor: true },
  { name: "Photography", category: "creative", duration: 3, mood: "energetic", icon: "Camera", description: "Capture memories", isIndoor: false },
  { name: "Learn Something New", category: "creative", duration: 2, mood: "energetic", icon: "GraduationCap", description: "Skill development", isIndoor: true }
];

module.exports = activities;