package com.example.clothes_shop.controlller;

import com.example.clothes_shop.dto.CategoryDto;
import com.example.clothes_shop.dto.PageRequestDto;
import com.example.clothes_shop.dto.SelectDto;
import com.example.clothes_shop.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/category")
@RequiredArgsConstructor
public class CategoryCtr {
    private final CategoryService service;
    @GetMapping
    public ResponseEntity<Page<CategoryDto>> findAll(
            @RequestParam(value = "keyword",  defaultValue = "") String keyword,
            @RequestParam(value = "pageIndex",  defaultValue = "0") Integer pageIndex,
            @RequestParam(value = "pageSize",  defaultValue = "10") Integer pageSize,
            @RequestParam(value = "sort", defaultValue = "createdAt") String sort,
            @RequestParam(value = "order", defaultValue = "DESC") Sort.Direction order
    ) {
        PageRequestDto dto = new PageRequestDto(pageIndex, pageSize, order, sort);
        return ResponseEntity.ok(service.getAllCategories(dto, keyword));
    }
    @GetMapping("/{id}")
    public ResponseEntity<CategoryDto> find(
            @PathVariable String id
    ) {
        return ResponseEntity.ok(service.getCategoryById(id));
    }
    @GetMapping("/select")
    public ResponseEntity<List<SelectDto>> selectAll(
    ) {
        return ResponseEntity.ok(service.getAllSelectCategories());
    }
}
