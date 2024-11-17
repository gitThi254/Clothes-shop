package com.example.clothes_shop.rep;

import com.example.clothes_shop.model.ShippingMethod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ShippingMethodRep extends JpaRepository<com.example.clothes_shop.model.ShippingMethod, String>{
}
