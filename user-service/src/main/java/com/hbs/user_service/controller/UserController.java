package com.hbs.user_service.controller;

import com.hbs.user_service.data.dto.UserRequestDto;
import com.hbs.user_service.data.dto.UserResponseDto;
import com.hbs.user_service.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService service;

    @PostMapping("/login")
    public ResponseEntity<UserResponseDto> login(@Valid @RequestBody UserRequestDto dto){
        return new ResponseEntity<>(service.login(dto), HttpStatus.OK);
    }

    @GetMapping("/{id}/is-valid")
    public Boolean isUserValid(@Valid @PathVariable @Min(1) long id){
        return service.isUserExist(id);
    }

    @GetMapping("/{id}/is-admin")
    public ResponseEntity<Boolean> validateUserIsAdmin(@Valid @PathVariable @Min(1) long id) {
        return new ResponseEntity<>(service.validateUserIsAdmin(id), HttpStatus.OK);
    }
}
