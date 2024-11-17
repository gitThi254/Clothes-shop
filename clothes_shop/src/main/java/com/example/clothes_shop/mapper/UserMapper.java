package com.example.clothes_shop.mapper;

import com.example.clothes_shop.dto.user.UserDto;
import com.example.clothes_shop.dto.user.UserReq;
import com.example.clothes_shop.model.Role;
import com.example.clothes_shop.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserMapper {
    private final PasswordEncoder passwordEncoder;
    public User mapTo(UserReq req, Set<Role> roles) {
        return User.builder().username(req.getUsername()).email(req.getEmail()).phone(req.getPhone()).lastName(req.getLastName()).firstName(req.getFirstName()).authorities(roles).password(passwordEncoder.encode(req.getPassword())).build();
    }
    public UserDto mapToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .fullName(user.fullName())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUsername())
                .email(user.getEmail())
                .phone(user.getPhone())
                .cartId(user.getCart().getId())
                .password(user.getPassword())
                .role(user.getAuthorities().stream().findFirst().get().getAuthority())
                .createdAt(user.getCreatedAtUTC())
                .updatedAt(user.getUpdatedAtUTC())
                .build();
    }
}
