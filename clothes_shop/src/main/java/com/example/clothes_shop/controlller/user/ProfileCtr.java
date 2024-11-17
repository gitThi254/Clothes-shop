package com.example.clothes_shop.controlller.user;

import com.example.clothes_shop.dto.user.UserDto;
import com.example.clothes_shop.dto.user.UserReq;
import com.example.clothes_shop.response.ApiResponse;
import com.example.clothes_shop.service.DecodeService;
import com.example.clothes_shop.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/profile")
@RequiredArgsConstructor
public class ProfileCtr {
    private final UserService service;
    private final DecodeService decodeService;

    @PutMapping
    public ResponseEntity<ApiResponse> updateUser(@Valid @RequestBody UserReq req,
                                                  @RequestHeader("Authorization") String authorizationHeader
                                              ) {
        String username = decodeService.DecodeToken(authorizationHeader);
        try {
            service.updateProfile(req, username);
            return ResponseEntity.ok(new ApiResponse("profile updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage()));
        }
    }
}
