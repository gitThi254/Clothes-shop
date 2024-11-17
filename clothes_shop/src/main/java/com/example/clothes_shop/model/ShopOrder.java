package com.example.clothes_shop.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="shop_order")
@SuperBuilder
@Entity
public class ShopOrder extends BaseEntity {
    @Column(updatable = false, name="order_date")
    @CreationTimestamp
    private LocalDateTime orderDateUtc;
    @ManyToOne
    @JoinColumn(name="address_id")
    private Address address;
    @ManyToOne
    @JoinColumn(name="shipping_method_id")
    private ShippingMethod shippingMethod;
    @ManyToOne
    @JoinColumn(name="order_status_id")
    private OrderStatus orderStatus;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    @Column(name="order_total")
    private BigDecimal  orderTotal;
    @OneToMany(mappedBy = "shopOrder", cascade = CascadeType.ALL)
    private List<OrderLine> orderLineList;


    public BigDecimal totalPriceOrderLine() {
        BigDecimal total = BigDecimal.ZERO;
        if (this.orderLineList == null) {
            return total;
        } else {
            for (OrderLine orderLine : this.orderLineList) {
                total = total.add(orderLine.totalPrice());
            }
            return total;
        }

    }

    private void setProductList() {
        this.orderLineList.forEach(orderLine -> {
            ProductItem productItem = orderLine.getProductItem();
            orderLine.getProductItem().setQtyInStock(productItem.getQtyInStock() - orderLine.getQty());
        });
    }

    public void setOrderLineList(List<OrderLine> orderLineList) {
        setProductList();
        this.orderLineList = orderLineList;
    }
}
