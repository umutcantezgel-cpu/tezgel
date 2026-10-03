'use client';

import React, { useState } from 'react';
import Image, { type ImageProps } from 'next/image';

export interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
  aspectRatio?: string | number; // e.g. '16/9', '4/3', '1/1', 1.777
  containerClassName?: string;
  imageClassName?: string;
}

/**
 * Zero-CLS Image Wrapper.
 * Reserves exact layout dimensions and aspect ratio to ensure CLS = 0.
 */
export function OptimizedImage({
  aspectRatio = '16/9',
  containerClassName = '',
  imageClassName = '',
  alt,
  fill = true,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className = '',
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const styleRatio = typeof aspectRatio === 'number' ? aspectRatio : aspectRatio;

  return (
    <div
      className={`relative overflow-hidden bg-neutral-100 ${containerClassName}`}
      style={{
        aspectRatio: styleRatio,
        contain: 'paint layout',
      }}
    >
      <Image
        alt={alt}
        fill={fill}
        priority={priority}
        sizes={sizes}
        onLoad={() => setIsLoaded(true)}
        className={`object-cover duration-500 ease-out transition-opacity ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${imageClassName} ${className}`}
        {...props}
      />
    </div>
  );
}

export default OptimizedImage;
