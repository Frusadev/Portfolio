import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'nodejs';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 18,
          background: '#450a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#e6dcc6', // Beige text
          fontWeight: 900,
          fontFamily: 'sans-serif',
          border: '2px solid #e6dcc6',
          borderRadius: '4px',
        }}
      >
        DA
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
