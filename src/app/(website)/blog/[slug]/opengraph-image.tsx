import { ImageResponse } from 'next/og';
import { getPost } from '@/app/actions/blog';

export const runtime = 'nodejs';
export const alt = 'Blog Post Cover';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
      return new ImageResponse(
          (
              <div
                  style={{
                      fontSize: 48,
                      background: '#fbf5e9',
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#450a0a',
                  }}
              >
                  Post not found
              </div>
          ),
          { ...size }
      );
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: '#fbf5e9', // bg-[#fbf5e9]
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '60px',
          border: '20px solid #450a0a', // border-red-950
          color: '#450a0a',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Tags */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {(post.tags || []).map((tag) => (
              <div
                key={tag}
                style={{
                  padding: '8px 20px',
                  backgroundColor: 'rgba(69, 10, 10, 0.05)',
                  border: '1px solid rgba(69, 10, 10, 0.2)',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '80px',
              fontWeight: 900,
              lineHeight: 1.1,
              marginTop: '20px',
              marginBottom: '20px',
            }}
          >
            {post.title}
          </div>

          {/* Description */}
          <div
             style={{
                 display: 'flex',
                 borderLeft: '8px solid #450a0a',
                 paddingLeft: '30px',
             }}
          >
              <div
                style={{
                  fontSize: '32px',
                  color: 'rgba(69, 10, 10, 0.7)',
                  lineHeight: 1.4,
                  fontWeight: 500,
                }}
              >
                {post.description}
              </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end', 
            width: '100%',
            marginTop: 'auto' 
        }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>
                    Daniel Ametsowou
                </div>
                 <div style={{ fontSize: '20px', opacity: 0.4 }}>
                    Full Stack Developer
                </div>
            </div>
            
             <div style={{ 
                 fontSize: '24px', 
                 fontWeight: 'bold', 
                 textTransform: 'uppercase', 
                 letterSpacing: '0.1em', 
                 opacity: 0.4 
            }}>
                {new Date(post.createdAt || Date.now()).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
