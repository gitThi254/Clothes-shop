package com.example.clothes_shop.service;

import com.example.clothes_shop.dto.OrderStatusDto;
import com.example.clothes_shop.dto.ShippingMethodDto;

import java.util.List;

public interface IStatusAndShippingService {
    List<OrderStatusDto> getStatus();
    List<ShippingMethodDto> getShipping();
}
