# Mandira House

A premium restaurant website built with Next.js, featuring a modern grid-based menu, high-end aesthetics, and responsiveness.

## 🚀 Getting Started

### Local Development

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/anjection/MandiraHouse.git
    cd MandiraHouse
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Access the application**:
    Open [http://localhost:3000/MandiraHouse](http://localhost:3000/MandiraHouse) in your browser.
    *Note: Since `basePath` is set to `/MandiraHouse` in `next.config.mjs`, the app is served from that subpath even locally.*

## 🛠 Project Structure

- `app/page.tsx`: Main landing page and logic.
- `app/components/`: Reusable components (EventSliders, etc.).
- `public/images/`: Optimized assets for the restaurant and menu.

## 📦 Deployment

This project is configured for static export to **GitHub Pages**.

### How to Build & Deploy Manualy

1.  **Build the project**:
    ```bash
    npm run build
    ```
    This generates an `out/` directory with static HTML, CSS, and JS.

2.  **Push to GitHub**:
    The project is hosted at `https://github.com/anjection/MandiraHouse.git`.

3.  **Static Hosting**:
    The live site is accessible at: [https://anjection.github.io/MandiraHouse/](https://anjection.github.io/MandiraHouse/)

## 🎨 Credits

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Typography**: Julius Sans One, Inter
