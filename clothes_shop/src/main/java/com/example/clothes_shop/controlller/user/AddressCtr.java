package com.example.clothes_shop.controlller.user;

import com.example.clothes_shop.dto.AddressDto;
import com.example.clothes_shop.dto.PageRequestDto;
import com.example.clothes_shop.req.AddressReq;
import com.example.clothes_shop.service.AddressService;
import com.example.clothes_shop.service.DecodeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("${api.prefix}/address")
@RequiredArgsConstructor
public class AddressCtr {
    private final AddressService service;
    private final DecodeService decodeService;
    @PostMapping
    public ResponseEntity<AddressDto> create(
            @Valid @RequestBody AddressReq t,
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        String username = decodeService.DecodeToken(authorizationHeader);
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(t, username));
    }
    @GetMapping
    public ResponseEntity<Page<AddressDto>> getAll(
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

    @GetMapping("/{id}")
    public ResponseEntity<AddressDto> findById(@PathVariable String id, @RequestHeader("Authorization") String authorizationHeader) {
        String username = decodeService.DecodeToken(authorizationHeader);

        return ResponseEntity.ok(service.findById(id, username));
    }


    @PutMapping("/{id}")
    public ResponseEntity<AddressDto> update(@RequestHeader("Authorization") String authorizationHeader,@PathVariable String id, @Valid @RequestBody AddressReq req) {
        String username = decodeService.DecodeToken(authorizationHeader);

        return ResponseEntity.ok(service.update(req, id,username ));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@RequestHeader("Authorization") String authorizationHeader, @PathVariable String id) {
        String username = decodeService.DecodeToken(authorizationHeader);
        service.delete(id, username);
        return ResponseEntity.ok(String.format("Variation with id %s deleted", id));
    }
}
