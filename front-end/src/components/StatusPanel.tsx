import * as React from 'react';
import { Server, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import type { AgentStatus } from '../types';

export const StatusPanel: React.FC = () => {
    const [agents, setAgents] = React.useState<AgentStatus[]>([]);

    React.useEffect(() => {
        fetch('http://localhost:8080/api/agents')
            .then(res => res.json())
            .then(data => setAgents(data))
            .catch(err => console.error('Error fetching agents:', err));
    }, []);

    return (
        <div className="glass panel fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="section-title">
                <Server size={22} color="var(--primary)" />
                One Agent Fleet Status
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {agents.map((agent) => (
                    <div key={agent.id} className="agent-item">
                        <div>
                            <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-main)' }}>{agent.name}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                                ID: {agent.id} • Latency: {agent.latency}ms
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                color: agent.status === 'online' ? 'var(--success)' : agent.status === 'warning' ? 'var(--warning)' : 'var(--danger)'
                            }}>
                                {agent.status === 'online' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                {agent.status.toUpperCase()}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end', marginTop: '4px' }}>
                                <Clock size={12} /> {agent.uptime}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
