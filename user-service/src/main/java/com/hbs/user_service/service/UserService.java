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

    /**
     * Login method for authentication
     * @param dto contains details required for login
     * @return an {@link UserResponseDto} containing user data
     */
    public UserResponseDto login(UserRequestDto dto){
        User user = userRepository.findByUsername(dto.getUsername())
                .orElseThrow(() -> new ContentNotFound("Invalid User!"));

        if(!user.getPassword().equals(dto.getPassword())){
            throw new BadRequest("Invalid password!");
        }

        return mapToDtoFromUser(user);
    }

    /**
     * Helper method to check if user exist based on the ID
     * @param userId User's ID
     * @return {@code boolean} value based on the result
     */
    public Boolean isUserExist(long userId){
        userRepository.findById(userId)
                .orElseThrow(() -> new ContentNotFound("Invalid User!"));
        return true;
    }

    /**
     * Helper method to check if user's an ADMIN based on the ID
     * @param id User's ID
     * @return {@code boolean} value based on the result
     */
    public Boolean validateUserIsAdmin(long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ContentNotFound("User not found for ID: " + id));

        return user instanceof Admin;
    }

    /**
     * Helper method for the conversions between the response DTO and Model class
     * @param user
     * @return an {@link UserResponseDto} containing user data
     */
    public UserResponseDto mapToDtoFromUser(User user){
        UserResponseDto dto = new UserResponseDto();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setUsername(user.getUsername());
        dto.setRole(user instanceof Admin ? "ADMIN" : "RECEPTIONIST");

        return dto;
    }
}
