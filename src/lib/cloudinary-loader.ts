'use client';

interface CloudinaryLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

export default function cloudinaryLoader({ src, width, quality }: CloudinaryLoaderParams): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    // Fallback: return src as-is during development without Cloudinary
    return src;
  }

  const q = quality || 'auto';
  // Encode each path segment individually so folder paths (containing /)
  // are preserved while special characters in filenames are escaped.
  const encodedSrc = src
    .split('/')
    .map(segment => encodeURIComponent(segment))
    .join('/');
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_${q},w_${width}/${encodedSrc}`;
}
