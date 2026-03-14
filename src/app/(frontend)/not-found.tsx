import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500 mb-4">404</p>
      <h1 className="text-5xl font-bold text-primary mb-4">Page not found</h1>
      <p className="text-lg text-neutral-500 mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button href="/">Back to Home</Button>
    </div>
  );
}
