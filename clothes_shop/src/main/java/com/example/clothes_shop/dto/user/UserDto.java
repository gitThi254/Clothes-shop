package com.example.clothes_shop.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
    private String id;
    private String fullName;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String phone;
    private String password;
    private String role;
    private String cartId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
