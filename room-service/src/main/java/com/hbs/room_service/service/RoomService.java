package com.hbs.room_service.service;

import com.hbs.room_service.data.dto.RoomRequestDto;
import com.hbs.room_service.data.dto.RoomResponseDto;
import com.hbs.room_service.data.model.Room;
import com.hbs.room_service.data.model.RoomStatus;
import com.hbs.room_service.data.model.RoomType;
import com.hbs.room_service.data.repository.RoomRepository;
import com.hbs.room_service.exception.BadRequest;
import com.hbs.room_service.exception.ContentNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class RoomService {
    @Autowired
    private RoomRepository repository;

    @Autowired
    private UserClientService userClientService;

    public RoomResponseDto addNewRoom(RoomRequestDto dto){
        Room room = new Room();
        room.setRoomStatus(RoomStatus.valueOf("AVAILABLE"));
        room.setRoomType(RoomType.valueOf(dto.getRoomType()));
        room.setBasePrice(dto.getBasePrice());
        room.setName(dto.getName());
        room.setBedCount(dto.getBedCount());
        room.setCreatedAt(LocalDateTime.now());
        room.setUpdatedAt(LocalDateTime.now());

        if(userClientService.validateUserIsAdmin(dto.getCreatedBy())){
            room.setCreatedBy(dto.getCreatedBy());
        } else {
            throw new BadRequest("Permission Denied!");
        }

        return mapToDtoFromModel(repository.save(room));
    }

    private RoomResponseDto mapToDtoFromModel(Room save) {
        RoomResponseDto dto = new RoomResponseDto();
        dto.setBasePrice(save.getBasePrice());
        dto.setName(save.getName());
        dto.setId(save.getId());
        dto.setRoomStatus(save.getRoomStatus().toString());
        dto.setRoomType(save.getRoomType().toString());
        dto.setCreatedAt(save.getCreatedAt());
        dto.setUpdatedAt(save.getUpdatedAt());
        dto.setBedCount(save.getBedCount());
        dto.setCreatedBy(save.getCreatedBy());
        dto.setBedType(save.getBedType().toString());

        return dto;
    }
}
