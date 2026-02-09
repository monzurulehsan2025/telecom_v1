import * as React from 'react';
import { CheckCircle2, AlertCircle, Clock, Cpu, Activity } from 'lucide-react';
import type { AgentStatus } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface StatusPanelProps {
    agents: AgentStatus[];
}

export const StatusPanel: React.FC<StatusPanelProps> = ({ agents }) => {

    return (
        <div className="glass panel animate-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Cpu size={24} color="var(--primary)" />
                One Agent Health
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <AnimatePresence>
                    {agents.map((agent, idx) => (
                        <motion.div
                            key={agent.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + (idx * 0.1) }}
                            className="agent-item"
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div className={`status-indicator ${agent.status}`}>
                                    {agent.status === 'online' && <div className="pulse" />}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '2px' }}>{agent.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                                        {agent.id} • {agent.latency}ms latency
                                    </div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    color: agent.status === 'online' ? 'var(--success)' : agent.status === 'warning' ? 'var(--warning)' : 'var(--danger)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    {agent.status === 'online' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                                    {agent.status}
                                </div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', marginTop: '6px' }}>
                                    <Clock size={12} /> {agent.uptime}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(0, 122, 255, 0.05)', borderRadius: '16px', border: '1px solid rgba(0, 122, 255, 0.1)' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--primary-light)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Activity size={14} />
                    Automatic self-healing active for this cluster.
                </p>
            </div>
        </div>
    );
};
