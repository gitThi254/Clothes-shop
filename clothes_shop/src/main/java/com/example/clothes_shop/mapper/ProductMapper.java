package com.example.clothes_shop.mapper;

import com.example.clothes_shop.dto.ProductDto;
import com.example.clothes_shop.exception.NotFoundException;
import com.example.clothes_shop.model.Category;
import com.example.clothes_shop.model.Product;
import com.example.clothes_shop.rep.CategoryRep;
import com.example.clothes_shop.req.ProductReq;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductMapper {
    private final CategoryRep categoryRep;

    public Product mapTo(ProductReq req) {
        Category category = categoryRep.findById(req.getCategoryId()).orElseThrow(() -> new NotFoundException("Category not found"));
        return Product.builder()
                .name(req.getName())
                .description(req.getDescription())
                .category(category)

                .build();
    }
    public ProductDto mapToDto(Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .photoUrl(product.getPhotoUrl())
                .categoryId(product.getCategory().getId())
                .categoryName(product.getCategory().getCategoryName())
                .totalItems(product.TotalProductIem())
                .totalQty(product.getQtyInStock())
                .min(product.getMinMaxItem().getMin())
                .max(product.getMinMaxItem().getMax())
                .productItems(product.getProductItems())
                .createdAt(product.getCreatedAtUTC())
                .updatedAt(product.getUpdatedAtUTC())
                .build();
    }
}
