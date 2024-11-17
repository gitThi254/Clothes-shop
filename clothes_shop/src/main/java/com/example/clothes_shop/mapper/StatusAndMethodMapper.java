package com.example.clothes_shop.mapper;

import com.example.clothes_shop.dto.OrderStatusDto;
import com.example.clothes_shop.dto.ShippingMethodDto;
import com.example.clothes_shop.model.OrderStatus;
import com.example.clothes_shop.model.ShippingMethod;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StatusAndMethodMapper {
    public OrderStatusDto mapToStatus(OrderStatus status) {
        return OrderStatusDto.builder().id(status.getId()).status(status.getStatus()).build();
    }
    public ShippingMethodDto mapToShipping(ShippingMethod shippingMethod) {
        return ShippingMethodDto.builder()
                .id(shippingMethod.getId())
                .name(shippingMethod.getName())
                .price(shippingMethod.getPrice()).build();
    }
}
