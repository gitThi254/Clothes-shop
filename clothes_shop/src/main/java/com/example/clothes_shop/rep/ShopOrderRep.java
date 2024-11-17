package com.example.clothes_shop.rep;

import com.example.clothes_shop.model.ShopOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ShopOrderRep extends JpaRepository<ShopOrder, String> {
    Optional<ShopOrder> findByIdAndUser_Id(String id, String userId);
    List<ShopOrder> findByUserId(String userId);
}
