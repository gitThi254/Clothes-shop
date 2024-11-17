package com.example.clothes_shop.controlller.admin;

import com.example.clothes_shop.dto.ProductDto;
import com.example.clothes_shop.req.CategoryReq;
import com.example.clothes_shop.req.ProductReq;
import com.example.clothes_shop.response.ApiResponse;
import com.example.clothes_shop.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;

import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;
import static com.example.clothes_shop.contact.Contact.PHOTO_DIRECTORY;

@RestController
@RequestMapping("${api-admin.prefix}/product")
@RequiredArgsConstructor
public class ProductAdminCtr {
    private final ProductService service;
    @PostMapping
    public ResponseEntity<ApiResponse> create(@Valid @RequestBody ProductReq req) {
        try {
           String id =  service.save(req);
            return ResponseEntity.created(URI.create("/api/v1/admin/product/categoryID")).body(new ApiResponse(id));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(new ApiResponse(e.getMessage()));

        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> update(
            @PathVariable String id,
            @Valid @RequestBody ProductReq req) {
        try {
            service.update(id, req);
            return ResponseEntity.ok(new ApiResponse("Update Product success"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(new ApiResponse(e.getMessage()));

        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(
            @PathVariable String id
    ) {
        try {
            service.delete(id);
            return ResponseEntity.ok(new ApiResponse("Delete Product success"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(new ApiResponse(e.getMessage()));
        }
    }
    @PutMapping("/photo")
    public ResponseEntity<ApiResponse> uploadPhoto(@RequestParam("id") String id, @RequestParam("file") MultipartFile file) {
        try {
            service.uploadPhoto(id, file);
            return ResponseEntity.ok(new ApiResponse("Upload image success"));
        } catch (Exception e)  {
            return ResponseEntity.status(400).body(new ApiResponse(e.getMessage()));

        }
    }



    @GetMapping(path = "/image/{filename}", produces = { IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE })
    public byte[] getPhoto(@PathVariable("filename") String filename) throws IOException {
        return Files.readAllBytes(Paths.get(PHOTO_DIRECTORY + filename));
    }
    @GetMapping(path = "/item/image/{filename}", produces = { IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE })
    public byte[] getPhotoItem(@PathVariable("filename") String filename) throws IOException {
        return Files.readAllBytes(Paths.get(PHOTO_DIRECTORY + filename));
    }
}
