package com.example.clothes_shop.service;

import com.example.clothes_shop.dto.PageRequestDto;
import com.example.clothes_shop.dto.ShopOrderDto;
import com.example.clothes_shop.exception.DuplicateKeyException;
import com.example.clothes_shop.exception.NotFoundException;
import com.example.clothes_shop.mapper.ShopOrderMapper;
import com.example.clothes_shop.model.*;
import com.example.clothes_shop.rep.*;
import com.example.clothes_shop.req.ShopOrderReq;
import com.example.clothes_shop.utils.PageAuto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class ShopOrderService implements IShopOrderService {
    private final UserRep userRep;
    private final AddressRep addressRep;
    private final OrderStatusRep orderStatusRep;
    private final ShippingMethodRep shippingMethodRep;
    private final ShopOrderMapper shopOrderMapper;
    private final ShopOrderRep shopOrderRep;
    private final OrderLineRep orderLineRep;
    private final CartItemRep cartItemRep;
    private final ProductItemRep productItemRep;
    private final PageAuto pageAuto;

    private boolean checkQtyInStock(Integer qtyCart, Integer qtyProduct) {
        return qtyCart > qtyProduct;
    }
    @Override
    public ShopOrderDto save(ShopOrderReq t, String username) {
        User user = userRep.findByUsername(username).orElseThrow(() -> new NotFoundException("User not found"));
        Address address = addressRep.findByIdAndUser_Username(t.getAddressId(), username).orElseThrow(() -> new NotFoundException("Address not found"));
        OrderStatus orderStatus = orderStatusRep.findById("a31da2c5-ca01-43cb-bf08-e2e425ba5aef").orElseThrow(() -> new NotFoundException("OrderStatus not found"));
        ShippingMethod shippingMethod = shippingMethodRep.findById(t.getShippingMethodId()).orElseThrow(() -> new NotFoundException("ShippingMethod not found"));
        ShopOrder shopOrder = shopOrderMapper.mapTo(t, address, orderStatus, shippingMethod, user);
        ShopOrder savedShopOrder = shopOrderRep.save(shopOrder);
        List<OrderLine> orderLines  = cartItemRep.findAllByIdIn(t.getCartItemIds()).stream().map(v -> {
            ProductItem productItem = productItemRep.findById(v.getProductItem().getId()).orElseThrow(() -> new NotFoundException("Product not found"));
            if (checkQtyInStock(v.getQty(), productItem.getQtyInStock())) {
                throw new DuplicateKeyException("The quantity of products in stock is not enough");
            } else {
                productItem.setQtyInStock(productItem.getQtyInStock() - v.getQty());
                productItemRep.save(productItem);
            }
            return shopOrderMapper.mapToOrderLine(v, productItem, shopOrder);
        }).collect(Collectors.toList());
        orderLineRep.saveAll(orderLines);
        return shopOrderMapper.mapToDto(savedShopOrder);
    }

    @Override
    public ShopOrderDto findById(String id, String username) {
        return null;
    }

    @Override
    public ShopOrderDto findById(String id) {
        return shopOrderRep.findById(id).map(shopOrderMapper::mapToDto).orElseThrow(() -> new NotFoundException("ShopOrder not found"));
    }

    @Override
    public void delete(String id) {

    }

    @Override
    public ShopOrderDto update(ShopOrderReq t, String id) {
        return shopOrderRep.findById(id)
                .map(shopOrderExisting -> updateExistingShopOrder(shopOrderExisting, t))
                .map(shopOrderRep::save)
                .map(shopOrderMapper::mapToDto)
                .orElseThrow(() -> new NotFoundException("Order not found"));
    }
    private ShopOrder updateExistingShopOrder(ShopOrder shopOrderExisting, ShopOrderReq t) {

        OrderStatus orderStatus = orderStatusRep.findById(t.getOrderStatusId())
                .orElseThrow(() -> new NotFoundException("Order status not found"));
        Set<String> refundableOrderStatuses = Set.of(
                "c26d417a-4074-40aa-9d7d-d255c54ff2af",
                "17397323-c639-41a1-b11e-831a3246df05"
        );
        if (refundableOrderStatuses.contains(orderStatus.getId()) && !refundableOrderStatuses.contains(shopOrderExisting.getOrderStatus().getId())) {
            shopOrderExisting.getOrderLineList().forEach(line -> {
                ProductItem item = line.getProductItem();
                item.setQtyInStock(item.getQtyInStock() + line.getQty());
                productItemRep.save(item);
            });
        }
        if (!refundableOrderStatuses.contains(orderStatus.getId()) && refundableOrderStatuses.contains(shopOrderExisting.getOrderStatus().getId())) {
            shopOrderExisting.getOrderLineList().forEach(line -> {
                ProductItem item = line.getProductItem();
                item.setQtyInStock(item.getQtyInStock() - line.getQty());
                productItemRep.save(item);
            });
        }
        shopOrderExisting.setOrderStatus(orderStatus);
        return shopOrderExisting;
    }

    @Override
    public Page<ShopOrderDto> filter(PageRequestDto dto, String keyword, String username) {
        User user = userRep.findByUsername(username).orElseThrow(() -> new NotFoundException(String.format("%s not found", username)));
        List<ShopOrderDto> listCategoryDto = shopOrderRep.findByUserId(user.getId())
                .stream()
                .map(shopOrderMapper::mapToDto)
                .collect(Collectors.toList());
        return pageAuto.Page(dto, listCategoryDto);
    }

    @Override
    public Page<ShopOrderDto> filter(PageRequestDto dto, String keyword) {
        List<ShopOrderDto> listCategoryDto = shopOrderRep.findAll()
                .stream()
                .map(shopOrderMapper::mapToDto)
                .collect(Collectors.toList());
        return pageAuto.Page(dto, listCategoryDto);
    }
}
