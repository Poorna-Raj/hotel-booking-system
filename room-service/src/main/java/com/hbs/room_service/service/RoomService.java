package com.hbs.room_service.service;

import com.hbs.room_service.data.dto.RoomRequestDto;
import com.hbs.room_service.data.dto.RoomResponseDto;
import com.hbs.room_service.data.dto.RoomUpdateRequestDto;
import com.hbs.room_service.data.model.BedType;
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

    public RoomResponseDto addRoom(RoomRequestDto dto){
        Room room = new Room();
        room.setRoomStatus(RoomStatus.valueOf("AVAILABLE"));
        room.setRoomType(RoomType.valueOf(dto.getRoomType()));
        room.setBasePrice(dto.getBasePrice());
        room.setName(dto.getName());
        room.setBedCount(dto.getBedCount());
        room.setCreatedAt(LocalDateTime.now());
        room.setUpdatedAt(LocalDateTime.now());

        validateUserIsAdmin(dto.getCreatedBy());
        room.setCreatedBy(dto.getCreatedBy());

        return mapToDtoFromModel(repository.save(room));
    }

    public RoomResponseDto updateRoom(long userId, long roomId, RoomUpdateRequestDto dto){
        validateUserIsAdmin(userId);

        Room room = repository.findById(roomId)
                .orElseThrow(()-> new ContentNotFound("Invalid room for given ID."));

        room.setRoomType(RoomType.valueOf(dto.getRoomType()));
        room.setRoomStatus(RoomStatus.valueOf(dto.getRoomStatus()));
        room.setBedType(BedType.valueOf(dto.getBedType()));
        room.setName(dto.getName());
        room.setUpdatedAt(LocalDateTime.now());
        room.setBasePrice(dto.getBasePrice());
        room.setBedCount(dto.getBedCount());

        return mapToDtoFromModel(repository.save(room));
    }

    public Boolean deleteRoom(long userId,long roomId){
        validateUserIsAdmin(userId);

        Room room = repository.findById(roomId)
                .orElseThrow(() -> new ContentNotFound("Invalid room for given ID."));

        repository.delete(room);
        return true;
    }

    public void validateUserIsAdmin(long id){
        if(!userClientService.validateUserIsAdmin(id)){
            throw new BadRequest("Permission Denied!");
        }
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
