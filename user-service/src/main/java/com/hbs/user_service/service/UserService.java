package com.hbs.user_service.service;

import com.hbs.user_service.data.dto.UserRequestDto;
import com.hbs.user_service.data.dto.UserResponseDto;
import com.hbs.user_service.data.model.Admin;
import com.hbs.user_service.data.model.User;
import com.hbs.user_service.data.repository.UserRepository;
import com.hbs.user_service.exception.BadRequest;
import com.hbs.user_service.exception.ContentNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserResponseDto login(UserRequestDto dto){
        User user = userRepository.findByUsername(dto.getUsername())
                .orElseThrow(() -> new ContentNotFound("Invalid User!"));

        if(!user.getPassword().equals(dto.getPassword())){
            throw new BadRequest("Invalid password!");
        }

        return mapToDtoFromUser(user);
    }

    public Boolean isUserExist(long userId){
        userRepository.findById(userId)
                .orElseThrow(() -> new ContentNotFound("Invalid User!"));
        return true;
    }

    public Boolean validateUserIsAdmin(long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ContentNotFound("User not found for ID: " + id));

        return user instanceof Admin;
    }

    public UserResponseDto mapToDtoFromUser(User user){
        UserResponseDto dto = new UserResponseDto();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setUsername(user.getUsername());
        dto.setRole(user instanceof Admin ? "ADMIN" : "RECEPTIONIST");

        return dto;
    }
}
