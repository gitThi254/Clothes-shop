package com.example.clothes_shop.model.Enum;

import java.util.UUID;

public enum StatusEnum {
    Pending("f47ac10b-58cc-4372-a567-0e02b2c3d479", "Đang chờ"),
    Processing("c728fe2f-8b42-4a31-9458-2a6c17596e37", "Đang xử lý"),
    Completed("9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d", "Đã hoàn thành"),
    Cancelled("f47ac10b-58cc-4372-a567-0e02b2c3d479", "Đã hủy"),
    Shipping("f47ac10b-58cc-4372-a567-0e02b2c3d479", "Đã hủy"),
    Shipped("f47ac10b-58cc-4372-a567-0e02b2c3d479", "Đã giao hàng"),
    Returned("5809ef94-c9af-4653-8a62-046fb2864a10", "Trả hàng");

    public final String id;
    public final String name;
    StatusEnum(String id, String name) {
        this.name = name;
        this.id = id;
    }
}
