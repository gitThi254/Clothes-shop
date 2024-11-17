package com.example.clothes_shop.mapper;


import com.example.clothes_shop.dto.ShopOrderDto;
import com.example.clothes_shop.model.*;
import com.example.clothes_shop.req.ShopOrderReq;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ShopOrderMapper {
    public ShopOrder mapTo(ShopOrderReq t, Address address, OrderStatus status, ShippingMethod shippingMethod, User user) {
        return ShopOrder.builder()
                .address(address)
                .user(user)
                .orderStatus(status)
                .orderTotal(t.getTotalPrice())
                .shippingMethod(shippingMethod)
                .build();
    }
    public ShopOrderDto mapToDto(ShopOrder shopOrder) {
        return ShopOrderDto.builder()
                .id(shopOrder.getId())
                .userId(shopOrder.getUser().getId())
                .username(shopOrder.getUser().getUsername())
                .fullName(shopOrder.getUser().fullName())
                .statusId(shopOrder.getOrderStatus().getId())
                .address(shopOrder.getAddress().AddressOrder())
                .order_date(shopOrder.getOrderDateUtc())
                .status(shopOrder.getOrderStatus().getStatus())
                .shippingMethod(shopOrder.getShippingMethod().getName())
                .priceShipping(shopOrder.getShippingMethod().getPrice())
                .finalTotal(shopOrder.getOrderTotal())
                .orderLines(shopOrder.getOrderLineList())
                .createdAt(shopOrder.getCreatedAtUTC())
                .updatedAt(shopOrder.getUpdatedAtUTC())
                .build();
    }

    public OrderLine mapToOrderLine(ShoppingCartItem t, ProductItem productItem, ShopOrder order) {
        return OrderLine.builder()
                .price(productItem.getPrice())
                .qty(t.getQty())
                .shopOrder(order)
                .productItem(productItem)
                .build();
    }
    }
