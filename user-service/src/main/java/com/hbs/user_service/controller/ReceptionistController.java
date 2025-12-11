package com.hbs.user_service.controller;

import com.hbs.user_service.data.dto.ReceptionistRegisterDto;
import com.hbs.user_service.data.dto.ReceptionistResponseDto;
import com.hbs.user_service.service.ReceptionistService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/receptionists")
public class ReceptionistController {
    @Autowired
    private ReceptionistService service;

    @PostMapping
    public ResponseEntity<ReceptionistResponseDto> addReceptionist(@Valid @RequestBody ReceptionistRegisterDto dto){
        return new ResponseEntity<>(service.addReceptionist(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReceptionistResponseDto> getReceptionistById(@Valid @PathVariable @Min(1) long id){
        return new ResponseEntity<>(service.getReceptionistById(id),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ReceptionistResponseDto>> getAllReceptionist(){
        return new ResponseEntity<>(service.getAllReceptionists(),HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReceptionistResponseDto> updateReceptionistById(@Valid @PathVariable @Min(1) long id, @Valid @RequestBody ReceptionistRegisterDto dto){
        return new ResponseEntity<>(service.updateReceptionist(id,dto),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteReceptionistById(@Valid @PathVariable @Min(1) long id){
        if(service.deleteReceptionistById(id)){
            return new ResponseEntity<>(HttpStatus.OK);
        } else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
