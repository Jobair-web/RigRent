# RigRent - Equipment Rental Platform (Client)

RigRent is a modern marketplace where owners list professional equipment (construction, photography, vehicles, agriculture, electronics and event gear) and customers book and pay for it online. This repository contains the **Next.js + TypeScript frontend**.

| | |
|---|---|
| **Live site** | https://rig-rent.vercel.app |
| **Live API** | https://rigrent-server.onrender.com |
| **Client repository** | https://github.com/Jobair-web/RigRent |
| **Server repository** | https://github.com/Jobair-web/RigRent-Server |

### Demo accounts

| Role | Email | Password |
|---|---|---|
| Admin | `mdjobair00441@gmail.com` | `jobairJr` |
| Owner | `mdjobair004444@gmail.com` | `Asdf456` |
| Customer | `mdjobair004433@gmail.com`| `Asdf123`| 
| Customer | Register a new account or use Google sign-in | - |

Stripe test card for payments: `4242 4242 4242 4242`, any future expiry date, any CVC.

## Purpose

Owning heavy or expensive equipment is costly, and finding it locally is hard. RigRent lets owners earn from idle equipment and lets customers rent exactly what they need, for exactly the days they need it, with secure online payment.

## Key features

**Public pages**
- Sticky responsive navbar with dynamic auth buttons (Login / Register, or Dashboard / Logout) and a light/dark theme toggle that persists in localStorage
- Animated hero section, six featured equipment cards, category grid, why choose us, how it works, recently added and customer reviews sections
- All Equipment page with server-side search (name, location, category), category / rental type / price / availability filters, sorting and pagination, all synced to the URL
- Skeleton loaders, empty states, and custom error and 404 pages

**Authentication and security**
- Email/password and Google sign-in with Better Auth (MongoDB adapter)
- Password rules: minimum 6 characters, one uppercase and one lowercase letter
- JWT is sent to the API as a Bearer token and roles (customer, owner, admin) are enforced on the server
- Private routes (equipment details, dashboards, payment) survive a page reload. The session cookie is checked by Next.js middleware, so a logged-in user is never sent back to the login page
- All keys and the MongoDB URI are read from environment variables

**Booking and payments**
- Equipment details with owner information, rental terms and an add-to-favorites toggle
- Booking modal with dates, quantity, contact number, delivery address, notes, live price calculation and an availability check
- Stripe Checkout, payment success and cancel pages, booking and transaction records

**Dashboards (full width)**
- **Customer:** My Rentals (paginated), Favorites table, Profile
- **Owner:** Analytics, Add / Update / Delete equipment, My Equipment, My Equipment Rentals with status updates, My Profile
- **Admin:** Analytics, All Users (change role, delete), All Equipment (approve, reject, update, delete), All Rentals, My Profile
- Analytics cards and charts: monthly bookings, revenue and earnings, booking status split

## Tech stack

- **Language:** TypeScript (strict mode)
- **Framework:** Next.js  (App Router, `src/app`), React 19
- **Styling:** Tailwind CSS with CSS-variable design tokens for light and dark themes
- **Auth:** Better Auth with the MongoDB adapter and the JWT plugin
- **Data fetching:** Axios (JWT interceptor) with a small typed `useAsync` hook
- **UI libraries:** Framer Motion, Lucide React, React-Toastify, Recharts, next-themes
- **Deployment:** Vercel (client), Render (server), MongoDB Atlas (database)

## npm packages used

**Dependencies**

| Package | Purpose |
|---|---|
| `next`, `react`, `react-dom` | Framework and UI |
| `better-auth` | Authentication (email/password, Google, JWT plugin) |
| `mongodb` | Database adapter used by Better Auth |
| `axios` | API requests with a JWT interceptor |
| `framer-motion` | Entry and scroll animations |
| `react-toastify` | Success and error toast notifications |
| `lucide-react` | Icons |
| `recharts` | Dashboard charts |
| `next-themes` | Dark / light mode |
| `clsx`, `tailwind-merge` | Class name helpers |

**Dev dependencies**

| Package | Purpose |
|---|---|
| `typescript` | Static typing |
| `@types/react`, `@types/react-dom`, `@types/node` | Type definitions |
| `tailwindcss`, `postcss`, `autoprefixer` | Styling toolchain |

## Environment variables

Create a `.env.local` file in this folder. It is git-ignored and must never be committed. Use `.env.example` as a template.

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_APP_URL` | Frontend URL |
| `NEXT_PUBLIC_API_URL` | Backend URL ending with `/api` |
| `NEXT_PUBLIC_IMGBB_API_KEY` | imgbb key used for image uploads |
| `BETTER_AUTH_SECRET` | Long random secret |
| `BETTER_AUTH_URL` | Frontend URL |
| `MONGODB_URI` | MongoDB connection string (same as the server) |
| `MONGODB_DB` | Database name (same as the server) |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google OAuth credentials |
| `ADMIN_EMAIL` | The account registered with this email automatically becomes admin |

## Getting started

```bash
git clone https://github.com/Jobair-web/RigRent.git
cd RigRent
npm install
cp .env.example .env.local     # then fill in the values
npm run dev                    # http://localhost:3000
```

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Run the production build |
| `npm run type-check` | Run the TypeScript compiler without emitting files |

## Folder structure

```
src/
  app/            routes: (public), dashboard, api/auth, loading, error, not-found
  components/
    ui/           Button, FormControls, Modal, DataTable, Pagination, Skeleton ...
    layout/       Navbar, Footer, Logo, ThemeToggle, UserAvatar
    home/         Hero, Featured, Categories, WhyChooseUs, HowItWorks, Reviews ...
    equipment/    Card, Grid, Filters, Explorer, Details, BookingModal, Form
    auth/         LoginForm, RegisterForm, GoogleButton, PasswordInput
    payment/      Success and cancel screens
    dashboard/    DashboardShell, customer, owner, admin, shared (tables, charts)
  hooks/          useAsync, useAuth, useDebounce
  services/       Typed API calls per domain
  types/          Shared domain types (Equipment, Booking, AppUser, Paginated ...)
  lib/            auth, auth-client, api client, constants, utils, imgbb
  middleware.ts   Private route protection
```

## Deployment (Vercel)

1. Import the repository into Vercel.
2. Add every variable from the table above in **Settings, Environment Variables**. Public values (`NEXT_PUBLIC_*`) can be Config, keys and secrets should be Secret.
3. In Google Cloud Console add `https://rig-rent.vercel.app` to **Authorized JavaScript origins** and `https://rig-rent.vercel.app/api/auth/callback/google` to **Authorized redirect URIs**.
4. Redeploy after changing any environment variable.