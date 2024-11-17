package com.example.clothes_shop.controlller;

import com.example.clothes_shop.dto.PageRequestDto;
import com.example.clothes_shop.dto.ProductDto;
import com.example.clothes_shop.dto.ProductItemDto;
import com.example.clothes_shop.service.ProductItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/product/{productId}/item")
@RequiredArgsConstructor
public class ProductItemCtr {
    private final ProductItemService service;
    @GetMapping
    public ResponseEntity<Page<ProductItemDto>> findAll(
            @RequestParam(value = "keyword",  defaultValue = "") String keyword,
            @PathVariable String productId,
            @RequestParam(value = "pageIndex",  defaultValue = "0") Integer pageIndex,
            @RequestParam(value = "pageSize",  defaultValue = "10") Integer pageSize,
            @RequestParam(value = "sort", defaultValue = "createdAt") String sort,
            @RequestParam(value = "order", defaultValue = "DESC") Sort.Direction order
    ) {
        PageRequestDto dto = new PageRequestDto(pageIndex, pageSize, order, sort);
        return ResponseEntity.ok(service.getAll(dto, keyword, productId));
    }
    @GetMapping("/{id}")
    public ResponseEntity<ProductItemDto> find(
            @PathVariable String id,
            @PathVariable String productId
    ) {
        return ResponseEntity.ok(service.get(productId, id));
    }
}
