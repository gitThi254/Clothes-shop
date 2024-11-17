package com.example.clothes_shop.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="shopping_cart_item")
@SuperBuilder
@Entity
public class ShoppingCartItem extends BaseEntity {
    private int qty;
    @ManyToOne
    @JoinColumn(name="shopping_cart_id")
    private ShoppingCart shoppingCart;
    @ManyToOne
    @JoinColumn(name="product_item_id")
    private ProductItem productItem;
}
