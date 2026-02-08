export interface AgentStatus {
    id: string;
    name: string;
    status: 'online' | 'offline' | 'warning';
    latency: number;
    uptime: string;
}

export interface Metric {
    label: string;
    value: string;
    change: string;
    trend: 'up' | 'down' | 'neutral';
}
