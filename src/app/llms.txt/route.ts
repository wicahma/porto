import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const content = `# Teguh Dwi Cahya Kusuma - Portfolio

> Personal portfolio website showcasing professional experience and projects.

## About

This is a personal portfolio website built with Next.js 16, featuring:
- Professional work experience and career history
- Project portfolio and showcase
- Modern, animated UI with dark mode support
- Server-side rendering and dynamic content

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **UI Components**: Radix UI, shadcn/ui
- **Animations**: Motion (Framer Motion)
- **State Management**: TanStack Query (React Query), Zustand

## Key Features

- Professional experience timeline
- Project portfolio showcase
- Modern, animated UI with smooth transitions
- Dark mode support
- Fully responsive design
- SEO optimized with metadata and sitemaps
- Performance optimized with Next.js 16

## Architecture

The project follows clean architecture principles:
- **Services**: Business logic and data access layer
- **Actions**: Server actions for mutations
- **Components**: Atomic design pattern (atoms, molecules, organisms)
- **Hooks**: Custom React hooks for reusable logic
- **Utils**: Helper functions and utilities
- **Types & Interfaces**: TypeScript definitions

## Content Sections

### Experience (${baseUrl}/experience)
Professional career history including:
- Work experience and positions
- Skills and technologies used
- Achievements and responsibilities

### Projects (${baseUrl}/project)
Portfolio of personal and professional projects:
- Live project demos
- Technical descriptions
- Technologies used
- Source code links

## Contact & Social

- GitHub: Available on the website
- LinkedIn: Available on the website
- Email: ${process.env.NEXT_PUBLIC_EMAIL || "Available on the website"}

## Development

Built with modern web technologies and best practices:
- Server Components for optimal performance
- Incremental Static Regeneration (ISR)
- TypeScript for type safety
- Clean code architecture

---

This portfolio is continuously updated with new projects.
Last updated: ${new Date().toISOString().split("T")[0]}
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
