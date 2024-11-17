package com.example.clothes_shop.service;

import com.example.clothes_shop.dto.PageRequestDto;
import com.example.clothes_shop.dto.ProductDto;
import com.example.clothes_shop.dto.ProductItemDto;
import com.example.clothes_shop.exception.ForeignKeyException;
import com.example.clothes_shop.exception.NotFoundException;
import com.example.clothes_shop.mapper.ProductItemMapper;
import com.example.clothes_shop.model.ProductItem;
import com.example.clothes_shop.rep.ProductItemRep;
import com.example.clothes_shop.req.ProductItemReq;
import com.example.clothes_shop.utils.PageAuto;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.stream.Collectors;

import static com.example.clothes_shop.contact.Contact.PHOTO_DIRECTORY;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
@RequiredArgsConstructor
public class ProductItemService implements IProductItemService {
    private final ProductItemMapper productItemMapper;
    private final ProductItemRep productItemRep;
    private final PageAuto pageAuto;

    @Override
    public void save(ProductItemReq req, String id) {
        req.setProductId(id);
        ProductItem productItem = productItemMapper.mapTo(req);
        productItemRep.save(productItem);
    }

    @Override
    public Page<ProductItemDto> getAll(PageRequestDto dto, String keyword, String id) {
        List<ProductItemDto> listDto =  productItemRep.findAllByProductId(id).stream().map(productItemMapper::mapToDto).collect(Collectors.toList());
        return pageAuto.Page(dto, listDto);
    }

    @Override
    public ProductItemDto get(String productId, String id) {
        return productItemRep.findByIdAndProduct_Id(id, productId).map(productItemMapper::mapToDto).orElseThrow(() -> new NotFoundException("Product Item not found"));
    }

    @Override
    public void delete(String productId, String id) {
        productItemRep.findByIdAndProduct_Id(id, productId).ifPresentOrElse(category -> {
            try {
                productItemRep.delete(category);
            } catch (DataIntegrityViolationException e) {
                throw new ForeignKeyException(String.format("Cannot delete product with id %s due to foreign key constraint", id));
            }
        }, () -> {
            throw new NotFoundException(String.format("Product with id %s not found", id));
        });
    }

    @Override
    public void update(String productId, String id, ProductItemReq req) {
        productItemRep.findByIdAndProduct_Id(id, productId)
                .map(oldItem -> {
                    oldItem.setColor(req.getColor());
                    oldItem.setSize(req.getSize());
                    oldItem.setSKU(req.getSKU());
                    oldItem.setPrice(req.getPrice());
                    oldItem.setQtyInStock(req.getQtyInStock());
                    return productItemRep.save(oldItem);
                })
                .orElseThrow(() -> new NotFoundException(String.format("Category with id %s not found", id)));
    }

    @Override
    public void uploadPhoto(String productId, String id, MultipartFile file) {
        ProductItem item = productItemRep.findByIdAndProduct_Id(id, productId).orElseThrow(() -> new NotFoundException("Product item not found"));
        String photoUrl = photoFunction.apply(id, file);
        item.setPhotoUrl(photoUrl);
        productItemRep.save(item);
    }
    private final Function<String, String> fileExtension = filename -> Optional.of(filename).filter(name -> name.contains(".")).map(name -> "." + name.substring(filename.indexOf(".")+1)).orElse(".png");

    private final BiFunction<String, MultipartFile, String> photoFunction = (id, image) -> {

        String randomString = RandomStringUtils.randomAlphanumeric(10);
        String filename = id + "_" + randomString + fileExtension.apply(image.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(PHOTO_DIRECTORY).toAbsolutePath().normalize();
            if(!Files.exists(fileStorageLocation)) { Files.createDirectories(fileStorageLocation); }
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(filename), REPLACE_EXISTING);
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/api/v1/admin/product/item/image/" + filename).toUriString();
        }catch (Exception exception) {
            throw new RuntimeException("Unable to save image");
        }
    };
}
