package com.example.clothes_shop.controlller.admin;

import com.example.clothes_shop.req.CategoryReq;
import com.example.clothes_shop.response.ApiResponse;
import com.example.clothes_shop.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("${api-admin.prefix}")
@RequiredArgsConstructor
public class CategoryAdminCtr {
    private final CategoryService service;
    @PostMapping("/category")
    public ResponseEntity<ApiResponse> create(@Valid @RequestBody CategoryReq req) {
        try {
            service.save(req);
            return ResponseEntity.created(URI.create("/api/v1/admin/category/categoryID")).body(new ApiResponse("Create Category success"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(new ApiResponse(e.getMessage()));
        }
    }
    @PutMapping("/category/{id}")
    public ResponseEntity<ApiResponse> update(
            @PathVariable String id,
            @Valid @RequestBody CategoryReq req) {
        try {
            service.updateCategory(id, req);
            return ResponseEntity.ok(new ApiResponse("Update Category success"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(new ApiResponse(e.getMessage()));
        }
    }
    @DeleteMapping("/category/{id}")
    public ResponseEntity<ApiResponse> delete(
            @PathVariable String id
          ) {
        try {
            service.deleteCategoryById(id);
            return ResponseEntity.ok(new ApiResponse("Delete Category success"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(new ApiResponse(e.getMessage()));
        }
    }
}
