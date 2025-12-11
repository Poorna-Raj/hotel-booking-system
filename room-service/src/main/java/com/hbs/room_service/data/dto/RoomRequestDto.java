package com.hbs.room_service.data.dto;

import jakarta.validation.constraints.*;

public class RoomRequestDto {
    @NotBlank(message = "Room name cannot be empty")
    @Size(max = 50, message = "Room name must be at most 50 characters")
    private String name;

    @NotBlank(message = "Room type cannot be empty")
    private String roomType;

    @NotBlank(message = "Bed type cannot be empty")
    private String bedType;

    @Min(value = 1, message = "Bed count must be at least 1")
    private int bedCount;

    @Positive(message = "Base price must be positive")
    private double basePrice;

    @NotNull(message = "CreatedBy cannot be null")
    private Long createdBy;

    @NotBlank(message = "Image 1 is required")
    private String imageNo1;
    private String imageNo2;
    private String imageNo3;
    private String imageNo4;

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
