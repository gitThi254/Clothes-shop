package com.example.clothes_shop.service;

import com.example.clothes_shop.dto.PageRequestDto;
import com.example.clothes_shop.dto.ProductDto;
import com.example.clothes_shop.dto.ProductItemDto;
import com.example.clothes_shop.req.ProductItemReq;
import com.example.clothes_shop.req.ProductReq;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

public interface IProductItemService {
    void save(ProductItemReq req, String id);
    Page<ProductItemDto> getAll(PageRequestDto dto, String keyword, String id);
    ProductItemDto get(String productId, String id);
    void delete(String productId, String id);
    void update(String productId, String id, ProductItemReq req);
    void uploadPhoto(String productId, String id, MultipartFile file);
}
