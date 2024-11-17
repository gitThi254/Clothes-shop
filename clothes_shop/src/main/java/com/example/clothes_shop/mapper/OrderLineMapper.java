package com.example.clothes_shop.mapper;


import com.example.clothes_shop.dto.OrderLineDto;
import com.example.clothes_shop.model.OrderLine;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderLineMapper {
    public OrderLineDto mapToDto(OrderLine t) {
        return OrderLineDto.builder()
                .id(t.getId())
                .price(t.getPrice())
                .qty(t.getQty())
                .productItemId(t.getProductItem().getId())
                .build();
    }
}
