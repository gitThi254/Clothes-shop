package com.example.clothes_shop.dto;

import com.example.clothes_shop.model.ProductItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartItemDto {
    private String id;
    private String cartId;
    private String productName;
    private int qty;
    private ProductItem productItem;
    private BigDecimal totalPrice;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
