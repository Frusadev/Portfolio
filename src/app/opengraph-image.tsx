import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Daniel Ametsowou | Full Stack Developer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#fbf5e9',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '20px solid #450a0a',
          color: '#450a0a',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Background Pattern - Grid */}
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'linear-gradient(#450a0a 1px, transparent 1px), linear-gradient(90deg, #450a0a 1px, transparent 1px)',
                backgroundSize: '100px 100px',
                opacity: 0.1,
                zIndex: 0,
            }}
        />

        {/* Content Box */}
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
                backgroundColor: '#fbf5e9',
                padding: '40px 80px',
                border: '8px solid #450a0a',
                boxShadow: '20px 20px 0px 0px #450a0a',
            }}
        >
            <div
                style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    marginBottom: '20px',
                    backgroundColor: '#450a0a',
                    color: '#fbf5e9',
                    padding: '8px 24px',
                }}
            >
                Portfolio
            </div>

            <div
                style={{
                    fontSize: '80px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    lineHeight: 1,
                    textAlign: 'center',
                    marginBottom: '10px',
                }}
            >
                Daniel
            </div>
            <div
                style={{
                    fontSize: '80px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    lineHeight: 1,
                    textAlign: 'center',
                    marginBottom: '30px',
                }}
            >
                Ametsowou
            </div>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                }}
            >
                <div style={{ height: '2px', width: '50px', backgroundColor: '#450a0a' }} />
                <div
                    style={{
                        fontSize: '32px',
                        fontWeight: 500,
                        opacity: 0.8,
                    }}
                >
                    Full Stack Developer
                </div>
                <div style={{ height: '2px', width: '50px', backgroundColor: '#450a0a' }} />
            </div>
        </div>

        {/* Corner Decorations */}
        <div style={{ position: 'absolute', top: '40px', left: '40px', width: '40px', height: '40px', borderTop: '8px solid #450a0a', borderLeft: '8px solid #450a0a' }} />
        <div style={{ position: 'absolute', top: '40px', right: '40px', width: '40px', height: '40px', borderTop: '8px solid #450a0a', borderRight: '8px solid #450a0a' }} />
        <div style={{ position: 'absolute', bottom: '40px', left: '40px', width: '40px', height: '40px', borderBottom: '8px solid #450a0a', borderLeft: '8px solid #450a0a' }} />
        <div style={{ position: 'absolute', bottom: '40px', right: '40px', width: '40px', height: '40px', borderBottom: '8px solid #450a0a', borderRight: '8px solid #450a0a' }} />

      </div>
    ),
    {
      ...size,
    }
  );
}
