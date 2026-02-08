import * as React from 'react';
import { Network, Search, Bell, Settings, User, Terminal } from 'lucide-react';
import { MetricsGrid } from './components/MetricsGrid';
import { PerformanceChart } from './components/PerformanceChart';
import { StatusPanel } from './components/StatusPanel';

const App: React.FC = () => {
    return (
        <div className="container">
            <header className="fade-in">
                <div className="logo-group">
                    <div className="logo-icon">
                        <Network color="white" size={28} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.75rem', lineHeight: 1.1, color: 'var(--text-main)' }}></h1>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.1em' }}>SERVICE COMMAND CENTER</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div className="glass" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '12px', minWidth: '300px' }}>
                        <Search size={18} color="var(--text-muted)" />
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Search nodes, agents, or metrics...</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                        <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><Bell size={22} /></button>
                        <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><Settings size={22} /></button>
                        <div style={{ borderLeft: '1px solid var(--border)', height: '24px', margin: '0 8px' }}></div>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '12px',
                            background: 'linear-gradient(45deg, var(--primary), #00c6ff)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)'
                        }}>
                            <User size={22} color="white" />
                        </div>
                    </div>
                </div>
            </header>

            <main>
                <div className="fade-in" style={{ marginBottom: '2.5rem', animationDelay: '0.1s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                            <h2 style={{ fontSize: '2.25rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>Network Operations</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Enterprise-grade monitoring for One Agent and Lightspeed platforms.</p>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button className="glass" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--text-main)', cursor: 'pointer' }}>
                                <Terminal size={18} />
                                Logs
                            </button>
                            <button style={{
                                padding: '10px 24px',
                                background: 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontWeight: 600,
                                boxShadow: '0 4px 16px var(--primary-glow)',
                                cursor: 'pointer'
                            }}>
                                Deploy Now
                            </button>
                        </div>
                    </div>
                </div>

                <MetricsGrid />

                <div className="main-content">
                    <PerformanceChart />
                    <StatusPanel />
                </div>

                <div className="fade-in" style={{ marginTop: '4rem', padding: '3rem', borderTop: '1px solid var(--border)', textAlign: 'center', animationDelay: '0.6s' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
                        This proof-of-concept showcases the architectural modularity and observability patterns required to oversee the
                        <strong> One Agent</strong> and <strong>Lightspeed</strong> ecosystems.
                    </p>
                    <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'white', opacity: 0.2, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                        Optimum Engineering • Manager Software Engineering PoC
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
