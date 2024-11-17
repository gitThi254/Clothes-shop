package com.example.clothes_shop.controlller.user;

import com.example.clothes_shop.dto.OrderLineDto;
import com.example.clothes_shop.dto.PageRequestDto;
import com.example.clothes_shop.dto.ShopOrderDto;
import com.example.clothes_shop.req.ShopOrderReq;
import com.example.clothes_shop.service.DecodeService;
import com.example.clothes_shop.service.ShopOrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.stream.events.EntityReference;
import java.util.UUID;

@RestController
@RequestMapping("${api.prefix}/shop-order")
@RequiredArgsConstructor
public class ShopOrderCtr {
    private final ShopOrderService service;
    private final DecodeService decodeService;

    @PostMapping
    public ResponseEntity<ShopOrderDto> create(
            @Valid @RequestBody ShopOrderReq t,
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        String username = decodeService.DecodeToken(authorizationHeader);
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(t, username));
    }
    @GetMapping
    public ResponseEntity<Page<ShopOrderDto>> getAll(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestParam(value = "keyword", required = false, defaultValue = "") String keyword,
            @RequestParam(value = "pageIndex", required = false, defaultValue = "0") Integer pageIndex,
            @RequestParam(value = "pageSize", required = false, defaultValue = "10") Integer pageSize,
            @RequestParam(value = "sort", required = false, defaultValue = "createdAt") String sort,
            @RequestParam(value = "order", required = false, defaultValue = "DESC") Sort.Direction order
    ) {
        String username = decodeService.DecodeToken(authorizationHeader);
        PageRequestDto dto = new PageRequestDto(pageIndex, pageSize, order, sort);
        return ResponseEntity.ok(service.filter(dto, keyword.toLowerCase(), username));
    }
}
