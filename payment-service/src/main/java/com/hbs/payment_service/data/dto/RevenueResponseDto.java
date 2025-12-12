package com.hbs.payment_service.data.dto;

public class RevenueResponseDto {
    private Long dailyRevenue;
    private Long weeklyRevenue;
    private Long monthlyRevenue;

    public RevenueResponseDto() {
    }

    public Long getDailyRevenue() {
        return dailyRevenue;
    }

    public void setDailyRevenue(Long dailyRevenue) {
        this.dailyRevenue = dailyRevenue;
    }

    public Long getWeeklyRevenue() {
        return weeklyRevenue;
    }

    public void setWeeklyRevenue(Long weeklyRevenue) {
        this.weeklyRevenue = weeklyRevenue;
    }

    public Long getMonthlyRevenue() {
        return monthlyRevenue;
    }

    public void setMonthlyRevenue(Long monthlyRevenue) {
        this.monthlyRevenue = monthlyRevenue;
    }
}
