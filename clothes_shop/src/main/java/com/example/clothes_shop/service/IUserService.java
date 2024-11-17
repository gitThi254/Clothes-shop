package com.example.clothes_shop.service;

import com.example.clothes_shop.dto.PageRequestDto;
import com.example.clothes_shop.dto.user.UserDto;
import com.example.clothes_shop.dto.user.UserReq;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface IUserService {
    void Save(UserReq req);
    UserDto findById(String id);
    void delete(String id);
    void update(UserReq t, String id);
    void updateProfile(UserReq t, String username);
    Page<UserDto> filter(PageRequestDto dto, String keyword, String role);
}
