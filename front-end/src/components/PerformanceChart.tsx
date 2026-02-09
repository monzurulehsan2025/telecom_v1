import * as React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

export const PerformanceChart: React.FC = () => {
    const [data, setData] = React.useState<any[]>([]);

    React.useEffect(() => {
        const fetchPerformance = () => {
            fetch('/api/performance')
                .then(res => res.json())
                .then(data => setData(data))
                .catch(err => console.error('Error fetching performance data:', err));
        };

        fetchPerformance();
        const interval = setInterval(fetchPerformance, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass panel"
            style={{ minHeight: '450px' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <h3 className="section-title" style={{ marginBottom: 0 }}>
                    Lightspeed Fabric Throughput
                </h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, background: 'rgba(0, 122, 255, 0.1)', color: 'var(--primary-light)', padding: '4px 10px', borderRadius: '6px' }}>Gbps</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-muted)', padding: '4px 10px', borderRadius: '6px' }}>LIVE</span>
                </div>
            </div>

            <div style={{ width: '100%', height: '320px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.5} />
                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                        <XAxis
                            dataKey="time"
                            stroke="rgba(255,255,255,0.2)"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                            dy={15}
                            fontFamily="var(--font-mono)"
                        />
                        <YAxis
                            stroke="rgba(255,255,255,0.2)"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                            dx={-10}
                            tickFormatter={(value: number) => `${value}`}
                            fontFamily="var(--font-mono)"
                        />
                        <Tooltip
                            cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
                            contentStyle={{
                                backgroundColor: '#111827',
                                border: '1px solid var(--border)',
                                borderRadius: '12px',
                                color: 'var(--text-main)',
                                backdropFilter: 'blur(10px)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                                padding: '12px'
                            }}
                            itemStyle={{ color: 'var(--primary-light)', fontWeight: 700 }}
                            labelStyle={{ color: 'var(--text-muted)', marginBottom: '4px', fontSize: '0.75rem' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="var(--primary)"
                            fillOpacity={1}
                            fill="url(#colorValue)"
                            strokeWidth={4}
                            animationDuration={2500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--primary)' }} />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Primary Uplink</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Current Peak: <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>940 Gbps</span>
                </p>
            </div>
        </motion.div>
    );
};
