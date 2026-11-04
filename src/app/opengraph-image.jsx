import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Siddharth Mishra — AI Engineer & Generative AI Developer';
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
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#04040A',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(99, 102, 241, 0.15) 0%, transparent 60%)',
          padding: '80px',
          fontFamily: 'sans-serif',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#10121C',
              border: '1px solid rgba(34, 211, 238, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#22d3ee',
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            ⚡
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: '18px',
                letterSpacing: '0.2em',
                color: '#22d3ee',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
              }}
            >
              PORTFOLIO &amp; RESEARCH ARCHIVE
            </span>
            <span style={{ fontSize: '14px', color: '#94a3b8', fontFamily: 'monospace' }}>
              MAIT, Delhi • CGPA 8.98
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h1
            style={{
              fontSize: '62px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: 0,
              color: '#ffffff',
            }}
          >
            Siddharth Mishra
          </h1>
          <p
            style={{
              fontSize: '26px',
              color: '#a5b4fc',
              margin: 0,
              fontWeight: 500,
            }}
          >
            AI Engineer • Generative AI &amp; Software Systems
          </p>
          <p
            style={{
              fontSize: '18px',
              color: '#94a3b8',
              margin: 0,
              maxWidth: '920px',
              lineHeight: 1.5,
            }}
          >
            Specializing in LangGraph stateful DAG orchestration, FAISS RAG retrieval, production ML pipelines, and reactive full-stack software.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {['LangGraph', 'Gemini API', 'FAISS RAG', 'FastAPI', 'Next.js', 'Random Forest', 'Deep CNN'].map((tech) => (
            <div
              key={tech}
              style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                fontSize: '15px',
                fontFamily: 'monospace',
                color: '#e2e8f0',
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

