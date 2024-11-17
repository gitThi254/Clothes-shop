package com.example.clothes_shop.service;


import com.example.clothes_shop.dto.user.LoginDto;
import com.example.clothes_shop.dto.user.UserDto;
import com.example.clothes_shop.dto.user.UserReq;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface IAuthenticationService extends UserDetailsService {
    UserDto register(UserReq userDto);
    LoginDto login(String username, String password);
}
