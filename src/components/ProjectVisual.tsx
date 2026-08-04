import Image from 'next/image';

interface ProjectVisualProps {
  title: string;
  stack: string[];
  status: string;
  image?: string;
  priority?: boolean;
}

const blurPlaceholder = 'data:image/webp;base64,UklGRigAAABXRUJQVlA4IBwAAACQAQCdASoBAAEAAkA4JYgCdAEO/hepgAAA/v3Mn/gP3MpSh6J/OaE7L/63rD0X+7Z3f+b7f/67rL0X+7Z3f+b7f/67';

export function ProjectVisual({ title, stack, status, image, priority = false }: ProjectVisualProps) {
  if (image) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-stone-950 shadow-lg">
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={image}
            alt={`${title} application interface`}
            fill
            priority={priority}
            placeholder="blur"
            blurDataURL={blurPlaceholder}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>
        <div className="flex items-center justify-between border-t border-white/10 bg-stone-950 px-5 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-stone-500">{title}</span>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium ${
              status === 'shipped'
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-amber-500/10 text-amber-400'
            }`}>
              <span className={`h-1 w-1 rounded-full ${status === 'shipped' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              {status}
            </span>
          </div>
        </div>
      </div>
    );
  }

  const accents = ['bg-amber-400', 'bg-teal-500', 'bg-orange-400'];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-stone-950 p-5 text-stone-100 shadow-lg">
      <div className="absolute -right-14 -top-16 h-48 w-48 rounded-full bg-amber-400/20 blur-3xl" />
      <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-300" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /></div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-stone-500">project overview</span>
      </div>
      <div className="relative mt-8 grid gap-6 sm:grid-cols-[1fr_.8fr]">
        <div><p className="font-mono text-xs text-amber-300">{'// featured build'}</p><h3 className="mt-3 text-2xl font-semibold tracking-tight">{title}</h3><p className="mt-3 text-sm leading-6 text-stone-400">Designed with a product mindset and implemented across the stack.</p><div className="mt-6 flex items-end gap-2"><span className="h-10 w-3 rounded-t bg-amber-400" /><span className="h-16 w-3 rounded-t bg-teal-400" /><span className="h-7 w-3 rounded-t bg-orange-300" /><span className="h-12 w-3 rounded-t bg-amber-200" /></div></div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4"><p className="font-mono text-[10px] uppercase tracking-widest text-stone-500">Build profile</p><div className="mt-4 space-y-3">{stack.slice(0, 4).map((tech, index) => <div key={tech} className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${accents[index % accents.length]}`} /><span className="text-xs text-stone-300">{tech}</span></div>)}</div><div className="mt-8 border-t border-white/10 pt-3 text-xs text-emerald-300"><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-300" />{status === 'shipped' ? 'Shipped' : 'In active development'}</div></div>
      </div>
    </div>
  );
}
