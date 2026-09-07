import { ImageResponse } from 'next/og'

export const alt = 'Scientific Calculator Online'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, background: '#09090b', color: '#fafafa', fontFamily: 'sans-serif' }}>
      <div style={{ fontSize: 28, color: '#a1a1aa', marginBottom: 20 }}>Scientific Calculator</div>
      <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05 }}>Scientific calculator online</div>
      <div style={{ fontSize: 28, color: '#a1a1aa', marginTop: 28 }}>Fractions · Trigonometry · Logarithms · Exponents · Scientific notation</div>
    </div>,
    size,
  )
}
