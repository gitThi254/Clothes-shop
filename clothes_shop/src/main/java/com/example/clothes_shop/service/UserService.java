package com.example.clothes_shop.service;

import com.example.clothes_shop.dto.PageRequestDto;
import com.example.clothes_shop.dto.user.UserDto;
import com.example.clothes_shop.dto.user.UserReq;
import com.example.clothes_shop.exception.DuplicateKeyException;
import com.example.clothes_shop.exception.NotFoundException;
import com.example.clothes_shop.mapper.UserMapper;
import com.example.clothes_shop.model.Role;
import com.example.clothes_shop.model.ShoppingCart;
import com.example.clothes_shop.model.User;
import com.example.clothes_shop.rep.CartRep;
import com.example.clothes_shop.rep.RoleRep;
import com.example.clothes_shop.rep.UserRep;
import com.example.clothes_shop.utils.PageAuto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final RoleRep roleRep;
    private final UserMapper userMapper;
    private final UserRep userRep;
    private final PageAuto pageAuto;
    private final PasswordEncoder passwordEncoder;
    private final CartRep cartRep;

    @Override
    public void Save(UserReq t) {
        if(userRep.existsByUsername(t.getUsername())) {
            throw new DuplicateKeyException("Username already exists");
        }
        if(userRep.existsByEmail(t.getEmail())) {
            throw new DuplicateKeyException("Email already exists");
        }
        if(userRep.existsByPhone(t.getPhone())) {
            throw  new DuplicateKeyException("Phone already exists");
        }
        Role role = roleRep.findByAuthority(t.getRole()).orElseThrow(() -> new NotFoundException("Role not found"));
        ShoppingCart cart = new ShoppingCart();
        ShoppingCart newCart = cartRep.save(cart);
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        User user = userMapper.mapTo(t, roles);
        user.setCart(newCart);
        userRep.save(user);

    }


    @Override
    public UserDto findById(String id) {
        return userRep.findById(id).map(userMapper::mapToDto).orElseThrow(() -> new NotFoundException("User not found"));
    }

    @Override
    public void delete(String id) {
        User user = userRep.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
        userRep.delete(user);
    }

    @Override
    public void update(UserReq t, String id) {
        User user = userRep.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
        Role role = roleRep.findByAuthority(t.getRole()).orElseThrow(() -> new NotFoundException("Role not found"));
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setAuthorities(roles);
        user.setEmail(t.getEmail());
        user.setFirstName(t.getFirstName());
        user.setLastName(t.getLastName());
        user.setPassword(passwordEncoder.encode(t.getPassword()));
        user.setPhone(t.getPhone());
        userRep.save(user);
    }

    @Override
    public void updateProfile(UserReq t, String username) {
        User user = userRep.findByUsername(username).orElseThrow(() -> new NotFoundException("User not found"));
        user.setEmail(t.getEmail());
        user.setFirstName(t.getFirstName());
        user.setLastName(t.getLastName());
        user.setPhone(t.getPhone());
        userRep.save(user);
    }

    @Override
    public Page<UserDto> filter(PageRequestDto dto, String keyword, String role) {
        List<UserDto> list =  userRep.filter(keyword, role)
                .stream()
                .map(userMapper::mapToDto)
                .collect(Collectors.toList());
        return pageAuto.Page(dto, list);
    }
}
