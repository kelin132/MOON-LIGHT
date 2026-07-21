'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/GlassCard';

export default function EditProfilePage() {
  const router = useRouter();
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/profile')
      .then((r) => r.json())
      .then((data) => {
        setBio(data.user?.bio || '');
        setAvatarUrl(data.user?.avatarUrl || '');
        setBannerUrl(data.user?.bannerUrl || '');
        setLoading(false);
      });
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const res = await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bio, avatarUrl, bannerUrl }),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Something went wrong saving your profile.');
      return;
    }

    setSaved(true);
    router.refresh();
  }

  if (loading) {
    return <div className="text-text-lo">Loading…</div>;
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-display text-3xl">Edit profile</h1>

      <form onSubmit={handleSave} className="space-y-5">
        <GlassCard className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-text-lo mb-1.5">BIO</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={500}
              rows={4}
              className="w-full rounded-lg bg-void/60 border border-border px-3 py-2.5 text-text-hi focus-ring resize-none"
              placeholder="Tell the Haven a little about yourself…"
            />
            <div className="text-right text-xs text-text-lo mt-1">{bio.length}/500</div>
          </div>

          <div>
            <label className="block text-xs font-mono text-text-lo mb-1.5">
              PROFILE PICTURE URL
            </label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://example.com/your-avatar.png"
              className="w-full rounded-lg bg-void/60 border border-border px-3 py-2.5 text-text-hi focus-ring"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-text-lo mb-1.5">
              BANNER / BACKGROUND IMAGE URL
            </label>
            <input
              type="url"
              value={bannerUrl}
              onChange={(e) => setBannerUrl(e.target.value)}
              placeholder="https://example.com/your-banner.png"
              className="w-full rounded-lg bg-void/60 border border-border px-3 py-2.5 text-text-hi focus-ring"
            />
          </div>
        </GlassCard>

        {error && (
          <div className="text-sm text-danger bg-danger/10 border border-danger/30 rounded-lg px-3 py-2">
            {error}
          </div>
        )}
        {saved && <div className="text-sm text-success">Profile updated.</div>}

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-moonviolet hover:bg-moonviolet-dark transition-colors px-5 py-2.5 font-medium focus-ring disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </form>
    </div>
  );
}
