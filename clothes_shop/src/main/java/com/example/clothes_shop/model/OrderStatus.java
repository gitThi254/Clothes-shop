package com.example.clothes_shop.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="order_status")
@SuperBuilder
@Entity
public class OrderStatus extends BaseEntity  {
    private String status;
    @OneToMany(mappedBy = "orderStatus")
    private List<ShopOrder> shopOrderList;

    public OrderStatus(String id, String name) {
        setStatus(name);
        setId(id);
    }
}
