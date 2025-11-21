package com.hbs.user_service.controller;

import com.hbs.user_service.data.dto.UserRequestDto;
import com.hbs.user_service.data.dto.UserResponseDto;
import com.hbs.user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService service;

    @PostMapping("/login")
    public ResponseEntity<UserResponseDto> login(@RequestBody UserRequestDto dto){
        return new ResponseEntity<>(service.login(dto), HttpStatus.OK);
    }
}
