package com.example.clothes_shop.req;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartItemReq {
    @NotNull(message = "product id is required")
    private String productItemId;
    @NotNull(message = "qty is required")
    private int qty;
}
