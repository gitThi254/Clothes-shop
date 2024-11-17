package com.example.clothes_shop.service;

import com.example.clothes_shop.dto.CategoryDto;
import com.example.clothes_shop.dto.PageRequestDto;
import com.example.clothes_shop.dto.SelectDto;
import com.example.clothes_shop.model.Category;
import com.example.clothes_shop.req.CategoryReq;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ICategoryService {
    void save(CategoryReq req);
    Page<CategoryDto> getAllCategories(PageRequestDto dto, String keyword);
    CategoryDto getCategoryById(String id);
    void deleteCategoryById(String id);
    void updateCategory(String id, CategoryReq categoryReq);
    List<SelectDto>  getAllSelectCategories();
}
