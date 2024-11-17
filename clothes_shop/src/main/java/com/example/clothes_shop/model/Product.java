package com.example.clothes_shop.model;

import com.example.clothes_shop.dto.MinMax;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="product")
@SuperBuilder
@Entity
public class Product extends BaseEntity {
    private String name;
    private String description;
    private String photoUrl;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="category")
    private Category category;
    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private List<ProductItem> productItems;

    public int TotalProductIem() {
        return (this.getProductItems() != null) ? this.getProductItems().size() : 0 ;
    }
    public int getQtyInStock() {
        return this.getProductItems() == null ? 0 :
                this.getProductItems().stream()
                        .mapToInt(ProductItem::getQtyInStock)
                        .sum();
    }
    public MinMax getMinMaxItem() {
        if(this.getProductItems() == null || this.getProductItems().isEmpty()) {
            return MinMax.builder().min(BigDecimal.ZERO).max(BigDecimal.ZERO).build();
        } else if(
                this.getProductItems().stream().count() == 1
        ) {
            BigDecimal price = this.getProductItems().stream().findFirst().get().getPrice();
            return MinMax.builder().min(price).max(price).build();
        } else {
            BigDecimal minPrice = this.getProductItems().stream().map(ProductItem::getPrice).min(Comparator.naturalOrder()).orElse(BigDecimal.ZERO);
            BigDecimal maxPrice = this.getProductItems().stream().map(ProductItem::getPrice).max(Comparator.naturalOrder()).orElse(BigDecimal.ZERO);
            return MinMax.builder().min(minPrice).max(maxPrice).build();
        }
    }
}
