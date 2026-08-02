import { ImageResponse } from 'next/og';
import { SITE_TITLE } from '@/lib/site';

export const runtime = 'edge';
export const alt = SITE_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: '#17171c', color: '#f7f5ff', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px' }}>
      <div style={{ color: '#c084fc', fontSize: 28, letterSpacing: 4, marginBottom: 24 }}>OCHIENGPAUL.COM</div>
      <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>{SITE_TITLE}</div>
      <div style={{ color: '#c9c4d4', fontSize: 30, marginTop: 30 }}>Reliable web products, APIs, developer tools, and data platforms.</div>
    </div>,
    { ...size },
  );
}
