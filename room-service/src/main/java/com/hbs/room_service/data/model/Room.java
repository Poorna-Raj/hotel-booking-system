package com.hbs.room_service.data.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_rooms")
@Data
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    private String name;

    @Enumerated(EnumType.STRING)
    private RoomType roomType;

    @Enumerated(EnumType.STRING)
    private BedType bedType;

    private int bedCount;

    @Enumerated(EnumType.STRING)
    private RoomStatus roomStatus;

    private double basePrice;

    private Long createdBy;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private String imageNo1;

    private String imageNo2;

    private String imageNo3;

    private String imageNo4;
}
