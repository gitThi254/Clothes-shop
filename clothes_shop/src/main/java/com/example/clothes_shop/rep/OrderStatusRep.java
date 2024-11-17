package com.example.clothes_shop.rep;

import com.example.clothes_shop.model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface OrderStatusRep extends JpaRepository<com.example.clothes_shop.model.OrderStatus, String>{
}
