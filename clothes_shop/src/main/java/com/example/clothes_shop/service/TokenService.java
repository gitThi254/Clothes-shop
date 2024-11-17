package com.example.clothes_shop.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.stream.Collectors;

@Service
@Transactional
public class TokenService {
    @Autowired
    public JwtEncoder jwtEncoder;
    public String GeneratorToken(Authentication authentication) {
        String username = authentication.getName();
        Instant now = Instant.now();
        String copes = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(" "));
        JwtClaimsSet claims = JwtClaimsSet.builder().issuer("self").issuedAt(now).subject(username).claim("roles", copes).build();
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

}