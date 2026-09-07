import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#09090b', borderRadius: 36 }}>
      <div style={{ width: 94, height: 122, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fafafa', borderRadius: 18, color: '#09090b', fontSize: 42, fontWeight: 700 }}>∑</div>
    </div>,
    size,
  )
}
