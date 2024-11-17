package com.example.clothes_shop.mapper;

import com.example.clothes_shop.dto.CategoryDto;
import com.example.clothes_shop.dto.SelectDto;
import com.example.clothes_shop.model.Category;
import com.example.clothes_shop.req.CategoryReq;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryMapper {
    public Category mapTo(CategoryReq req) {
        return Category.builder()
                .categoryName(req.getCategoryName())
                .build();
    }
    public CategoryDto mapToDto(Category category) {
        return CategoryDto.builder()
                .id(category.getId())
                .categoryName(category.getCategoryName())
                .createdAt(category.getCreatedAtUTC())
                .updatedAt(category.getUpdatedAtUTC())
                .build();
    }
    public SelectDto mapToSelect(Category category) {
        return SelectDto.builder()
                .id(category.getId())
                .name(category.getCategoryName())
                .build();
    }
}
