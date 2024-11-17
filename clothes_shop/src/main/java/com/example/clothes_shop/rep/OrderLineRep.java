package com.example.clothes_shop.rep;

import com.example.clothes_shop.model.OrderLine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OrderLineRep extends JpaRepository<OrderLine, String> {

    Optional<OrderLine> findByIdAndShopOrder_Id(String id, String shopOrderId);
    List<OrderLine> findByShopOrder_Id(String shopOrderId);
}
