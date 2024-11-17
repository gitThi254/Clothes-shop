package com.example.clothes_shop.controlller;


import com.example.clothes_shop.dto.user.LoginDto;
import com.example.clothes_shop.dto.user.LoginReq;
import com.example.clothes_shop.dto.user.UserDto;
import com.example.clothes_shop.dto.user.UserReq;
import com.example.clothes_shop.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.prefix}/auth")
@RequiredArgsConstructor
public class AuthCtr {
    private final AuthenticationService service;
    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody UserReq req) {
        return ResponseEntity.ok(service.register(req));
    }
    @PostMapping("/login")
    public ResponseEntity<LoginDto> login(@RequestBody LoginReq req) {
      return ResponseEntity.ok(service.login(req.getUsername(), req.getPassword()));
    }
}
