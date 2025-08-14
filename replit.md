# Overview

This is a full-stack e-commerce application for "Scandiscent", a Swedish marketplace for exclusive, discreet personal garments from Nordic women. It aims to be a production-ready platform featuring a React frontend and Express.js backend. Key capabilities include comprehensive e-commerce functionality, multiple payment methods (cryptocurrency via NOWPayments, Revolut, and Gumroad), robust SEO optimization, and a luxury Nordic design aesthetic, ready for market launch.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client is built with React and TypeScript using Vite, leveraging `shadcn/ui` components (Radix UI) styled with Tailwind CSS for a Nordic-inspired design. State management uses Zustand for cart functionality and TanStack Query for server state. Wouter handles routing. Custom fonts (Poppins, Lora) and a refined color scheme (warm beige, powder pink, charcoal, later including stone, sage, cream, dusty rose) contribute to the luxurious aesthetic, including glass morphism and gradients. The UI is fully mobile-responsive and optimized for various screen sizes, including touch-friendly elements and responsive typography.

## Backend Architecture
The server is an Express.js application written in TypeScript, providing RESTful APIs for products, sellers, and orders. It features a modular storage interface, currently implemented with PostgreSQL. It includes comprehensive request logging, error handling middleware, and seamless Vite integration for development. An admin authentication system with bcrypt hashing and JWT-like session tokens protects sensitive endpoints and the comprehensive Shopify-style admin panel for managing orders, products, and sellers.

## Data Storage
PostgreSQL serves as the primary database, managed with Drizzle ORM for type-safe operations. The schema defines sellers, products, and orders. Drizzle Kit handles migrations, and Neon Database's serverless driver connects to the cloud-hosted PostgreSQL.

## UI/UX Decisions
The application features a consistent luxury Nordic design with a specific color palette (initially warm beige, powder pink, charcoal; later stone, sage, cream, dusty rose, deep charcoal, blue, gold accents). Typography is standardized with Cormorant Garamond (H1/H2), Lora (H3), and DM Sans (body text). Product imagery includes interactive hover effects. The application also includes social proof elements like verified seller badges, trust signals, and customer testimonials. Legal compliance is addressed with Terms of Service, Privacy Policy, and a mandatory 18+ age verification.

## Authentication and Payment Processing
The application integrates NOWPayments for cryptocurrency (BTC, ETH, USDT), Revolut, and Gumroad for traditional payments. There is no traditional user authentication; the system focuses on anonymous purchasing with email-based order tracking. Payment statuses (pending, completed, failed, expired) are tracked, and an email system for order confirmations is integrated via SendGrid.

## Development and Deployment
Vite is used for frontend bundling, and esbuild for server compilation. The setup supports both development (with HMR) and production environments, using environment-specific configurations for API keys and database connections. TypeScript ensures type safety across the stack.

# External Dependencies

- **Neon Database**: Cloud PostgreSQL hosting (`@neondatabase/serverless`)
- **NOWPayments API**: Cryptocurrency payment processing
- **Revolut API**: Traditional payment processing
- **Gumroad**: Alternative payment gateway
- **SendGrid**: Email delivery service for order confirmations
- **17track**: Package tracking service
- **Google Fonts**: Font loading (Poppins, Lora)
- **Replit Development Tools**: Error overlay, cartographer plugins