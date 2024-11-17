package com.example.clothes_shop.controlller;

import com.example.clothes_shop.dto.CategoryDto;
import com.example.clothes_shop.dto.PageRequestDto;
import com.example.clothes_shop.dto.ProductDto;
import com.example.clothes_shop.dto.SelectDto;
import com.example.clothes_shop.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("${api.prefix}/product")
@RequiredArgsConstructor
public class ProductCtr {
    private final ProductService service;
    @GetMapping
    public ResponseEntity<Page<ProductDto>> findAll(
            @RequestParam(value = "keyword",  defaultValue = "") String keyword,
            @RequestParam(value = "categoryId",  defaultValue = "") String categoryId,
            @RequestParam(value = "pageIndex",  defaultValue = "0") Integer pageIndex,
            @RequestParam(value = "pageSize",  defaultValue = "10") Integer pageSize,
            @RequestParam(value = "sort", defaultValue = "createdAt") String sort,
            @RequestParam(value = "order", defaultValue = "DESC") Sort.Direction order,
            @RequestParam(value = "min", required = false, defaultValue = "0") BigDecimal min,
            @RequestParam(value = "max", required = false, defaultValue = "0") BigDecimal max
    ) {
        PageRequestDto dto = new PageRequestDto(pageIndex, pageSize, order, sort);
        return ResponseEntity.ok(service.getAll(dto, keyword,categoryId, min, max));
    }
    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> find(
            @PathVariable String id
    ) {
        return ResponseEntity.ok(service.get(id));
    }

}
