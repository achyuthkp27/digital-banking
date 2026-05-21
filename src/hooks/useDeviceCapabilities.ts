'use client';

import { useState, useEffect } from 'react';

interface DeviceCapabilities {
  isLowEndDevice: boolean;
  isMobile: boolean;
  saveData: boolean;
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isLowEndDevice: false,
    isMobile: false,
    saveData: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check hardware concurrency (CPU cores)
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;

    // Check device memory (RAM in GB) if available (Chrome/Edge only)
    // @ts-ignore - deviceMemory is non-standard
    const deviceMemory = navigator.deviceMemory || 4;

    // Check if network is in save-data mode
    // @ts-ignore - connection is non-standard
    const saveData = navigator.connection?.saveData || false;

    // Simple mobile detection via User Agent
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    // Consider low end if CPU cores < 4 OR memory < 4GB OR on mobile (to save battery)
    const isLowEndDevice = hardwareConcurrency < 4 || deviceMemory < 4 || isMobile || saveData;

    setCapabilities({
      isLowEndDevice,
      isMobile,
      saveData,
    });
  }, []);

  return capabilities;
}
