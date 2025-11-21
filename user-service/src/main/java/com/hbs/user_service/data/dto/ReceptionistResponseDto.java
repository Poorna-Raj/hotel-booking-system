package com.hbs.user_service.data.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReceptionistResponseDto {
    private Long id;
    private String username;
    private String email;
    private String role;
    private String address;
}
