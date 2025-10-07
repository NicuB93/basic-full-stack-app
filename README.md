# Full-Stack Application

A modern full-stack application built with Next.js 15 and NestJS, featuring authentication, multilingual support (English/Romanian), and a beautiful UI with Tailwind CSS.

## Features

- 🔐 **Authentication** - Secure user authentication with NextAuth.js and JWT
- 🌍 **Multilingual** - English and Romanian language support with URL-based routing
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS and dark mode
- 🚀 **Full-Stack** - Next.js 15 frontend with NestJS backend
- 📱 **Responsive** - Mobile-friendly design
- 🍪 **Persistent Language** - Language preference saved in cookies
- 🔒 **Type-Safe** - Full TypeScript implementation
- 📊 **Database** - Prisma ORM with PostgreSQL/SQLite

## Tech Stack

### Frontend

- **Next.js 15** - App Router with React 19
- **NextAuth.js** - Authentication
- **Tailwind CSS 4** - Styling
- **TypeScript** - Type safety
- **OpenAPI** - Auto-generated API client

### Backend

- **NestJS** - Node.js framework
- **Prisma** - Database ORM
- **JWT** - Token-based authentication
- **Bcrypt** - Password hashing
- **Swagger** - API documentation

## Requirements

- **Node.js**: v20 or higher
- **npm** or **yarn**
- **Database**: PostgreSQL or SQLite (configured in backend)

## Quick Start

### Using Quick Launch Script (Recommended)

```bash
chmod +x quick-launch.sh
./quick-launch.sh
```

This will:

1. Install dependencies for both frontend and backend
2. Set up the database
3. Start both servers concurrently

### Manual Setup

#### 1. Backend Setup

```bash
cd backend-nest

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate

# Start development server
npm run start:dev
```

Backend will run on: `http://localhost:8080`

#### 2. Frontend Setup

```bash
cd frontend-next

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with backend URL

# Generate API client from backend OpenAPI spec
npm run generate

# Start development server + generate API client
npm run dev
```

Frontend will run on: `http://localhost:3000`

## Environment Variables

### Backend (.env)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
JWT_SECRET="your-secret-key-here"
PORT=8080
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET="your-nextauth-secret-here"
OPEN_API_JSON_URL=http://localhost:8080/api/json
NEXT_PUBLIC_BE_URL=http://localhost:8080

```

**Note:** `NEXTAUTH_SECRET` can be generated using `openssl rand -base64 32`.

## Available Scripts

### Backend

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start:prod` - Start production server
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma migrate dev` - Run database migrations

### Frontend

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run generate` - Generate API client from OpenAPI spec

## Project Structure

```
.
├── backend-nest/          # NestJS backend
│   ├── src/
│   │   ├── auth/         # Authentication module
│   │   ├── prisma/       # Prisma configuration
│   │   └── main.ts       # Application entry point
│   ├── prisma/
│   │   └── schema.prisma # Database schema
│   └── package.json
│
├── frontend-next/         # Next.js frontend
│   ├── src/
│   │   ├── app/          # App router pages
│   │   │   └── [locale]/ # Localized routes
│   │   ├── components/   # React components
│   │   ├── i18n/         # Internationalization
│   │   └── generated/    # Auto-generated API client
│   └── package.json
│
├── quick-launch.sh        # Quick start script
└── README.md
```

## Routes

The application uses locale-based routing:

- `/en/home` - Home page (English)
- `/ro/home` - Home page (Romanian)
- `/en/about` - About page
- `/en/login` - Login page
- `/en/register` - Register page
- `/en/profile` - User profile (protected)

## API Documentation

Once the backend is running, visit:

- Swagger UI: `http://localhost:8080/api-docs`
- OpenAPI JSON: `http://localhost:8080/api-docs-json`

## Language Switching

The app supports two languages:

- **English (en)** - Default language
- **Romanian (ro)** - Alternative language

Language preference is:

- Stored in cookies (1 year expiration)
- Reflected in the URL (`/en/...` or `/ro/...`)
- Switchable via the language picker in the header

## Development

### Adding New Pages

1. Create page in `frontend-next/src/app/[locale]/your-page/page.tsx`
2. Add translations to `frontend-next/src/i18n/locales/en.json` and `ro.json`
3. Use the custom `Link` component from `@/components/Link` for navigation

### Database Changes

1. Update `backend-nest/prisma/schema.prisma`
2. Run `npx prisma migrate dev --name your_migration_name`
3. Run `npx prisma generate`

## License

UNLICENSED - Private project

## Author

Created with ❤️ using Next.js and NestJS
