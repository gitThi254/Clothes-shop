package com.example.clothes_shop.model.Enum;

import java.math.BigDecimal;
import java.util.UUID;

public enum ShippingEnum {
    ExpressShipping("9c137a20-4c7b-4152-bcb1-500f20eb1424", "Giao hàng nhanh", BigDecimal.valueOf(10)),
    EconomyShipping("d7636075-f753-4cd9-8a1d-467a6596cf37", "Giao hàng tiết kiệm", BigDecimal.valueOf(5)),
    ExpressDelivery("9408d98f-f51c-406c-8435-b74d364a4ee1", "Giao hàng hỏa tốc", BigDecimal.valueOf(20));
    public final String id;
    public final String name;
    public final BigDecimal price;
    ShippingEnum(String id, String name, BigDecimal price) {
        this.name = name;
        this.id = id;
        this.price = price;
    }
}
