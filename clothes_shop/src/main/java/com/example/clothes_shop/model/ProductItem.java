package com.example.clothes_shop.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="product_item")
@SuperBuilder
@Entity
public class ProductItem extends BaseEntity{
    private String SKU;
    @Column(name="qty_in_stock")
    private int qtyInStock;
    private BigDecimal price;
    private String photoUrl;
    private String size;
    private String color;
    @ManyToOne
    @JoinColumn(name="product_id")
    private Product product;
    @JsonIgnore
    @OneToMany(mappedBy = "productItem")
    private List<ShoppingCartItem> cartItems;
}
