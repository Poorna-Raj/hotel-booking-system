package com.hbs.user_service.data.dto;

import lombok.Data;

@Data
public class AdminRegisterDto {
    private String username;
    private String password;
    private String email;
    private String department;
}
