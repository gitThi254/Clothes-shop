package com.example.clothes_shop.controlller;


import com.example.clothes_shop.dto.OrderStatusDto;
import com.example.clothes_shop.dto.ShippingMethodDto;
import com.example.clothes_shop.service.StatusAndShippingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}")
@RequiredArgsConstructor
public class StatusAndShippingCtr {
    private final StatusAndShippingService service;
    @GetMapping("/shipping-method")
    public ResponseEntity<List<ShippingMethodDto>> getShippingMethod() {
        return ResponseEntity.ok(service.getShipping());
    }
    @GetMapping("/order-status")
    public ResponseEntity<List<OrderStatusDto>> getOrderStatus() {
        return ResponseEntity.ok(service.getStatus());
    }
}
