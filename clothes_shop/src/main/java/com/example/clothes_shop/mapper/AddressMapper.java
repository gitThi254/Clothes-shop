package com.example.clothes_shop.mapper;


import com.example.clothes_shop.dto.AddressDto;
import com.example.clothes_shop.model.Address;
import com.example.clothes_shop.model.User;
import com.example.clothes_shop.req.AddressReq;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressMapper {
    public Address mapTo(AddressReq req, User user) {
        return Address.builder().DiaChi(req.getDiaChi())
                .Xa(req.getXa())
                .Quan(req.getQuan())
                .Tinh(req.getTinh())
                .user(user)
                .build();
    }
    public AddressDto mapToDto(Address address) {
        return AddressDto.builder().id(address.getId())
                .DiaChi(address.getDiaChi())
                .createdAt(address.getCreatedAtUTC())
                .updatedAt(address.getUpdatedAtUTC())
                .Xa(address.getXa()).Quan(address.getQuan()).Tinh(address.getTinh()).build();
    }
}
