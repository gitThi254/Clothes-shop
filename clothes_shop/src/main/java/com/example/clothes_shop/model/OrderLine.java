package com.example.clothes_shop.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="order_line")
@SuperBuilder
@Entity
public class OrderLine extends BaseEntity {

    private BigDecimal price;
    private int qty;
    @ManyToOne
    @JoinColumn(name="product_item_id")
    private ProductItem productItem;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="shop_order_id")
    private ShopOrder shopOrder;


    public BigDecimal totalPrice() {
        return this.price.multiply(new BigDecimal(qty));
    }
}
