import * as React from 'react';
import { Activity, Zap, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import type { Metric } from '../types';
import { motion } from 'framer-motion';

interface MetricsGridProps {
    metrics: Metric[];
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics }) => {
    if (metrics.length === 0) return (
        <div className="grid-metrics">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="glass metric-card" style={{ height: '140px', background: 'rgba(255,255,255,0.02)' }} />
            ))}
        </div>
    );

    return (
        <div className="grid-metrics">
            {metrics.map((metric, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass metric-card"
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div className="metric-title">{metric.label}</div>
                        <div style={{ padding: '6px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                            {metric.trend === 'up' ? <ArrowUpRight size={16} color="var(--success)" /> :
                                metric.trend === 'down' ? <ArrowDownRight size={16} color="var(--primary)" /> :
                                    <Minus size={16} color="var(--text-muted)" />}
                        </div>
                    </div>
                    <div className="metric-value">{metric.value}</div>
                    <div style={{
                        fontSize: '0.8rem',
                        color: metric.trend === 'up' ? 'var(--success)' : metric.trend === 'down' ? 'var(--primary-light)' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginTop: '0.75rem',
                        fontWeight: 600
                    }}>
                        {metric.trend === 'up' ? <Zap size={14} /> : <Activity size={14} />}
                        {metric.change}
                        <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: '4px' }}>past hour</span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
