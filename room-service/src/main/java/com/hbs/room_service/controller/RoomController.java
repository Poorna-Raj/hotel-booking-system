package com.hbs.room_service.controller;

import com.hbs.room_service.data.dto.RoomRequestDto;
import com.hbs.room_service.data.dto.RoomResponseDto;
import com.hbs.room_service.data.dto.RoomUpdateRequestDto;
import com.hbs.room_service.service.RoomService;
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
    public ResponseEntity<RoomResponseDto> addRoom(@RequestBody RoomRequestDto dto){
        return new ResponseEntity<>(service.addRoom(dto), HttpStatus.CREATED);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<RoomResponseDto> updateRoom(
            @RequestBody RoomUpdateRequestDto dto,
            @PathVariable long id,
            @RequestParam long userId
            ){
        return new ResponseEntity<>(service.updateRoom(userId,id,dto),HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<HttpStatus> deleteRoomById(
            @PathVariable long id,
            @RequestParam long userId
    ){
        if(service.deleteRoom(userId,id)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else{
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<RoomResponseDto> getRoomById(@PathVariable long id){
        return new ResponseEntity<>(service.getRoomById(id),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<RoomResponseDto>> getAllRooms(){
        return new ResponseEntity<>(service.getAllRoom(),HttpStatus.OK);
    }
}
