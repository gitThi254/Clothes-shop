package com.example.clothes_shop.service;

import com.example.clothes_shop.dto.OrderStatusDto;
import com.example.clothes_shop.dto.ShippingMethodDto;
import com.example.clothes_shop.mapper.StatusAndMethodMapper;
import com.example.clothes_shop.rep.OrderStatusRep;
import com.example.clothes_shop.rep.ShippingMethodRep;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class StatusAndShippingService implements IStatusAndShippingService{
    private final ShippingMethodRep shippingMethodRep;
    private final OrderStatusRep orderStatusRep;
    private final StatusAndMethodMapper mapper;
    @Override
    public List<OrderStatusDto> getStatus() {
        return orderStatusRep.findAll().stream().map(mapper::mapToStatus).collect(Collectors.toList());

    }

    @Override
    public List<ShippingMethodDto> getShipping() {
        return shippingMethodRep.findAll().stream().map(mapper::mapToShipping).collect(Collectors.toList());

    }
}
