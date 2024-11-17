package com.example.clothes_shop.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class DecodeService {
    public final JwtDecoder jwtDecoder;
    public String DecodeToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer")) {
            String token = authorizationHeader.substring(7);
            Jwt jwt = this.jwtDecoder.decode(token);
            return jwt.getClaim("sub");
        } else {
            throw new IllegalArgumentException("Authorization header is missing");
        }
    }
}
