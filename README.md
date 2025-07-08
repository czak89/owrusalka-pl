# Rusałka nad Morzem - Resort Website

A comprehensive Polish seaside resort website built with modern web technologies, featuring multilingual support, AI-powered chat assistance, online booking system, and administrative dashboard.

## 🌊 About

**Rusałka nad Morzem** is a sophisticated resort website designed for a Polish seaside destination. The site combines beautiful design with powerful functionality to provide visitors with an exceptional booking experience while offering resort owners comprehensive management tools.

## ✨ Key Features

### 🌐 Multilingual Support
- **Polish** (default)
- **English** 
- **German**
- Dynamic language switching with context preservation
- SEO-optimized URLs for each language

### 🤖 AI-Powered Chat Assistant
- Integration with OpenAI API (local LLM option on the way)
- 24/7 customer support automation
- Multilingual responses
- Resort-specific knowledge base
- Simple booking systems integration and information queries

### 📅 Advanced Booking System
- Interactive calendar with availability checking
- Real-time room availability
- Multiple accommodation types
- Date range selection
- Booking confirmation system
- Price calculations

### 🏨 Accommodation Management
- Room galleries with high-quality images
- Detailed room descriptions and amenities
- Capacity and pricing information
- Seasonal rate adjustments
- Special offers and packages

### 👨‍💼 Admin Dashboard
- **Authentication system** with secure login
- **Room Management**: Add, edit, delete accommodations
- **Booking Management**: View and manage reservations
- **Testimonial Management**: Moderate guest reviews
- **Gallery Management**: Upload and organize images
- **Analytics Dashboard**: Visitor statistics and insights
- **Chat Management**: Monitor AI interactions
- **AI Configuration**: Customize chat responses

### 📱 Progressive Web App (PWA)
- Offline functionality
- App-like experience on mobile devices
- Push notifications
- Fast loading and caching
- Install prompt for mobile users

### 🎨 Modern UI/UX
- Responsive design for all devices
- Beautiful animations and transitions
- Optimized image loading and galleries
- Interactive components
- Accessible design principles

### 🔍 SEO & Analytics
- Server-side rendering (SSR)
- Meta tags optimization
- Structured data (JSON-LD)
- Google Analytics integration
- Sitemap generation
- robots.txt configuration

### 🌟 Additional Features
- **Weather Widget**: Local weather information
- **Social Media Integration**: Instagram feed and social sharing
- **WhatsApp Integration**: Direct contact button
- **Cookie Consent**: GDPR-compliant cookie management
- **Contact Forms**: Multiple contact options
- **Testimonials System**: Guest review display
- **Services Showcase**: Resort amenities and activities
- **Interactive Gallery**: Lightbox image viewing

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Radix UI** - Primitive components for accessibility

### Dependencies
- **React 18** - UI library
- **date-fns** - Date manipulation and formatting
- **Lucide React** - Beautiful icon set
- **class-variance-authority** - Component variants
- **tailwind-merge** - Tailwind class merging utility
- **react-day-picker** - Calendar component

### Backend & APIs
- **Next.js API Routes** - Serverless functions
- **OpenAI compatible API or Ollama intergration** - AI chat functionality

### Development Tools
- **Biome** - Fast linter and formatter
- **ESLint** - Code quality enforcement
- **Bun** - Fast package manager and runtime

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** 18+ or **Bun** runtime
- **Git** for version control

### 1. Clone the Repository
```bash
git clone https://github.com/czak89/owrusalka-pl.git
cd owrusalka-pl
```

### 2. Install Dependencies
```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Admin Authentication (customize these)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password

# Contact Form (if using email service)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email@domain.com
SMTP_PASS=your_email_password

# Database (if implementing persistence)
DATABASE_URL=your_database_connection_string
```

### 4. Development Server
```bash
# Start development server
bun dev

# Or with npm
npm run dev
```

Visit `http://localhost:3000` to see your application.

## 📝 Available Scripts

- `bun dev` - Start development server with Turbopack
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run linter and TypeScript checks
- `bun format` - Format code with Biome

## 🌍 Environment Variables

### Required Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `OPENAI_API_KEY` | OpenAI API key for chat functionality | `sk-...` |

### Optional Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | - |
| `ADMIN_USERNAME` | Admin dashboard username | `admin` |
| `ADMIN_PASSWORD` | Admin dashboard password | `password` |

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard
5. Deploy automatically on git push

### Vercel
1. Import project from GitHub
2. Configure environment variables
3. Deploy with zero configuration

### Custom Server
1. Build the project: `bun run build`
2. Start production server: `bun start`
3. Ensure environment variables are set

## 📁 Project Structure

```
owrusalka-pl/
├── public/                 # Static assets
│   ├── images/            # Resort images
│   ├── icons/             # PWA icons
│   └── sw.js              # Service worker
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── admin/         # Admin dashboard pages
│   │   ├── api/           # API routes
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Homepage
│   │   ├── manifest.ts    # PWA manifest
│   │   ├── robots.ts      # Robots.txt generation
│   │   └── sitemap.ts     # Sitemap generation
│   ├── components/        # React components
│   │   ├── admin/         # Admin-specific components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── Header.tsx     # Site header
│   │   ├── Footer.tsx     # Site footer
│   │   ├── Hero.tsx       # Hero section
│   │   ├── BookingSystem.tsx
│   │   ├── AIChatWidget.tsx
│   │   └── ...            # Other components
│   ├── contexts/          # React contexts
│   │   ├── LanguageContext.tsx
│   │   └── AuthContext.tsx
│   └── lib/               # Utilities
│       └── utils.ts       # Helper functions
├── package.json           # Dependencies
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
├── next.config.js         # Next.js configuration
├── components.json        # shadcn/ui configuration
└── README.md              # This file
```

## 🎨 Customization

### Styling
- Modify `tailwind.config.ts` for theme customization
- Update `src/app/globals.css` for global styles
- Components use Tailwind CSS classes for styling

### Content
- Edit component files in `src/components/`
- Update language files for multilingual content
- Modify images in `public/images/`

### AI Chat Configuration
- Customize AI responses in admin dashboard
- Modify prompts in `src/components/AIChatWidget.tsx`
- Add resort-specific knowledge base

## 🔧 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run linting: `bun lint`
5. Commit changes: `git commit -m 'Add feature'`
6. Push to branch: `git push origin feature-name`
7. Submit a pull request

## 📄 License

This project is private and proprietary. All rights reserved.

## 🆘 Support

For support, please contact:
- **Email**: recepcja@owrusalka.pl
- **GitHub Issues**: [Create an issue](https://github.com/czak89/owrusalka-pl/issues)

## 🙏 Acknowledgments

- **Next.js** team for the excellent framework
- **shadcn/ui** for beautiful component library
- **Tailwind CSS** for utility-first styling
- **OpenAI** for AI capabilities
- **Lucide** for icons

---

Built with ❤️ for Rusałka nad Morzem Resort
