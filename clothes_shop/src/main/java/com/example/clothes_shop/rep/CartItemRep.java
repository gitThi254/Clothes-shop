package com.example.clothes_shop.rep;

import com.example.clothes_shop.model.ShoppingCart;
import com.example.clothes_shop.model.ShoppingCartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRep extends JpaRepository<ShoppingCartItem, String> {
    Optional<ShoppingCartItem> findByIdAndShoppingCart(String id, ShoppingCart shoppingCart);
    List<ShoppingCartItem> findAllByIdIn(List<String> ids);
    List<ShoppingCartItem> findByShoppingCart(ShoppingCart shoppingCart);
}
