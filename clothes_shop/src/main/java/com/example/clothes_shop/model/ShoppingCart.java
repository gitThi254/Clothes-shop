package com.example.clothes_shop.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="shopping_carts")
@SuperBuilder
@Entity
public class ShoppingCart extends BaseEntity {
    @OneToOne(mappedBy = "cart")
    private User user;
    @OneToMany(mappedBy = "shoppingCart")
    private List<ShoppingCartItem> cartItems;
}
