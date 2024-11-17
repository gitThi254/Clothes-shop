package com.example.clothes_shop.rep;

import com.example.clothes_shop.model.Address;
import com.example.clothes_shop.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AddressRep extends JpaRepository<Address, String> {
    Optional<Address> findByIdAndUser_Username(String id, String user);
    List<Address> findAllByUser(User user);
}
