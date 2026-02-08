import * as React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChart } from 'lucide-react';

export const PerformanceChart: React.FC = () => {
    const [data, setData] = React.useState<any[]>([]);

    React.useEffect(() => {
        fetch('http://localhost:8080/api/performance')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.error('Error fetching performance data:', err));
    }, []);

    return (
        <div className="glass panel fade-in" style={{ animationDelay: '0.3s', minHeight: '400px' }}>
            <h3 className="section-title">
                <LineChart size={22} color="var(--primary)" />
                Lightspeed Data Throughput (Gbps)
            </h3>
            <div style={{ width: '100%', height: '320px', marginTop: '1.5rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                        <XAxis
                            dataKey="time"
                            stroke="var(--text-muted)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="var(--text-muted)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            dx={-10}
                            tickFormatter={(value: number) => `${value}`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(5, 7, 10, 0.95)',
                                border: '1px solid var(--border)',
                                borderRadius: '12px',
                                color: 'var(--text-main)',
                                backdropFilter: 'blur(8px)'
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="var(--primary)"
                            fillOpacity={1}
                            fill="url(#colorValue)"
                            strokeWidth={4}
                            animationDuration={2000}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
