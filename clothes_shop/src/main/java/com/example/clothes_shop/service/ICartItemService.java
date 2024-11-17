package com.example.clothes_shop.service;

import com.example.clothes_shop.dto.CartItemDto;
import com.example.clothes_shop.dto.PageRequestDto;
import com.example.clothes_shop.req.CartItemReq;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface ICartItemService {
    CartItemDto save(CartItemReq t, String username);
    CartItemDto findById(String id, String username);
    void delete(String id, String username);
    CartItemDto update(CartItemReq t, String id, String username);
    Page<CartItemDto> filter(PageRequestDto dto, String keyword, String username);
}
