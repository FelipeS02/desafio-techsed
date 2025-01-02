'use client';

import React, {
  ImgHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import Image from 'next/image';

import Drift from 'drift-zoom';

import { cn } from '@/lib/utils';

import './zoom-image.css';

interface ZoomImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  srcZoom: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  driftOptions?: Drift.Options;
}

const ZoomImage: React.FC<ZoomImageProps> = ({
  srcZoom,
  className = '',
  containerClassName = '',
  driftOptions = {},
  style,
  ...rest
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const inlineContainerRef = useRef<HTMLDivElement>(null);
  const paneRef = useRef<HTMLDivElement>(null);

  const driftInstanceRef = useRef<Drift>(null);

  const initDrift = useCallback(() => {
    if (!imgRef.current || !paneRef.current || !inlineContainerRef.current)
      return;

    try {
      driftInstanceRef.current = new Drift(imgRef.current, {
        paneContainer: paneRef.current,
        inlineContainer: inlineContainerRef.current,
        ...driftOptions,
      });
    } catch (error) {
      console.error('Error initializing Drift:', error);
    }
  }, [driftOptions]);

  useEffect(() => {
    initDrift();

    return () => {
      if (driftInstanceRef.current) {
        driftInstanceRef.current.destroy();
      }
    };
  }, [initDrift]);

  return (
    <div className={cn('relative overflow-hidden', containerClassName)} style={style}>
      <div
        className={cn(
          'peer relative cursor-zoom-in object-cover [&_img]:drop-shadow',
          className,
        )}
        ref={imgRef}
        data-zoom={srcZoom}
      >
        <Image fill {...rest} />
      </div>

      <div ref={inlineContainerRef} />

      <div ref={paneRef} />
    </div>
  );
};

export default ZoomImage;
