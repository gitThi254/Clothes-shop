package com.example.clothes_shop.service;

import com.example.clothes_shop.dto.CartItemDto;
import com.example.clothes_shop.dto.PageRequestDto;
import com.example.clothes_shop.exception.DuplicateKeyException;
import com.example.clothes_shop.exception.NotFoundException;
import com.example.clothes_shop.mapper.ShoppingCartItemMapper;
import com.example.clothes_shop.model.ProductItem;
import com.example.clothes_shop.model.ShoppingCart;
import com.example.clothes_shop.model.ShoppingCartItem;
import com.example.clothes_shop.model.User;
import com.example.clothes_shop.rep.CartItemRep;
import com.example.clothes_shop.rep.CartRep;
import com.example.clothes_shop.rep.ProductItemRep;
import com.example.clothes_shop.rep.UserRep;
import com.example.clothes_shop.req.CartItemReq;
import com.example.clothes_shop.utils.PageAuto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class CartItemService implements ICartItemService {
    private final UserRep userRep;
    private final CartRep shoppingCartRep;
    private final ProductItemRep productItemRep;
    private final ShoppingCartItemMapper shoppingCartItemMapper;
    private final CartItemRep shoppingCartItemRep;
    private final PageAuto pageAuto;

    private boolean checkQtyInStock(Integer qtyCart, Integer qtyProduct) {
        return qtyCart > qtyProduct;
    }

    @Override
    public CartItemDto save(CartItemReq t, String username) {
        User user = userRep.findByUsername(username).orElseThrow(() -> new NotFoundException(String.format("%s not found", username)));
        ShoppingCart spCart = user.getCart();
        ProductItem item = productItemRep.findById(t.getProductItemId()).orElseThrow(() -> new NotFoundException(String.format("%s not found", t.getProductItemId())));
        assert spCart != null;
        ShoppingCartItem cartItem = spCart.getCartItems().stream().filter(x -> Objects.equals(x.getProductItem().getId(), item.getId())).findFirst().orElse(null);
        if (cartItem != null) {
            int sum = t.getQty() + cartItem.getQty();
            if (checkQtyInStock(sum, item.getQtyInStock())) {
                throw new DuplicateKeyException("The quantity of products in stock is not enough");
            } else {
                cartItem.setQty(sum);
                return shoppingCartItemMapper.mapToDto(shoppingCartItemRep.save(cartItem));
            }
        } else {
            if (checkQtyInStock(item.getQtyInStock(), item.getQtyInStock())) {
                throw new DuplicateKeyException("The quantity of products in stock is not enough");
            }
            ShoppingCartItem shoppingCartItem = shoppingCartItemMapper.mapTo(t, spCart, item);
            return shoppingCartItemMapper.mapToDto(shoppingCartItemRep.save(shoppingCartItem));
        }
    }

    @Override
    public CartItemDto findById(String id, String username) {
        User user = userRep.findByUsername(username).orElseThrow(() -> new NotFoundException(String.format("%s not found", username)));
        ShoppingCart cart = shoppingCartRep.findByUser_Id(user.getId()).orElseThrow(() -> new NotFoundException(String.format("%s not found", "Cart")));
        ShoppingCartItem item = shoppingCartItemRep.findByIdAndShoppingCart(id, cart).orElseThrow(() -> new NotFoundException(String.format("%s not found", id)));
        return shoppingCartItemMapper.mapToDto(item);
    }

    @Override
    public void delete(String id,  String username) {
        User user = userRep.findByUsername(username).orElseThrow(() -> new NotFoundException(String.format("%s not found", username)));
        ShoppingCart cart = shoppingCartRep.findByUser_Id(user.getId()).orElseThrow(() -> new NotFoundException(String.format("%s not found", "Cart")));
        ShoppingCartItem item = shoppingCartItemRep.findByIdAndShoppingCart(id, cart).orElseThrow(() -> new NotFoundException(String.format("%s not found", id)));
        shoppingCartItemRep.delete(item);

    }

    @Override
    public CartItemDto update(CartItemReq t, String id, String username) {

        User user = userRep.findByUsername(username).orElseThrow(() -> new NotFoundException(String.format("%s not found", username)));
        ShoppingCart cart = shoppingCartRep.findByUser_Id(user.getId()).orElseThrow(() -> new NotFoundException(String.format("%s not found", "Cart")));
        ShoppingCartItem item = shoppingCartItemRep.findByIdAndShoppingCart(id, cart).orElseThrow(() -> new NotFoundException(String.format("%s not found", id)));
        ProductItem productItem = productItemRep.findById(t.getProductItemId()).orElseThrow(() -> new NotFoundException(String.format("%s not found", t.getProductItemId())));

        if (checkQtyInStock(t.getQty(), productItem.getQtyInStock())) {
            throw new DuplicateKeyException("The quantity of products in stock is not enough");
        }
        if(t.getQty() == 0) {
            shoppingCartItemRep.delete(item);
            return null;
        }

        item.setQty(t.getQty());
        return shoppingCartItemMapper.mapToDto(shoppingCartItemRep.save(item));
    }

    @Override
    public Page<CartItemDto> filter(PageRequestDto dto, String keyword, String username) {
        User user = userRep.findByUsername(username).orElseThrow(() -> new NotFoundException(String.format("%s not found", username)));
        ShoppingCart cart = shoppingCartRep.findByUser_Id(user.getId()).orElseThrow(() -> new NotFoundException(String.format("%s not found", "Cart")));
        List<CartItemDto> listCategoryDto =  shoppingCartItemRep.findByShoppingCart(cart)
                .stream()
                .map(shoppingCartItemMapper::mapToDto)
                .collect(Collectors.toList());
        return pageAuto.Page(dto, listCategoryDto);
    }
}
