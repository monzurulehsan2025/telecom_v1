package com.optimum.dashboard.model;

public class AgentStatus {
    private String id;
    private String name;
    private String status;
    private int latency;
    private String uptime;

    public AgentStatus(String id, String name, String status, int latency, String uptime) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.latency = latency;
        this.uptime = uptime;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getLatency() {
        return latency;
    }

    public void setLatency(int latency) {
        this.latency = latency;
    }

    public String getUptime() {
        return uptime;
    }

    public void setUptime(String uptime) {
        this.uptime = uptime;
    }
}
