package com.example.clothes_shop.controlller.admin;

import com.example.clothes_shop.dto.PageRequestDto;
import com.example.clothes_shop.dto.ShopOrderDto;
import com.example.clothes_shop.req.ShopOrderReq;
import com.example.clothes_shop.service.DecodeService;
import com.example.clothes_shop.service.ShopOrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("${api-admin.prefix}/shop-order")
@RequiredArgsConstructor
public class ShopOrderAdminCtr {
    private final ShopOrderService service;

    @GetMapping
    public ResponseEntity<Page<ShopOrderDto>> getAll(
            @RequestParam(value = "keyword", required = false, defaultValue = "") String keyword,
            @RequestParam(value = "pageIndex", required = false, defaultValue = "0") Integer pageIndex,
            @RequestParam(value = "pageSize", required = false, defaultValue = "10") Integer pageSize,
            @RequestParam(value = "sort", required = false, defaultValue = "createdAt") String sort,
            @RequestParam(value = "order", required = false, defaultValue = "DESC") Sort.Direction order
    ) {
        PageRequestDto dto = new PageRequestDto(pageIndex, pageSize, order, sort);
        return ResponseEntity.ok(service.filter(dto, keyword.toLowerCase()));
    }
    @GetMapping("/{id}")
    public ResponseEntity<ShopOrderDto> findById(@PathVariable String id) {
        return ResponseEntity.ok(service.findById(id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<ShopOrderDto> updateShopOrder(@PathVariable String id, @Valid @RequestBody ShopOrderReq req) {
        return ResponseEntity.ok(service.update(req, id));
    }


}
