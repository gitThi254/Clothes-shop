package com.example.clothes_shop.service;

import com.example.clothes_shop.dto.CategoryDto;
import com.example.clothes_shop.dto.PageRequestDto;
import com.example.clothes_shop.dto.SelectDto;
import com.example.clothes_shop.exception.DuplicateKeyException;
import com.example.clothes_shop.exception.ForeignKeyException;
import com.example.clothes_shop.exception.NotFoundException;
import com.example.clothes_shop.mapper.CategoryMapper;
import com.example.clothes_shop.model.Category;
import com.example.clothes_shop.rep.CategoryRep;
import com.example.clothes_shop.req.CategoryReq;
import com.example.clothes_shop.utils.PageAuto;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService {
    private final CategoryMapper categoryMapper;
    private final CategoryRep categoryRep;
    private final PageAuto pageAuto;

    @Override
    public void save(CategoryReq req) {
        boolean checkCategoryName = categoryRep.existsByCategoryName(req.getCategoryName());
        if (checkCategoryName) {
            throw new DuplicateKeyException("Category Name exist");
        } else {
            Category category = categoryMapper.mapTo(req);
            categoryRep.save(category);
        }
    }

    @Override
    public Page<CategoryDto> getAllCategories(PageRequestDto dto, String keyword) {
        List<CategoryDto> listCategoryDto =  categoryRep.filter(keyword).stream().map(categoryMapper::mapToDto).collect(Collectors.toList());
        return pageAuto.Page(dto, listCategoryDto);
    }

    @Override
    public CategoryDto getCategoryById(String id) {
        return categoryRep.findById(id).map(categoryMapper::mapToDto).orElseThrow(() -> new EntityNotFoundException("Category not found"));
    }

    @Override
    public void deleteCategoryById(String id) {
        categoryRep.findById(id).ifPresentOrElse(category -> {
            try {
                categoryRep.delete(category);
            } catch (DataIntegrityViolationException e) {
                throw new ForeignKeyException(String.format("Cannot delete category with id %s due to foreign key constraint", id));
            }
        }, () -> {
            throw new NotFoundException(String.format("Category with id %s not found", id));
        });
    }

    @Override
    public void updateCategory(String id, CategoryReq req) {
        categoryRep.findById(id)
                .map(oldCategory -> {
                    oldCategory.setCategoryName(req.getCategoryName());
                    return categoryRep.save(oldCategory);
                })
                .orElseThrow(() -> new NotFoundException(String.format("Category with id %s not found", id)));
    }

    @Override
    public List<SelectDto> getAllSelectCategories() {
        return categoryRep.findAll().stream().map(categoryMapper::mapToSelect).collect(Collectors.toList());
    }
}
