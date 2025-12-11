package com.hbs.room_service.controller;

import com.hbs.room_service.data.dto.RoomRequestDto;
import com.hbs.room_service.data.dto.RoomResponseDto;
import com.hbs.room_service.data.dto.RoomUpdateRequestDto;
import com.hbs.room_service.service.RoomService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/rooms")
public class RoomController {
    @Autowired
    private RoomService service;

    @PostMapping
    public ResponseEntity<RoomResponseDto> addRoom(@Valid @RequestBody RoomRequestDto dto){
        return new ResponseEntity<>(service.addRoom(dto), HttpStatus.CREATED);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<RoomResponseDto> updateRoom(
            @Valid @RequestBody RoomUpdateRequestDto dto,
            @Valid @PathVariable @Min(1) long id,
            @Valid @RequestParam @Min(1) long userId
            ){
        return new ResponseEntity<>(service.updateRoom(userId,id,dto),HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<HttpStatus> deleteRoomById(
            @Valid @PathVariable @Min(1) long id,
            @Valid @RequestParam @Min(1) long userId
    ){
        if(service.deleteRoom(userId,id)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else{
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<RoomResponseDto> getRoomById(@Valid @PathVariable @Min(1) long id){
        return new ResponseEntity<>(service.getRoomById(id),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<RoomResponseDto>> getAllRooms(){
        return new ResponseEntity<>(service.getAllRoom(),HttpStatus.OK);
    }

    @GetMapping("/{id}/price")
    public Double getRoomPriceById(@Valid @PathVariable @Min(1) long id){
        return service.getRoomPriceById(id);
    }

    @GetMapping("/{id}/is-available")
    public Boolean isRoomAvailableForBooking(@Valid @PathVariable @Min(1) long id){
        return service.isRoomValidForBooking(id);
    }

    @GetMapping("/{id}/capacity")
    public Integer getRoomCapacityById(@Valid @PathVariable @Min(1) long id){
        return service.getRoomCapacityById(id);
    }

    @GetMapping("/count")
    public Long getRoomCount(){
        return service.getTotalRoomCount();
    }
}
