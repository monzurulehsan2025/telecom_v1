import * as React from 'react';
import { Activity, Zap } from 'lucide-react';
import type { Metric } from '../types';

export const MetricsGrid: React.FC = () => {
    const [metrics, setMetrics] = React.useState<Metric[]>([]);

    React.useEffect(() => {
        fetch('http://localhost:8080/api/metrics')
            .then(res => res.json())
            .then(data => setMetrics(data))
            .catch(err => console.error('Error fetching metrics:', err));
    }, []);

    if (metrics.length === 0) return null;

    return (
        <div className="grid-metrics">
            {metrics.map((metric, idx) => (
                <div key={idx} className="glass metric-card fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className="metric-title">{metric.label}</div>
                    <div className="metric-value">{metric.value}</div>
                    <div style={{
                        fontSize: '0.85rem',
                        color: metric.trend === 'up' ? 'var(--success)' : metric.trend === 'down' ? 'var(--primary)' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginTop: '0.5rem'
                    }}>
                        {metric.trend === 'up' ? <Zap size={14} /> : <Activity size={14} />}
                        {metric.change} from last hour
                    </div>
                </div>
            ))}
        </div>
    );
};
