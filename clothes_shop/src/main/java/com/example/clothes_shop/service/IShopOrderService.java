package com.example.clothes_shop.service;

import com.example.clothes_shop.dto.PageRequestDto;
import com.example.clothes_shop.dto.ShopOrderDto;
import com.example.clothes_shop.req.ShopOrderReq;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface IShopOrderService {
    ShopOrderDto save(ShopOrderReq t, String username);
    ShopOrderDto findById(String id, String username);
    ShopOrderDto findById(String id);
    void delete(String id);
    ShopOrderDto update(ShopOrderReq t, String id);
    Page<ShopOrderDto> filter(PageRequestDto dto, String keyword, String username);
    Page<ShopOrderDto> filter(PageRequestDto dto, String keyword);

}
