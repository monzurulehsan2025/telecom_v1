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

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    @GetMapping("/metrics")
    public List<Metric> getMetrics() {
        return Arrays.asList(
                new Metric("Network Latency", "24ms", "-12%", "down"),
                new Metric("Lightspeed Throughput", "1.2 TB", "+8%", "up"),
                new Metric("Active Edge Nodes", "4,821", "+24", "up"),
                new Metric("System Health", "99.98%", "Stable", "neutral"));
    }

    @GetMapping("/agents")
    public List<AgentStatus> getAgents() {
        return Arrays.asList(
                new AgentStatus("OA-101", "Northeast Region Node", "online", 12, "48d 12h"),
                new AgentStatus("OA-102", "Southeast Gateway", "online", 18, "12d 04h"),
                new AgentStatus("OA-103", "Tristate Backbone", "warning", 85, "156d 22h"),
                new AgentStatus("OA-104", "West Coast Liaison", "offline", 0, "0h 0m"));
    }

    @GetMapping("/performance")
    public List<Map<String, Object>> getPerformance() {
        return Arrays.asList(
                Map.of("time", "00:00", "value", 400),
                Map.of("time", "04:00", "value", 300),
                Map.of("time", "08:00", "value", 600),
                Map.of("time", "12:00", "value", 850),
                Map.of("time", "16:00", "value", 520),
                Map.of("time", "20:00", "value", 940),
                Map.of("time", "23:59", "value", 780));
    }
}
