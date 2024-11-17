package com.example.clothes_shop.rep;

import com.example.clothes_shop.model.Product;
import com.example.clothes_shop.model.ProductItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductItemRep extends JpaRepository<ProductItem, String> {
    @Query("SELECT p FROM ProductItem p WHERE (CONCAT(p.id, '',LOWER(p.SKU), '') LIKE %?1%)")
    public List<ProductItem> filter(String keyword);
    public List<ProductItem> findAllByProductId(String productId);
    Optional<ProductItem> findByIdAndProduct_Id(String id, String productId);
}
