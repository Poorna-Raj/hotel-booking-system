package com.hbs.room_service.data.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
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
}
