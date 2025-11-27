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
import java.util.List;

@Service
public class RoomService {
    @Autowired
    private RoomRepository repository;

    @Autowired
    private UserClientService userClientService;

    /**
     * Create a new room save to the database
     * @param dto contains the room data
     * @return an {@link RoomResponseDto} containing the saved room's details
     */
    public RoomResponseDto addRoom(RoomRequestDto dto){
        Room room = new Room();

        room.setRoomStatus(RoomStatus.valueOf("AVAILABLE"));
        if(validateRoomTypes(dto.getRoomType())) {
            room.setRoomType(RoomType.valueOf(dto.getRoomType()));
        }
        if(validateBedTypes(dto.getBedType())){
            room.setBedType(BedType.valueOf(dto.getBedType()));
        }

        room.setBasePrice(dto.getBasePrice());
        room.setName(dto.getName());
        room.setBedCount(dto.getBedCount());
        room.setCreatedAt(LocalDateTime.now());
        room.setUpdatedAt(LocalDateTime.now());

        validateUserIsAdmin(dto.getCreatedBy());
        room.setCreatedBy(dto.getCreatedBy());

        return mapToDtoFromModel(repository.save(room));
    }

    /**
     * Update an existing user and save to the database
     * @param userId ID of the user whose updating the room
     * @param roomId ID of the room
     * @param dto contains new details of the room
     * @return an {@link RoomResponseDto} containing the saved room's details
     */
    public RoomResponseDto updateRoom(long userId, long roomId, RoomUpdateRequestDto dto){
        validateUserIsAdmin(userId);

        Room room = repository.findById(roomId)
                .orElseThrow(()-> new ContentNotFound("Invalid room for given ID."));

        if(validateRoomTypes(dto.getRoomType())) {
            room.setRoomType(RoomType.valueOf(dto.getRoomType()));
        }
        if(validateRoomStatus(dto.getRoomStatus())) {
            room.setRoomStatus(RoomStatus.valueOf(dto.getRoomStatus()));
        }
        if(validateBedTypes(dto.getBedType())) {
            room.setBedType(BedType.valueOf(dto.getBedType()));
        }
        room.setName(dto.getName());
        room.setUpdatedAt(LocalDateTime.now());
        room.setBasePrice(dto.getBasePrice());
        room.setBedCount(dto.getBedCount());

        return mapToDtoFromModel(repository.save(room));
    }

    /**
     * Delete room by ID
     * @param userId ID of the user whose deleting
     * @param roomId ID of the room that need to be deleted
     * @return {@code boolean} value based on the result
     */
    public Boolean deleteRoom(long userId,long roomId){
        validateUserIsAdmin(userId);

        Room room = repository.findById(roomId)
                .orElseThrow(() -> new ContentNotFound("Invalid room for given ID."));

        repository.delete(room);
        return true;
    }

    /**
     * Get a room by the ID
     * @param roomId ID of the room
     * @return an {@link RoomResponseDto} containing the saved room's details
     */
    public RoomResponseDto getRoomById(long roomId){
        Room room = repository.findById(roomId)
                .orElseThrow(() -> new ContentNotFound("Invalid room for given ID."));
        return mapToDtoFromModel(room);
    }

    /**
     * Get all the saved rooms
     * @return an list of {@link RoomResponseDto} containing the saved room's details
     */
    public List<RoomResponseDto> getAllRoom(){
        return repository.findAll()
                .stream()
                .map(this::mapToDtoFromModel)
                .toList();
    }

    /**
     * Validation method to check if user is an admin
     * @param id User ID
     */
    public void validateUserIsAdmin(long id){
        if(!userClientService.validateUserIsAdmin(id)){
            throw new BadRequest("Permission Denied!");
        }
    }

    /**
     * Validate the room types based on the ENUM
     * @param roomType given room type
     * @return {@code boolean} value based on the result
     */
    public boolean validateRoomTypes(String roomType){
        try{
            RoomType.valueOf(roomType.toUpperCase());
            return true;
        } catch (IllegalArgumentException e) {
            throw new BadRequest("Invalid room type!");
        }
    }

    /**
     * Validate the room status based on the ENUM
     * @param roomStatus given room status
     * @return {@code boolean} value based on the result
     */
    public boolean validateRoomStatus(String roomStatus){
        try{
            RoomStatus.valueOf(roomStatus.toUpperCase());
            return true;
        } catch (IllegalArgumentException e) {
            throw new BadRequest("Invalid room status!");
        }
    }

    /**
     * Validate the bed type based on the ENUM
     * @param bedType given bed type
     * @return {@code boolean} value based on the result
     */
    public boolean validateBedTypes(String bedType){
        try{
            BedType.valueOf(bedType.toUpperCase());
            return true;
        } catch (IllegalArgumentException e) {
            throw new BadRequest("Invalid bed type!");
        }
    }

    /**
     * Fetch the room price by the ID
     * @param roomId ID of the room
     * @return {@code Double} value of the room price
     */
    public Double getRoomPriceById(long roomId){
        Room room = repository.findById(roomId)
                .orElseThrow(() -> new ContentNotFound("Invalid room for given ID."));

        return room.getBasePrice();
    }

    /**
     * Validate if the room is valid for booking
     * @param roomId ID of the room
     * @return {@code boolean} value based on the result
     */
    public Boolean isRoomValidForBooking(long roomId){
        Room room = repository.findById(roomId)
                .orElseThrow(() -> new ContentNotFound("Invalid room for given ID."));
        return room.getRoomStatus()!=RoomStatus.UNAVAILABLE;
    }

    /**
     * Get the room capacity for the ID
     * @param roomId ID of the room
     * @return {@code Integer} value based on the price
     */
    public Integer getRoomCapacityById(long roomId){
        Room room = repository.findById(roomId)
                .orElseThrow(() -> new ContentNotFound("Invalid room for given ID."));
        return room.getRoomType().getCapacity();
    }

    /**
     * Helper method for conversions between the model class and DTO class
     * @param save given model class
     * @return {@link RoomResponseDto} containing room details
     */
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
