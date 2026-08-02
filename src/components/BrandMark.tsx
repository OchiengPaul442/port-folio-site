import Image from 'next/image';

interface BrandMarkProps {
  className?: string;
  title?: string;
}

export function BrandMark({ className = 'h-9 w-9', title = 'Paul Ochieng Levi mark' }: BrandMarkProps) {
  return (
    <Image
      className={className}
      src="/brand/logo-transparent.svg"
      alt={title}
      width={48}
      height={48}
    />
  );
}
