package com.hbs.room_service.data.model;

import lombok.Getter;

@Getter
public enum RoomType {
    STANDARD(2),
    DELUXE(2),
    FAMILY(4),
    SUITE(6);

    private final int capacity;

    RoomType(int capacity){
        this.capacity = capacity;
    }
}
