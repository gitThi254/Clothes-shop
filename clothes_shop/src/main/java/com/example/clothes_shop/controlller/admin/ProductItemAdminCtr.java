package com.example.clothes_shop.controlller.admin;

import com.example.clothes_shop.model.ProductItem;
import com.example.clothes_shop.req.ProductItemReq;
import com.example.clothes_shop.req.ProductReq;
import com.example.clothes_shop.response.ApiResponse;
import com.example.clothes_shop.service.ProductItemService;
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

import static com.example.clothes_shop.contact.Contact.PHOTO_DIRECTORY;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

@RestController
@RequestMapping("${api-admin.prefix}/product/{productId}/item")
@RequiredArgsConstructor
public class ProductItemAdminCtr {
    private final ProductItemService service;
    @PostMapping
    public ResponseEntity<ApiResponse> create(@Valid @RequestBody ProductItemReq req,
                                              @PathVariable String productId
                                              ) {
        try {
            service.save(req, productId);
            return ResponseEntity.created(URI.create("/api/v1/admin/product/productId/item/itemID")).body(new ApiResponse("Create Product success"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(new ApiResponse("Fail to Create Product"));
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> update(
            @PathVariable String id,
            @PathVariable String productId,
            @Valid @RequestBody ProductItemReq req) {
        try {
            service.update(productId ,id , req);
            return ResponseEntity.ok(new ApiResponse("Update Product success"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(new ApiResponse("Fail to Update Product"));
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(
            @PathVariable String id,
                 @PathVariable String productId
    ) {
        try {
            service.delete(productId , id);
            return ResponseEntity.ok(new ApiResponse("Delete Product success"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(new ApiResponse("Fail to Delete Product"));
        }
    }
    @PutMapping("/photo")
    public ResponseEntity<ApiResponse> uploadPhoto(@RequestParam("id") String id,
                 @PathVariable String productId
            , @RequestParam("file") MultipartFile file) {
        try {
            service.uploadPhoto(productId, id, file);
            return ResponseEntity.ok(new ApiResponse("Upload Photo Success"));
        } catch (Exception e)  {
            return ResponseEntity.status(400).body(new ApiResponse(e.getMessage()));
        }
    }
    @GetMapping(path = "/image/{filename}", produces = { IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE })
    public byte[] getPhoto(@PathVariable("filename") String filename) throws IOException {
        return Files.readAllBytes(Paths.get(PHOTO_DIRECTORY + filename));
    }
}
