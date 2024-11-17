package com.example.clothes_shop.service;

import com.example.clothes_shop.dto.AddressDto;
import com.example.clothes_shop.dto.PageRequestDto;
import com.example.clothes_shop.exception.NotFoundException;
import com.example.clothes_shop.mapper.AddressMapper;
import com.example.clothes_shop.model.Address;
import com.example.clothes_shop.model.User;
import com.example.clothes_shop.rep.AddressRep;
import com.example.clothes_shop.rep.UserRep;
import com.example.clothes_shop.req.AddressReq;
import com.example.clothes_shop.utils.PageAuto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AddressService implements IAddressService {
    private final UserRep userRep;
    private final AddressRep addressRep;
    private final AddressMapper addressMapper;
    private final PageAuto pageAuto;

    @Override
    public AddressDto save(AddressReq t, String username) {
        User user = userRep.findByUsername(username).orElseThrow(() -> new NotFoundException(String.format("%s not found", username)));
        Address address = addressMapper.mapTo(t, user);
        return addressMapper.mapToDto(addressRep.save(address));
    }

    @Override
    public AddressDto findById(String id, String username) {
        return addressRep.findByIdAndUser_Username(id, username).map(addressMapper::mapToDto).orElseThrow(() -> new NotFoundException(String.format("Address with id %s not found", id)));
    }

    @Override
    public void delete(String id, String username) {
        addressRep.findByIdAndUser_Username(id, username).ifPresentOrElse(addressRep::delete, () -> {
            throw new NotFoundException(String.format("Address with id %s not found", id));
        } );
    }

    @Override
    public AddressDto update(AddressReq t, String id, String username) {
        Address address = addressRep.findByIdAndUser_Username(id, username)
                .map(addressExisting -> updateExistingAddress(addressExisting, t))
                .map(addressRep::save)
                .orElseThrow(() -> new NotFoundException(String.format("Address with id %s not found", id)));
        return addressMapper.mapToDto(addressRep.save(address));
    }
    private Address updateExistingAddress(Address addressExisting, AddressReq t) {
        addressExisting.setDiaChi(t.getDiaChi());
        addressExisting.setXa(t.getXa());
        addressExisting.setQuan(t.getQuan());
        addressExisting.setTinh(t.getTinh());
        return addressExisting;
    }

    @Override
    public Page<AddressDto> filter(PageRequestDto dto, String keyword, String username) {
        User user = userRep.findByUsername(username).orElseThrow(() -> new NotFoundException(String.format("%s not found", username)));
        List<AddressDto> listCategoryDto =  addressRep.findAllByUser(user)
                .stream()
                .map(addressMapper::mapToDto)
                .collect(Collectors.toList());
        return pageAuto.Page(dto, listCategoryDto);
    }
}
