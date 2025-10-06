import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'AROKYA ILLAM CHARITABLE TRUST'
  const description = searchParams.get('description') || 'Healthcare and aided support for persons with disability across India.'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <div
          style={{
            marginLeft: 40,
            marginRight: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                backgroundColor: '#fff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 20,
              }}
            >
              <span style={{ fontSize: 32, fontWeight: 'bold', color: '#667eea' }}>
                AICT
              </span>
            </div>
            <div>
              <h1 style={{ fontSize: 48, fontWeight: 'bold', color: '#fff', margin: 0 }}>
                AROKYA ILLAM
              </h1>
              <p style={{ fontSize: 24, color: '#e0e7ff', margin: 0 }}>
                CHARITABLE TRUST
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h2
              style={{
                fontSize: 36,
                fontWeight: 'bold',
                color: '#fff',
                marginBottom: 16,
                lineHeight: 1.2,
              }}
            >
              {title}
            </h2>
            <p
              style={{
                fontSize: 24,
                color: '#e0e7ff',
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {description}
            </p>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: 40,
              left: 40,
              right: 40,
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: 20, color: '#94a3b8', margin: 0 }}>
              Think better. · Healthcare & Support for Persons with Disability
            </p>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}