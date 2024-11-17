package com.example.clothes_shop.dto;

import com.example.clothes_shop.model.ProductItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDto {
    private String id;
    private String categoryId;
    private String categoryName;
    private String name;
    private String description;
    private String photoUrl;
    private int totalItems;
    private int totalQty;
    private BigDecimal min;
    private BigDecimal max;
    private List<ProductItem> productItems;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


}
