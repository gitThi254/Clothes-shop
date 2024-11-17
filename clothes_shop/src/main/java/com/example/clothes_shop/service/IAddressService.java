package com.example.clothes_shop.service;

import com.example.clothes_shop.dto.AddressDto;
import com.example.clothes_shop.dto.PageRequestDto;
import com.example.clothes_shop.req.AddressReq;
import org.springframework.data.domain.Page;


public interface IAddressService {
    AddressDto save(AddressReq t, String username);
    AddressDto findById(String id, String username);
    void delete(String id, String username);
    AddressDto update(AddressReq t, String id, String username);
    Page<AddressDto> filter(PageRequestDto dto, String keyword, String username );
}
