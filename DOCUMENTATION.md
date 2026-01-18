# OPMandira Project Documentation

This document provides step-by-step instructions on how to set up, run, build, and deploy the OPMandira restaurant landing page.

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm (installed by default with Node.js)

### Installation
1.  **Clone or Download** the repository to your local machine.
2.  **Install dependencies**:
    ```bash
    npm install
    ```

## 💻 Development

To start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Key Commands
- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production (Static Export).
- `npm run lint`: Checks for code quality issues.
- `npm run type-check`: Validates TypeScript types.

---

## 🏗️ Build Process

This project is configured for **Static Site Generation (SSG)**.

1.  **Run Build**:
    ```bash
    npm run build
    ```
2.  **Output**:
    The production-ready files will be generated in the `out/` directory. These are pure HTML/CSS/JS files that can be hosted anywhere.

---

## 🌐 Deployment (GitHub Pages)

The project is pre-configured to be hosted on GitHub Pages under the `/MandiraHouse` path.

### Configuration
If you change the repository name, you **must** update the `basePath` in `next.config.mjs`:
```javascript
// next.config.mjs
const nextConfig = {
  output: 'export',
  basePath: '/YOUR_NEW_REPO_NAME', // Update this
  // ...
};
```

### Steps to Deploy
1.  Ensure your code is pushed to a GitHub repository named `OPMandira`.
2.  In GitHub: **Settings > Pages**.
3.  Set **Build and deployment > Source** to **GitHub Actions**.
4.  The site will automatically build and deploy whenever you push to the `main` branch.

---

## 🛠️ Tech Stack Analysis
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend (Optional)**: Supabase (Pre-configured client available in `lib/supabase`)
- **Analytics**: PostHog

---

## 📂 Project Structure & Configurations Explained

### File Structure
- **`app/`**: Contains the main application code (App Router). `page.tsx` is the home page.
- **`public/`**: Stores static assets like images. These are served directly.
- **`lib/`**: Utility functions and shared code (e.g., Supabase client).
- **`next.config.mjs`**: Main configuration file for Next.js.

### Key Configuration Decisions ("The Why")

#### 1. Static Export (`output: 'export'`)
*   **Why?**: This changes Next.js from a server-side framework to a static site generator.
*   **Benefit**: Allows the app to be hosted on any static hosting service like GitHub Pages, Vercel, or Netlify without needing a Node.js server.
*   **Trade-off**: Dynamic server-side features (like `getServerSideProps` or API routes) won't work in the conventional way.

#### 2. Base Path (`basePath: '/MandiraHouse'`)
*   **Why?**: Required for GitHub Pages project sites which are hosted at `username.github.io/repo-name`.
*   **Effect**: All internal links and asset URLs are automatically prefixed with `/MandiraHouse` so they resolve correctly on the live site.

#### 3. Unoptimized Images (`images: { unoptimized: true }`)
*   **Why?**: Next.js's default Image component relies on a server to optimize images on-the-fly. Since we are doing a static export, there is no server to process these images.
*   **Effect**: Images are served as-is without automatic resizing or format conversion.

#### 4. Lint/Type Check Skips in Dev
*   **Why?**: The `dev` script includes `NEXT_DISABLE_ESLINT=1`.
*   **Benefit**: Drastically speeds up the development server startup time and hot reloading by skipping strict checks during rapid iteration. Strict checks are still run during build or manually.
