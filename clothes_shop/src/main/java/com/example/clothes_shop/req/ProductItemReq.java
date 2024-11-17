package com.example.clothes_shop.req;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductItemReq {
    private String SKU;
    private int qtyInStock;
    private BigDecimal price;
    private String size;
    private String color;
    private String productId;
}
