package com.example.clothes_shop.service;

import com.example.clothes_shop.dto.PageRequestDto;
import com.example.clothes_shop.dto.ProductDto;
import com.example.clothes_shop.exception.DuplicateKeyException;
import com.example.clothes_shop.exception.ForeignKeyException;
import com.example.clothes_shop.exception.NotFoundException;
import com.example.clothes_shop.mapper.ProductMapper;
import com.example.clothes_shop.model.Category;
import com.example.clothes_shop.model.Product;
import com.example.clothes_shop.rep.CategoryRep;
import com.example.clothes_shop.rep.ProductRep;
import com.example.clothes_shop.req.ProductReq;
import com.example.clothes_shop.utils.PageAuto;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import static com.example.clothes_shop.contact.Contact.PHOTO_DIRECTORY;

import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.stream.Collectors;

import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {
    private final ProductRep productRep;
    private final ProductMapper productMapper;
    private final PageAuto pageAuto;
    private final CategoryRep categoryRep;

    @Override
    public String save(ProductReq req) {
        boolean checkCategoryName = productRep.existsByName(req.getName());
        if (checkCategoryName) {
            throw new DuplicateKeyException("Product Name exist");
        } else {
            Product product = productMapper.mapTo(req);
            return productRep.save(product).getId();
        }
    }

    @Override
    public Page<ProductDto> getAll(PageRequestDto dto, String keyword, String categoryId, BigDecimal min, BigDecimal max) {
        List<ProductDto> listDto =  productRep.filter(keyword, categoryId).stream()
                .filter(p -> {
                    if(Objects.equals(min, BigDecimal.ZERO) && Objects.equals(max, BigDecimal.ZERO)) {
                        return true;
                    } else {
                        BigDecimal getMin = p.getMinMaxItem().getMin();
                        BigDecimal getMax = p.getMinMaxItem().getMax();
                        boolean checkMin = p.getMinMaxItem().getMin().compareTo(min) >= 0;
                        boolean checkMinMax = p.getMinMaxItem().getMin().compareTo(max) <= 0;
                        return (getMin.compareTo(getMax) <= 0) && checkMin && checkMinMax;
                    }
                })
                .map(productMapper::mapToDto).collect(Collectors.toList());
        return pageAuto.Page(dto, listDto);
    }

    @Override
    public ProductDto get(String id) {
        return productRep.findById(id).map(productMapper::mapToDto).orElseThrow(() -> new NotFoundException("Product not found"));

    }

    @Override
    public void delete(String id) {
        productRep.findById(id).ifPresentOrElse(category -> {
            try {
                productRep.delete(category);
            } catch (DataIntegrityViolationException e) {
                throw new ForeignKeyException(String.format("Cannot delete product with id %s due to foreign key constraint", id));
            }
        }, () -> {
            throw new NotFoundException(String.format("Product with id %s not found", id));
        });
    }

    @Override
    public void update(String id, ProductReq req) {
        productRep.findById(id)
                .map(oldCategory -> {
                    Category category = categoryRep.findById(req.getCategoryId()).orElseThrow(() -> new NotFoundException("Category not found"));
                    oldCategory.setName(req.getName());
                    oldCategory.setDescription(req.getDescription());
                    oldCategory.setCategory(category);
                    return productRep.save(oldCategory);
                })
                .orElseThrow(() -> new NotFoundException(String.format("Category with id %s not found", id)));
    }
    @Override
    public void uploadPhoto(String id, MultipartFile file) {
        Product product = productRep.findById(id).orElseThrow(() -> new NotFoundException("Product not found"));
        String photoUrl = photoFunction.apply(id, file);
        product.setPhotoUrl(photoUrl);
        productRep.save(product);
    }

    private final Function<String, String> fileExtension = filename -> Optional.of(filename).filter(name -> name.contains(".")).map(name -> "." + name.substring(filename.indexOf(".")+1)).orElse(".png");


    private final BiFunction<String, MultipartFile, String> photoFunction = (id, image) -> {
        String randomString = RandomStringUtils.randomAlphanumeric(10);
        String filename = id + "_" + randomString+ fileExtension.apply(image.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(PHOTO_DIRECTORY).toAbsolutePath().normalize();
            if(!Files.exists(fileStorageLocation)) { Files.createDirectories(fileStorageLocation); }
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(filename), REPLACE_EXISTING);
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/api/v1/admin/product/image/" + filename).toUriString();
        }catch (Exception exception) {
            throw new RuntimeException("Unable to save image");
        }
    };
}
