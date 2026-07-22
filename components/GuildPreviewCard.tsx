import Image from "next/image";
import GlassCard from "./GlassCard";

export default function GuildPreviewCard({ guild }: { guild: any }) {
  const image = guild.icon || guild.thumbnailUrl;
  const memberCount = guild.members?.length ?? guild.memberCount ?? 0;

  return (
    <GlassCard className="!p-0 overflow-hidden flex flex-col">
      <div className="relative h-32 w-full bg-surface2">
        {image ? (
          <Image
            src={image}
            alt={guild.name}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-moonviolet/25 to-void" />
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-display text-lg">
          {guild.name}
        </h3>

        <p className="text-sm text-text-lo mt-1 flex-1 line-clamp-3">
          {guild.description || "No description yet."}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-mono text-text-lo">
            {memberCount} members
          </span>

          {guild.previewUrl && (
            <a
              href={guild.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs rounded-lg bg-moonviolet/15 hover:bg-moonviolet/25 text-moonviolet-light px-3 py-1.5 transition-colors focus-ring"
            >
              Preview
            </a>
          )}
        </div>
      </div>
    </GlassCard>
  );
}              href={guild.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs rounded-lg bg-moonviolet/15 hover:bg-moonviolet/25 text-moonviolet-light px-3 py-1.5 transition-colors focus-ring"
            >
              Preview
            </a>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
