package com.hbs.room_service.data.dto;

import java.time.LocalDateTime;

public class RoomResponseDto {
    private long id;
    private String name;
    private String roomType;
    private String bedType;
    private int bedCount;
    private String roomStatus;
    private double basePrice;
    private Long createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String imageNo1;
    private String imageNo2;
    private String imageNo3;
    private String imageNo4;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public String getBedType() {
        return bedType;
    }

    public void setBedType(String bedType) {
        this.bedType = bedType;
    }

    public int getBedCount() {
        return bedCount;
    }

    public void setBedCount(int bedCount) {
        this.bedCount = bedCount;
    }

    public String getRoomStatus() {
        return roomStatus;
    }

    public void setRoomStatus(String roomStatus) {
        this.roomStatus = roomStatus;
    }

    public double getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(double basePrice) {
        this.basePrice = basePrice;
    }

    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getImageNo1() {
        return imageNo1;
    }

    public void setImageNo1(String imageNo1) {
        this.imageNo1 = imageNo1;
    }

    public String getImageNo2() {
        return imageNo2;
    }

    public void setImageNo2(String imageNo2) {
        this.imageNo2 = imageNo2;
    }

    public String getImageNo3() {
        return imageNo3;
    }

    public void setImageNo3(String imageNo3) {
        this.imageNo3 = imageNo3;
    }

    public String getImageNo4() {
        return imageNo4;
    }

    public void setImageNo4(String imageNo4) {
        this.imageNo4 = imageNo4;
    }
}
