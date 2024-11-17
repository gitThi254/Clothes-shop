package com.example.clothes_shop.mapper;


import com.example.clothes_shop.dto.CartItemDto;
import com.example.clothes_shop.model.ProductItem;
import com.example.clothes_shop.model.ShoppingCart;
import com.example.clothes_shop.model.ShoppingCartItem;
import com.example.clothes_shop.req.CartItemReq;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class ShoppingCartItemMapper {
    public ShoppingCartItem mapTo(CartItemReq t, ShoppingCart cart, ProductItem productItem) {
        return ShoppingCartItem.builder().shoppingCart(cart).qty(t.getQty()).productItem(productItem).build();
    }

    public CartItemDto mapToDto(ShoppingCartItem shoppingCartItem) {
        return CartItemDto.builder()
                .id(shoppingCartItem.getId())
                .cartId(shoppingCartItem.getShoppingCart().getId())
                .productName(shoppingCartItem.getProductItem().getProduct().getName())
                .qty(shoppingCartItem.getQty())
                .productItem(shoppingCartItem.getProductItem())
                .totalPrice(BigDecimal.valueOf((long)shoppingCartItem.getQty()).multiply(shoppingCartItem.getProductItem().getPrice()))
                .createdAt(shoppingCartItem.getCreatedAtUTC())
                .updatedAt(shoppingCartItem.getUpdatedAtUTC())
                .build();
    }
}
