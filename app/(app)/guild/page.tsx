import dbConnect from '@/lib/mongodb';
import Guild from '@/lib/models/Guild';
import GuildPreviewCard from '@/components/GuildPreviewCard';

export const metadata = { title: 'Guilds' };
export const dynamic = 'force-dynamic';

export default async function GuildPage() {
  await dbConnect();
  const guilds = await Guild.find({}).sort({ members: -1 }).limit(200).lean();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Guilds</h1>
        <p className="text-text-lo mt-1">Every guild currently active in the MoonlightHaven.</p>
      </div>

      {guilds.length === 0 ? (
        <div className="text-text-lo">No guilds have been created yet.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {guilds.map((g: any) => (
            <GuildPreviewCard key={String(g._id)} guild={g} />
          ))}
        </div>
      )}
    </div>
  );
}
