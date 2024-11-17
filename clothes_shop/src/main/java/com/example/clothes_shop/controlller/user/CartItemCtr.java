package com.example.clothes_shop.controlller.user;

import com.example.clothes_shop.dto.CartItemDto;
import com.example.clothes_shop.dto.PageRequestDto;
import com.example.clothes_shop.req.CartItemReq;
import com.example.clothes_shop.service.CartItemService;
import com.example.clothes_shop.service.DecodeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("${api.prefix}/cart")
@RequiredArgsConstructor
public class CartItemCtr {
    private final CartItemService service;
    private final DecodeService decodeService;
    @PostMapping
    public ResponseEntity<CartItemDto> create(
            @Valid @RequestBody CartItemReq t,
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        String username = decodeService.DecodeToken(authorizationHeader);
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(t, username));
    }
    @GetMapping
    public ResponseEntity<Page<CartItemDto>> getAll(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestParam(value = "keyword", required = false, defaultValue = "") String keyword,
            @RequestParam(value = "pageIndex", required = false, defaultValue = "0") Integer pageIndex,
            @RequestParam(value = "pageSize", required = false, defaultValue = "10") Integer pageSize,
            @RequestParam(value = "sort", required = false, defaultValue = "createdAt") String sort,
            @RequestParam(value = "order", required = false, defaultValue = "DESC") Sort.Direction order
    ) {
        String username = decodeService.DecodeToken(authorizationHeader);
        PageRequestDto dto = new PageRequestDto(pageIndex, pageSize, order, sort);
        return ResponseEntity.ok(service.filter(dto, keyword.toLowerCase(), username));
    }

    @GetMapping("/{itemId}")
    public ResponseEntity<CartItemDto> findById(@PathVariable String itemId
            , @RequestHeader("Authorization") String authorizationHeader) {
        String username = decodeService.DecodeToken(authorizationHeader);

        return ResponseEntity.ok(service.findById(itemId, username));
    }
    @PutMapping("/{itemId}")
    public ResponseEntity<CartItemDto> update(@RequestHeader("Authorization") String authorizationHeader, @PathVariable String itemId, @Valid @RequestBody CartItemReq req) {
        String username = decodeService.DecodeToken(authorizationHeader);

        return ResponseEntity.ok(service.update(req, itemId ,username ));
    }
    @DeleteMapping("/{itemId}")
    public ResponseEntity<String> delete(@RequestHeader("Authorization") String authorizationHeader,  @PathVariable String itemId) {
        String username = decodeService.DecodeToken(authorizationHeader);
        service.delete(itemId, username);
        return ResponseEntity.ok(String.format("Variation with id %s deleted", itemId));
    }
}
