# Digital Banking 

A modern, high-performance web application showcasing the next generation of digital finance. Built with Next.js, React, Tailwind CSS, Framer Motion, and Three.js.

## Overview

This project is a beautifully animated, responsive landing page for a fictional Digital Banking platform. It features dynamic 3D elements, micro-animations, and a highly polished UI designed to wow users.

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Rendering**: Three.js & React Three Fiber
- **Icons**: Lucide React
- **Language**: TypeScript

## Performance Optimizations

- **Pre-computed 3D Geometry**: The globe 3D component is optimized by pre-calculating over 30,000 spherical coordinate points into a static JSON file (`public/globe-points.json`). This removes the need for client-side image parsing and heavy trigonometric calculations, resulting in instantaneous rendering and zero main-thread blocking.
- **Dynamic Imports**: Heavy 3D components are dynamically imported (`next/dynamic`) to keep the initial JavaScript bundle as small as possible.
- **Promise Caching**: Ensures that concurrent component renders do not trigger multiple expensive geometry fetches.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
