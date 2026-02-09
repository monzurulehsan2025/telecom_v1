package com.optimum.dashboard.controller;

import com.optimum.dashboard.model.AgentStatus;
import com.optimum.dashboard.model.Metric;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {
    private final Random random = new Random();

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @GetMapping("/metrics")
    public List<Metric> getMetrics() {
        return generateMetrics();
    }

    @GetMapping("/agents")
    public List<AgentStatus> getAgents() {
        return generateAgents();
    }

    @GetMapping("/performance")
    public List<Map<String, Object>> getPerformance() {
        return generatePerformance();
    }

    @Scheduled(fixedRate = 1000)
    public void pushUpdates() {
        messagingTemplate.convertAndSend("/topic/metrics", generateMetrics());
        messagingTemplate.convertAndSend("/topic/agents", generateAgents());
        messagingTemplate.convertAndSend("/topic/performance", generatePerformance());
    }

    private List<Metric> generateMetrics() {
        return Arrays.asList(
                new Metric("Network Latency", (20 + random.nextInt(10)) + "ms", "-12%", "down"),
                new Metric("Lightspeed Throughput", String.format("%.2f TB", 1.0 + random.nextDouble() * 0.5), "+8%",
                        "up"),
                new Metric("Active Edge Nodes", (4800 + random.nextInt(50)) + "", "+24", "up"),
                new Metric("System Health", "99." + (90 + random.nextInt(10)) + "%", "Stable", "neutral"));
    }

    private List<AgentStatus> generateAgents() {
        return Arrays.asList(
                new AgentStatus("OA-101", "Northeast Region Node", "online", 10 + random.nextInt(10), "48d 12h"),
                new AgentStatus("OA-102", "Southeast Gateway", "online", 15 + random.nextInt(10), "12d 04h"),
                new AgentStatus("OA-103", "Tristate Backbone", random.nextBoolean() ? "online" : "warning",
                        50 + random.nextInt(40), "156d 22h"),
                new AgentStatus("OA-104", "West Coast Liaison", "offline", 0, "0h 0m"));
    }

    private List<Map<String, Object>> generatePerformance() {
        String[] times = { "00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "23:59" };
        return Arrays.stream(times)
                .map(time -> Map.of("time", time, "value", (Object) (300 + random.nextInt(700))))
                .collect(Collectors.toList());
    }
}
