# Overview

This is a full-stack e-commerce application for "Diskreta Kollektion" - a Swedish marketplace for exclusive, discreet personal garments from Nordic women. The application features a React frontend with Express.js backend, in-memory storage for fast development, and supports multiple payment methods including cryptocurrency (NOWPayments), Revolut, and Gumroad. The application is production-ready with comprehensive SEO optimization, luxury Nordic design, and all core e-commerce functionality.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client uses **React with TypeScript** built with Vite for fast development and optimized builds. The UI is built with **shadcn/ui components** (based on Radix UI primitives) styled with **Tailwind CSS**. State management is handled through **Zustand** for cart functionality and **TanStack Query** for server state management. Navigation is implemented using **Wouter** (lightweight routing library). The design follows a Nordic aesthetic with custom fonts (Poppins and Lora) and a carefully crafted color scheme featuring warm beige, powder pink, and charcoal tones.

## Backend Architecture
The server runs on **Express.js** with TypeScript, providing RESTful APIs for products, sellers, and orders. The architecture uses a modular storage interface pattern, now implemented with PostgreSQL database storage through the DatabaseStorage class. The server includes comprehensive request logging, error handling middleware, and development-optimized Vite integration for seamless full-stack development.

## Data Storage
The application uses **PostgreSQL** as the primary database with **Drizzle ORM** for type-safe database operations. The schema defines three main entities: sellers (Nordic women offering products), products (garments with detailed descriptions), and orders (purchase transactions with payment tracking). Database migrations are managed through Drizzle Kit, and the connection uses Neon Database's serverless driver for cloud-hosted PostgreSQL.

**Recent Change (Aug 7, 2025):** Successfully migrated from in-memory storage to PostgreSQL database. Implemented DatabaseStorage class with full relational queries using Drizzle's query API. All relations are properly configured and the database is seeded with sample data. The application now persists data between restarts.

## Authentication and Payment Processing
The application integrates with **NOWPayments** for cryptocurrency transactions (Bitcoin, Ethereum, USDT), **Revolut** for traditional payments, and **Gumroad** as an additional payment gateway. No traditional user authentication is implemented - the system operates on anonymous purchasing with email-based order tracking. Payment status tracking includes pending, completed, failed, and expired states with corresponding order status management.

## Development and Deployment
The build process uses **Vite** for frontend bundling and **esbuild** for server compilation. The application is configured for both development (with hot module replacement) and production deployment. Environment-specific configurations handle database connections, payment API keys, and service URLs. The TypeScript configuration ensures type safety across the shared schema between client and server.

# External Dependencies

- **Neon Database**: Cloud PostgreSQL hosting via `@neondatabase/serverless` driver
- **NOWPayments API**: Cryptocurrency payment processing with sandbox and production endpoints
- **Revolut API**: Traditional payment processing integration
- **Gumroad**: Alternative payment gateway for additional checkout options
- **Google Fonts**: External font loading for Poppins and Lora typefaces
- **Replit Development Tools**: Integration with Replit's development environment including error overlay and cartographer plugins