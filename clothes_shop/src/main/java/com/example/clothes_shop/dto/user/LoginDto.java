package com.example.clothes_shop.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class LoginDto {
    private String id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String password;
    private String phone;
    private String role;
    private String jwt;
}
