'use client';

export default function EmailLink() {
  const em = 'hello' + String.fromCharCode(64) + 'hgmarketing.com';
  return <a href={`mailto:${em}`}>{em}</a>;
}
