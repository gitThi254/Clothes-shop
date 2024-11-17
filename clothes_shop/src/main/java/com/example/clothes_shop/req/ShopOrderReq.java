package com.example.clothes_shop.req;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShopOrderReq {
    private String shippingMethodId;
    private String addressId;
    private List<String> cartItemIds;
    private BigDecimal totalPrice;
    private String orderStatusId;
}
