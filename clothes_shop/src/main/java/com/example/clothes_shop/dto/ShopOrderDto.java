package com.example.clothes_shop.dto;

import com.example.clothes_shop.model.OrderLine;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShopOrderDto {
    private String id;
    private String statusId;
    private String status;
    private String address;
    private String shippingMethod;
    private String username;
    private String fullName;
    private BigDecimal priceShipping;
    private BigDecimal finalTotal;
    private String userId;
    private List<OrderLine> orderLines;
    private LocalDateTime order_date;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
