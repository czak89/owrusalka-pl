# Claude AI Assistant - Project Context

## Project Overview
**Rusałka nad Morzem** - Comprehensive Polish seaside resort website

## Tech Stack
- **Framework**: Next.js 15.3.2 with App Router
- **Language**: TypeScript 5.7.2
- **Styling**: Tailwind CSS 4.1.11
- **UI Components**: shadcn/ui + Radix UI
- **Runtime**: Bun (recommended) or Node.js 18+
- **Linting**: Biome 1.9.4

## Project Structure
```
owrusalka-pl/
├── src/
│   ├── app/              # Next.js App Router pages & API routes
│   ├── components/       # React components
│   ├── contexts/         # React context providers
│   └── lib/              # Utility functions
├── booking-engine/       # Booking system
├── public/               # Static assets
└── [config files]
```

## Key Features
- 🌐 Multilingual support (Polish, English, German)
- 🤖 AI-powered chat assistant
- 📅 Advanced booking system
- 👨‍💼 Admin dashboard
- 📱 PWA functionality
- 🎨 Modern responsive UI

## Development Commands
```bash
bun dev          # Start development server (Turbopack)
bun build        # Build for production
bun start        # Start production server
bun lint         # Run linter and TypeScript checks
bun format       # Format code with Biome
```

## Environment Variables
See `.env.example` for required configuration:
- `OPENAI_API_KEY` - AI chat functionality
- `NEXT_PUBLIC_GA_ID` - Google Analytics (optional)
- `ADMIN_USERNAME` / `ADMIN_PASSWORD` - Admin dashboard auth

## Important Notes
- This is a Git repository
- Private/proprietary project
- Contact: recepcja@owrusalka.pl

---
*Last updated: 2025-12-13*
