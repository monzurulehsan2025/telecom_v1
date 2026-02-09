import * as React from 'react';
import { Network, Search, Bell, Settings, User, Terminal, LayoutDashboard, Database, Activity } from 'lucide-react';
import { MetricsGrid } from './components/MetricsGrid';
import { PerformanceChart } from './components/PerformanceChart';
import { StatusPanel } from './components/StatusPanel';
import { motion } from 'framer-motion';
import { useDashboardSocket } from './hooks/useDashboardSocket';

const App: React.FC = () => {
    const { metrics, agents, performance, connected } = useDashboardSocket();

    return (
        <div className="container">
            <header className="animate-in">
                <div className="logo-group">
                    <div className="logo-icon">
                        <Network color="white" size={26} strokeWidth={2.5} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '-2px' }}>Enterprise</p>
                        <h1 style={{ fontSize: '1.4rem', lineHeight: 1.1, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>Service Command</h1>
                    </div>
                </div>

                <div className="search-bar">
                    <Search size={18} color="var(--text-muted)" />
                    <input
                        type="text"
                        placeholder="Search nodes, infrastructure or metrics..."
                        style={{
                            background: 'none',
                            border: 'none',
                            outline: 'none',
                            color: 'var(--text-main)',
                            width: '100%',
                            fontSize: '0.9rem'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '20px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: connected ? 'var(--success)' : 'var(--danger)', boxShadow: connected ? '0 0 8px var(--success)' : 'none' }}></div>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{connected ? 'Live' : 'Disconnected'}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {[Bell, Settings, LayoutDashboard].map((Icon, idx) => (
                            <motion.button
                                key={idx}
                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.05)' }}
                                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', padding: '8px', borderRadius: '10px', cursor: 'pointer' }}
                            >
                                <Icon size={20} />
                            </motion.button>
                        ))}
                    </div>
                    <div style={{ borderLeft: '1px solid var(--border)', height: '20px', margin: '0 4px' }}></div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '12px',
                            background: 'linear-gradient(45deg, var(--primary), var(--accent))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)',
                            cursor: 'pointer'
                        }}
                    >
                        <User size={20} color="white" />
                    </motion.div>
                </div>
            </header>

            <main>
                <div className="animate-in" style={{ marginBottom: '3rem', animationDelay: '0.1s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: connected ? 'var(--primary)' : 'var(--danger)', marginBottom: '8px' }}>
                                <Activity size={18} />
                                <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em' }}>{connected ? 'PLATFORM STATUS: OPERATIONAL' : 'OFFLINE: RECONNECTING...'}</span>
                            </div>
                            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '-1px' }}>Infrastructure Overview</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px' }}>
                                Operational insight into the One Agent ecosystem and high-throughput Lightspeed data fabric.
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="glass"
                                style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600, color: 'var(--text-main)', cursor: 'pointer' }}
                            >
                                <Terminal size={18} />
                                CLI Access
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-primary"
                            >
                                Sync Platform
                            </motion.button>
                        </div>
                    </div>
                </div>

                <MetricsGrid metrics={metrics} />

                <div className="main-content">
                    <PerformanceChart data={performance} />
                    <StatusPanel agents={agents} />
                </div>

                <footer className="animate-in" style={{ marginTop: '6rem', padding: '4rem 0', borderTop: '1px solid var(--border)', textAlign: 'center', animationDelay: '0.6s' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
                        <Database size={24} color="var(--border)" />
                        <Network size={24} color="var(--border)" />
                        <LayoutDashboard size={24} color="var(--border)" />
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                        Architectural PoC developed for the Manager position. This interface demonstrates the convergence of real-time telemetry
                        and infrastructure management within the <strong>Lightspeed</strong> and <strong>One Agent</strong> frameworks.
                    </p>
                    <div style={{ marginTop: '2rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 600 }}>
                        Manager Software Engineering • Engineering Operations Proof-of-Concept
                    </div>
                </footer>
            </main >
        </div >
    );
};

export default App;
