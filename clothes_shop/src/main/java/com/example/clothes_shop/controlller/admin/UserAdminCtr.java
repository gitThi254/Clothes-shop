package com.example.clothes_shop.controlller.admin;

import com.example.clothes_shop.dto.PageRequestDto;
import com.example.clothes_shop.dto.user.UserDto;
import com.example.clothes_shop.dto.user.UserReq;
import com.example.clothes_shop.response.ApiResponse;
import com.example.clothes_shop.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("${api-admin.prefix}/user")
@RequiredArgsConstructor
public class UserAdminCtr {
    private final UserService service;
    @PostMapping
    public ResponseEntity<ApiResponse> create(@Valid @RequestBody UserReq req) {
        try {
            service.Save(req);
            return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse("Create User success"));

        } catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.valueOf(400)).body(new ApiResponse(e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<Page<UserDto>> getAll(
            @RequestParam(value = "keyword", required = false, defaultValue = "") String keyword,
            @RequestParam(value = "role", required = false, defaultValue = "") String roleId,
            @RequestParam(value = "pageIndex", required = false, defaultValue = "0") Integer pageIndex,
            @RequestParam(value = "pageSize", required = false, defaultValue = "10") Integer pageSize,
            @RequestParam(value = "sort", required = false, defaultValue = "createdAt") String sort,
            @RequestParam(value = "order", required = false, defaultValue = "DESC") Sort.Direction order
    ) {
        PageRequestDto dto = new PageRequestDto(pageIndex, pageSize, order, sort);
        return ResponseEntity.ok(service.filter(dto, keyword.toLowerCase(), roleId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable String id) {
        return ResponseEntity.ok(service.findById(id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateUser(@PathVariable String id, @Valid @RequestBody UserReq req) {
    try {
        service.update(req, id);
        return ResponseEntity.ok(new ApiResponse("Update User success"));
    } catch (Exception e) {
        return  ResponseEntity.status(HttpStatus.valueOf(400)).body(new ApiResponse(e.getMessage()));
    }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable String id) {
        try {
            service.delete(id);
            return ResponseEntity.ok(new ApiResponse("Update User success"));
        } catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.valueOf(400)).body(new ApiResponse(e.getMessage()));
        }

    }
}
