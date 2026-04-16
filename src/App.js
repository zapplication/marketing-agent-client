import React, { useState } from 'react';

const API_BASE = 'https://marketing-agent-server-production.up.railway.app';

const TABS = ['Plan', 'Images', 'Captions', 'Reels', 'Scripts'];

async function callAPI(endpoint, data) {
  try {
    const res = await fetch(API_BASE + endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (e) {
    return { error: e.message };
  }
}

function PlanTab() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  
  const generate = async () => {
    setLoading(true);
    const data = await callAPI('/api/claude', {
      messages: [{ role: 'user', content: 'Create a 7-day content calendar for Instagram, TikTok, YouTube. Return JSON.' }],
      system: 'You are a marketing expert.'
    });
    setLoading(false);
    setResult(JSON.stringify(data, null, 2));
  };
  
  return (
    <div>
      <h3>📅 Content Calendar</h3>
      <button onClick={generate} disabled={loading} style={{ padding: '12px 24px', background: '#0ea5c9', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', marginBottom: 16 }}>
        {loading ? 'Generating...' : 'Generate 7-Day Calendar'}
      </button>
      {result && <pre style={{ background: '#0a1820', padding: 16, borderRadius: 8, overflow: 'auto', maxHeight: 400, fontSize: 12 }}>{result}</pre>}
    </div>
  );
}

function ImagesTab() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  
  const generate = async () => {
    setLoading(true);
    const data = await callAPI('/api/dalle', {
      prompt: 'A beautiful marketing image for social media, bright colors, professional photography style'
    });
    setLoading(false);
    if (data.data && data.data[0]) {
      setResult(data.data[0].url);
    } else {
      setResult(JSON.stringify(data, null, 2));
    }
  };
  
  return (
    <div>
      <h3>🖼️ AI Image Generation</h3>
      <button onClick={generate} disabled={loading} style={{ padding: '12px 24px', background: '#0ea5c9', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', marginBottom: 16 }}>
        {loading ? 'Generating...' : 'Generate Image'}
      </button>
      {result && (result.startsWith('http') ? <img src={result} alt="Generated" style={{ maxWidth: '100%', borderRadius: 8 }} /> : <pre style={{ background: '#0a1820', padding: 16, borderRadius: 8 }}>{result}</pre>)}
    </div>
  );
}

function CaptionsTab() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  
  const generate = async () => {
    setLoading(true);
    const data = await callAPI('/api/claude', {
      messages: [{ role: 'user', content: 'Write a catchy Instagram caption for a new product launch. Include hashtags. Return JSON with headline and caption.' }],
      system: 'You are a marketing expert.'
    });
    setLoading(false);
    setResult(JSON.stringify(data, null, 2));
  };
  
  return (
    <div>
      <h3>✍️ Caption Generator</h3>
      <button onClick={generate} disabled={loading} style={{ padding: '12px 24px', background: '#0ea5c9', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', marginBottom: 16 }}>
        {loading ? 'Generating...' : 'Generate Captions'}
      </button>
      {result && <pre style={{ background: '#0a1820', padding: 16, borderRadius: 8, overflow: 'auto', maxHeight: 400, fontSize: 12 }}>{result}</pre>}
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('Plan');
  const [apiStatus, setApiStatus] = useState('checking');
  
  React.useEffect(() => {
    fetch(API_BASE + '/health').then(() => setApiStatus('connected')).catch(() => setApiStatus('disconnected'));
  }, []);
  
  const tabs = {
    Plan: <PlanTab />,
    Images: <ImagesTab />,
    Captions: <CaptionsTab />,
    Reels: <div><h3>🎬 Reels</h3><p>Video generation requires Kling AI setup. Coming soon!</p></div>,
    Scripts: <div><h3>📝 Scripts</h3><p>Script writing feature. Coming soon!</p></div>
  };
  
  return (
    <div style={{ minHeight: '100vh', background: '#080d12', color: '#fff', fontFamily: 'sans-serif' }}>
      <header style={{ padding: '14px 28px', borderBottom: '1px solid #0d2030', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg,#0ea5c9,#0369a1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>✦</div>
          <div style={{ fontWeight: 800, fontSize: 16 }}>MarketingAgent</div>
        </div>
        <div style={{ fontSize: 12, color: apiStatus === 'connected' ? '#10b981' : '#ef4444' }}>
          ● API {apiStatus}
        </div>
      </header>
      
      <div style={{ display: 'flex', gap: '4px', background: '#061018', padding: '4px', margin: '16px 24px', borderRadius: '10px', width: 'fit-content' }}>
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: activeTab === tab ? '#0ea5c9' : 'transparent', color: activeTab === tab ? '#fff' : '#3a7a96', fontWeight: 600, fontSize: 13 }}>
            {tab}
          </button>
        ))}
      </div>
      
      <main style={{ maxWidth: 960, margin: '0 auto', padding: '24px' }}>
        {tabs[activeTab]}
      </main>
    </div>
  );
}

export default App;