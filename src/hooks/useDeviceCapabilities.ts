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

    const hardwareConcurrency = navigator.hardwareConcurrency || 4;

    const deviceMemory = (navigator as any).deviceMemory || 4;

    const saveData = (navigator as any).connection?.saveData || false;

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    const isLowEndDevice = hardwareConcurrency < 2 || deviceMemory < 2 || saveData;

    setCapabilities({
      isLowEndDevice,
      isMobile,
      saveData,
    });
  }, []);

  return capabilities;
}
