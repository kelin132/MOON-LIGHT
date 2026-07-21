import Link from 'next/link';

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-moon-glow px-4">
      <div className="text-center max-w-md">
        <div className="font-mono text-moonviolet-light text-sm tracking-widest mb-3">
          ERROR 403
        </div>
        <h1 className="font-display text-4xl mb-3">Not for your eyes</h1>
        <p className="text-text-lo mb-8">
          This corner of the Haven is reserved for staff. If you think that&apos;s wrong,
          ping a Mod or Owner.
        </p>
        <Link
          href="/profile"
          className="inline-block rounded-lg bg-moonviolet hover:bg-moonviolet-dark transition-colors px-5 py-2.5 font-medium focus-ring"
        >
          Back to your profile
        </Link>
      </div>
    </div>
  );
}
