import React, { useState } from 'react';

const API_BASE = 'https://marketing-agent-server-production.up.railway.app';

const TABS = ['Plan', 'Images', 'Captions', 'Reels', 'Scripts'];

function App() {
  const [activeTab, setActiveTab] = useState('Plan');
  
  return (
    <div style={{ minHeight: '100vh', background: '#080d12', color: '#fff', fontFamily: 'sans-serif' }}>
      <header style={{ padding: '14px 28px', borderBottom: '1px solid #0d2030', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg,#0ea5c9,#0369a1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>✦</div>
        <div style={{ fontWeight: 800, fontSize: 16 }}>MarketingAgent</div>
      </header>
      
      <div style={{ display: 'flex', gap: '4px', background: '#061018', padding: '4px', margin: '16px 24px', borderRadius: '10px', width: 'fit-content' }}>
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: activeTab === tab ? '#0ea5c9' : 'transparent', color: activeTab === tab ? '#fff' : '#3a7a96', fontWeight: 600, fontSize: 13 }}>
            {tab}
          </button>
        ))}
      </div>
      
      <main style={{ maxWidth: 960, margin: '0 auto', padding: '24px' }}>
        <h2 style={{ fontSize: 24, marginBottom: 16 }}>Welcome to MarketingAgent</h2>
        <p style={{ color: '#888', marginBottom: 24 }}>AI-powered marketing tool powered by Claude, DALL-E, and Kling AI.</p>
        
        <div style={{ background: '#0a1820', border: '1px solid #1a3040', borderRadius: 12, padding: 20 }}>
          <p style={{ color: '#666' }}>Click a tab above to get started. Make sure the backend API is connected.</p>
          <p style={{ color: '#666', marginTop: 12 }}>API Base: {API_BASE}</p>
        </div>
      </main>
    </div>
  );
}

export default App;