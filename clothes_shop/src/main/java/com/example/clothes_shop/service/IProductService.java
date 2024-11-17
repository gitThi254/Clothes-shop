package com.example.clothes_shop.service;

import com.example.clothes_shop.dto.CategoryDto;
import com.example.clothes_shop.dto.PageRequestDto;
import com.example.clothes_shop.dto.ProductDto;
import com.example.clothes_shop.req.CategoryReq;
import com.example.clothes_shop.req.ProductReq;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

public interface IProductService {
    String save(ProductReq req);
    Page<ProductDto> getAll(PageRequestDto dto, String keyword, String categoryId, BigDecimal min, BigDecimal max);
    ProductDto get(String id);
    void delete(String id);
    void update(String id, ProductReq ProductReq);
    void uploadPhoto(String id, MultipartFile file);
}
