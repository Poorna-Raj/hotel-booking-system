package com.hbs.room_service.data.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomRequestDto {
    private String name;
    private String roomType;
    private String bedType;
    private int bedCount;
    private double basePrice;
    private Long createdBy;
}
