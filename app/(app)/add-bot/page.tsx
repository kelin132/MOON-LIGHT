import GlassCard from '@/components/GlassCard';

export const metadata = { title: 'Add Bot' };

export default function AddBotPage() {
  const inviteUrl = process.env.NEXT_PUBLIC_BOT_INVITE_URL || '#';

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="font-display text-3xl">Add the Bot</h1>
        <p className="text-text-lo mt-1">
          Bring Moonlight Haven to your own Discord server.
        </p>
      </div>

      <GlassCard hover={false} className="text-center py-10">
        <p className="text-text-lo mb-6">
          One click adds guilds, cards, and the Haven economy to your server.
        </p>
        <a
          href={inviteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-moonviolet hover:bg-moonviolet-dark transition-colors px-6 py-3 font-medium focus-ring"
        >
          Add to Discord
        </a>
        {inviteUrl === '#' && (
          <p className="text-xs text-text-lo mt-4 font-mono">
            Set NEXT_PUBLIC_BOT_INVITE_URL in your env vars to activate this button.
          </p>
        )}
      </GlassCard>
    </div>
  );
}
