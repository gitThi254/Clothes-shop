package com.example.clothes_shop.dto;

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
public class AddressDto {
    private String id;
    private String DiaChi;
    private String Xa;
    private String Quan;
    private String Tinh;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
