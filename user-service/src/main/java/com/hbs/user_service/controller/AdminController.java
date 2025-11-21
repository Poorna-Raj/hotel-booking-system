package com.hbs.user_service.controller;

import com.hbs.user_service.data.dto.AdminRegisterDto;
import com.hbs.user_service.data.dto.AdminResponseDto;
import com.hbs.user_service.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admins")
public class AdminController {
    @Autowired
    private AdminService service;

    @PostMapping
    public ResponseEntity<AdminResponseDto> addAdmin(@RequestBody AdminRegisterDto dto){
        return new ResponseEntity<>(service.addAdmin(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminResponseDto> getAdminById(@PathVariable long id){
        return new ResponseEntity<>(service.getAdminById(id),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<AdminResponseDto>> getAllAdmin(){
        return new ResponseEntity<>(service.getAllAdmin(),HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdminResponseDto> updateAdminById(@PathVariable long id, @RequestBody AdminRegisterDto dto){
        return new ResponseEntity<>(service.updateAdmin(id,dto),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteAdminById(@PathVariable long id){
        if(service.deleteById(id)){
            return new ResponseEntity<>(HttpStatus.OK);
        } else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
