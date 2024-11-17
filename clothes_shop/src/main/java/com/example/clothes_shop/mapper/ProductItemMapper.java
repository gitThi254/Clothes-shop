package com.example.clothes_shop.mapper;

import com.example.clothes_shop.dto.ProductItemDto;
import com.example.clothes_shop.exception.NotFoundException;
import com.example.clothes_shop.model.Product;
import com.example.clothes_shop.model.ProductItem;
import com.example.clothes_shop.rep.ProductRep;
import com.example.clothes_shop.req.ProductItemReq;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductItemMapper {
    private final ProductRep productRep;

    public ProductItem mapTo(ProductItemReq req) {
        System.out.println(req.getProductId());
        Product product = productRep.findById(req.getProductId()).orElseThrow(() -> new NotFoundException("Product not found"));
        return ProductItem.builder()
                .SKU(req.getSKU())
                .color(req.getColor())
                .size(req.getSize())
                .qtyInStock(req.getQtyInStock())
                .price(req.getPrice())
                .product(product)
                .build();
    }
    public ProductItemDto mapToDto(ProductItem item) {
        return ProductItemDto.builder()
                .id(item.getId())
                .photoUrl(item.getPhotoUrl())
                .SKU(item.getSKU())
                .color(item.getColor())
                .size(item.getSize())
                .qtyInStock(item.getQtyInStock())
                .price(item.getPrice())
                .productId(item.getProduct().getId())
                .createdAt(item.getCreatedAtUTC())
                .updatedAt(item.getUpdatedAtUTC())
                .build();
    }
}
