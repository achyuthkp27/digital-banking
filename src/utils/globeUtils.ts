import * as THREE from 'three';

export function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

let geometryPromise: Promise<THREE.BufferGeometry> | null = null;

export async function getGlobeDotsGeometry(radius: number): Promise<THREE.BufferGeometry> {
  if (!geometryPromise) {
    geometryPromise = new Promise(async (resolve, reject) => {
      try {
        const basePath = window.location.pathname.startsWith('/digital-banking')
          ? '/digital-banking'
          : '';
        const res = await fetch(`${basePath}/globe-points.json`);
        if (!res.ok) throw new Error('Failed to fetch globe points');

        const positions: number[] = await res.json();
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

        resolve(geo);
      } catch (err) {
        geometryPromise = null;
        reject(err);
      }
    });
  }

  const normalizedGeo = await geometryPromise;

  const scaledGeo = normalizedGeo.clone();
  scaledGeo.scale(radius, radius, radius);

  return scaledGeo;
}
