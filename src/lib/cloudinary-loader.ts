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
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_${q},w_${width}/${src}`;
}
