package com.optimum.dashboard.model;

public class Metric {
    private String label;
    private String value;
    private String change;
    private String trend;

    public Metric(String label, String value, String change, String trend) {
        this.label = label;
        this.value = value;
        this.change = change;
        this.trend = trend;
    }

    // Getters and Setters
    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getChange() {
        return change;
    }

    public void setChange(String change) {
        this.change = change;
    }

    public String getTrend() {
        return trend;
    }

    public void setTrend(String trend) {
        this.trend = trend;
    }
}
