import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import type { Metric, AgentStatus } from '../types';

export const useDashboardSocket = () => {
    const [metrics, setMetrics] = useState<Metric[]>([]);
    const [agents, setAgents] = useState<AgentStatus[]>([]);
    const [performance, setPerformance] = useState<any[]>([]);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws-dashboard'),
            onConnect: () => {
                setConnected(true);
                client.subscribe('/topic/metrics', (message) => {
                    setMetrics(JSON.parse(message.body));
                });
                client.subscribe('/topic/agents', (message) => {
                    setAgents(JSON.parse(message.body));
                });
                client.subscribe('/topic/performance', (message) => {
                    setPerformance(JSON.parse(message.body));
                });
            },
            onDisconnect: () => {
                setConnected(false);
            },
            debug: () => {
                // console.log(msg);
            },
        });

        client.activate();

        return () => {
            client.deactivate();
        };
    }, []);

    return { metrics, agents, performance, connected };
};
