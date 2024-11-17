package com.example.clothes_shop.rep;

import com.example.clothes_shop.model.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRep extends JpaRepository<ShoppingCart,String> {
    Optional<ShoppingCart> findByUser_Id(String id);
}
