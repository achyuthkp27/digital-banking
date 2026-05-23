import * as THREE from 'three';

// -------------------------------------------------------------------
// Convert lat/lng (degrees) to 3D position on a sphere
// -------------------------------------------------------------------
export function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// -------------------------------------------------------------------
// Global Cache for the dots geometry to prevent CPU spikes on re-renders
// -------------------------------------------------------------------
let cachedDotsGeometry: THREE.BufferGeometry | null = null;
let isGeneratingDots = false;

/**
 * Parses the earth-map.jpg and returns a BufferGeometry with points on the landmass.
 * Uses a singleton cache so the heavy canvas operation only runs once per app lifecycle.
 */
export async function getGlobeDotsGeometry(radius: number): Promise<THREE.BufferGeometry> {
  if (cachedDotsGeometry) return cachedDotsGeometry;

  // Simple lock to prevent double generation if called concurrently
  if (isGeneratingDots) {
    return new Promise((resolve) => {
      const check = setInterval(() => {
        if (cachedDotsGeometry) {
          clearInterval(check);
          resolve(cachedDotsGeometry);
        }
      }, 50);
    });
  }

  isGeneratingDots = true;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const basePath = window.location.pathname.startsWith('/digital-banking') ? '/digital-banking' : '';
    img.src = `${basePath}/earth-map.jpg`;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const w = 512;
      const h = 256;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get 2d context'));
        return;
      }

      ctx.drawImage(img, 0, 0, w, h);
      const imgData = ctx.getImageData(0, 0, w, h).data;

      const positions: number[] = [];
      const numPoints = 40000;
      const phi = Math.PI * (3 - Math.sqrt(5));

      for (let i = 0; i < numPoints; i++) {
        const y = 1 - (i / (numPoints - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = phi * i;

        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;

        const latitude = Math.asin(y);
        const longitude = Math.atan2(z, x);

        const px = Math.floor(((longitude + Math.PI) / (2 * Math.PI)) * w);
        const py = Math.floor(((-latitude + Math.PI / 2) / Math.PI) * h);

        const safePx = Math.max(0, Math.min(w - 1, px));
        const safePy = Math.max(0, Math.min(h - 1, py));

        const idx = (safePy * w + safePx) * 4;

        if (imgData[idx] < 50) {
          // Normalize to unit sphere first
          positions.push(x, y, z);
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

      // Scale by radius efficiently
      geo.scale(radius, radius, radius);

      cachedDotsGeometry = geo;
      isGeneratingDots = false;
      resolve(geo);
    };
    img.onerror = reject;
  });
}
