# Weekendly - AI-Powered Weekend Planner

A full-stack MERN application that helps users plan perfect weekends with AI assistance, weather integration, and social sharing capabilities.

## 🚀 Live Demo
- **Frontend**: (https://weekend-planner-gilt.vercel.app)
- **Backend API**: (https://weekend-planner-w2nh.onrender.com)
- **Video Tour**: (https://www.loom.com/share/bdc9306b87a74a1f9bfec304dc1f3d28?sid=d255776a-f206-448b-955c-6fe63c219ebe)

## ✨ Features

### Core Features
- **Activity Management** - Browse 20+ curated activities across 6 categories
- **Weekend Planning** - Interactive Saturday/Sunday scheduler
- **Smart Filtering** - Filter by category, mood, and duration
- **Plan Persistence** - Save and manage multiple weekend plans
- **Responsive Design** - Works seamlessly on desktop and mobile

### AI-Powered Features
- **Smart Suggestions** - AI recommends activities based on current plan balance
- **Auto-Complete Planner** - Generate complete weekends with one click
- **Weather-Aware Planning** - Real-time weather integration with activity suggestions
- **Natural Language AI** - Describe your ideal weekend, get AI-generated plans
- **Conflict Detection** - Automatic time and mood conflict detection

### Sharing & Export
- **Unique Share Links** - Generate shareable URLs for plans
- **Export Options** - Download plans as PNG images or PDF files
- **QR Code Generation** - Mobile-friendly sharing
- **Social Integration** - Share on WhatsApp, Twitter, Facebook, LinkedIn
- **Plan Templates** - Beautiful, printable plan cards

### User Experience
- **Professional Landing Page** - Marketing-ready homepage
- **Multi-page Routing** - Clean navigation with React Router
- **Error Handling** - Comprehensive error boundaries and 404 pages
- **Loading States** - Smooth loading animations
- **Accessibility** - Semantic HTML and keyboard navigation

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Icons**: Lucide React
- **AI Integration**: Google Generative AI
- **Export**: html2canvas, jsPDF
- **QR Codes**: qrcode library

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **CORS**: Cross-origin resource sharing
- **Environment**: dotenv configuration

## 📦 Dependencies

### Frontend Dependencies
```json
{
  "axios": "^1.6.0",
  "lucide-react": "^0.263.1",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.8.0",
  "@google/generative-ai": "^0.1.3",
  "html2canvas": "^1.4.1",
  "jspdf": "^2.5.1",
  "qrcode": "^1.5.3"
}
```

### Backend Dependencies
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.5.0",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

## 🏗 Architecture

### Frontend Structure
```
src/
├── components/
│   ├── activities/     # Activity browsing & filtering
│   ├── ai/            # AI planning assistant
│   ├── landing/       # Homepage
│   ├── planner/       # Main planning interface
│   ├── plans/         # Saved plans management
│   ├── schedule/      # Weekend scheduler
│   ├── share/         # Export & sharing
│   └── ui/           # Reusable components
├── contexts/         # React Context providers
├── services/         # API & external services
└── router/          # Route configuration
```

### Backend Structure
```
server/
├── models/          # MongoDB schemas
├── routes/          # API endpoints
├── data/           # Seed data
└── server.js       # Main server file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Google AI API key

### Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/weekendly.git
   cd weekendly
   ```

2. **Backend Setup**
   ```bash
   cd weekendly-backend
   npm install
   echo "PORT=5000
   MONGODB_URI=mongodb://localhost:27017/weekendly
   FRONTEND_URL=http://localhost:5173" > .env
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd weekendly-frontend
   npm install
   echo "VITE_API_BASE_URL=http://localhost:5000/api
   VITE_GOOGLE_AI_API_KEY=your_google_ai_key
   VITE_FRONTEND_URL=http://localhost:5173" > .env
   npm run dev
   ```

4. **Access Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## 🔧 Configuration

### Environment Variables

**Frontend (.env)**
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_GOOGLE_AI_API_KEY=your_google_ai_api_key
VITE_FRONTEND_URL=http://localhost:5173
```

**Backend (.env)**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/weekendly
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

## 📊 API Endpoints

### Activities
- `GET /api/activities` - Get all activities
- `GET /api/activities?category=outdoor` - Filter by category
- `GET /api/activities?mood=relaxed` - Filter by mood

### Plans
- `GET /api/plans` - Get all saved plans
- `POST /api/plans` - Create new plan
- `GET /api/plans/:id` - Get specific plan
- `PUT /api/plans/:id` - Update plan
- `DELETE /api/plans/:id` - Delete plan

## 🎯 Key Features Implementation

### AI Integration
- **Google Gemini 1.5 Flash** for natural language processing
- **Rule-based suggestions** for activity recommendations
- **Weather-aware filtering** with mock data fallback

### Export System
- **Canvas-to-Image** conversion with html2canvas
- **PDF generation** with jsPDF library
- **QR code creation** for mobile sharing
- **Social media integration** with custom URL schemes

### Data Management
- **20+ Activities** across 6 categories (Food, Outdoor, Entertainment, Wellness, Social, Creative)
- **3 Weekend themes** (Lazy, Adventurous, Family)
- **Automatic data seeding** on first run
- **MongoDB indexing** for optimal performance

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy to Vercel with environment variables
```

### Backend (Railway)
```bash
# Connect GitHub repo to Railway
# Add production environment variables
# Automatic deployment on push
```

## 📱 Mobile Support
- Responsive Tailwind CSS design
- Touch-friendly interactions
- Mobile-optimized sharing (QR codes, Web Share API)
- Progressive Web App ready

## 🔐 Security Features
- CORS configuration for cross-origin requests
- Environment variable protection
- Input validation and sanitization
- Error boundary implementation

## 🎨 Design System
- **Color Palette**: Primary blue with semantic colors
- **Typography**: System fonts with proper hierarchy
- **Components**: Reusable UI components
- **Icons**: Consistent Lucide React iconography
- **Animations**: Smooth Tailwind transitions

## 📈 Performance
- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: High-resolution canvas exports
- **Caching**: Efficient API response caching
- **Bundle Size**: Optimized with Vite

## 🤝 Contributing
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License
MIT License - see [LICENSE.md](LICENSE.md) file for details

## 👨‍💻 Developer
Built with ❤️ by [Vishal Tambi](https://github.com/vishal-tambi)

---
**Weekendly** - Make every weekend count! 🎉
