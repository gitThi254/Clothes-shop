package com.example.clothes_shop.service;

import com.example.clothes_shop.dto.user.LoginDto;
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
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements IAuthenticationService {
    private final UserRep userRep;
    private final UserMapper userMapper;
    private final RoleRep roleRep;
    private final TokenService tokenService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private CartRep cartRep;


    @Override
    public UserDto  register(UserReq t) {
        if(userRep.existsByUsername(t.getUsername())) {
            throw new DuplicateKeyException("Username already exists");
        }
        if(userRep.existsByEmail(t.getEmail())) {
            throw new DuplicateKeyException("Email already exists");
        }
        if(userRep.existsByPhone(t.getPhone())) {
            throw  new DuplicateKeyException("Phone already exists");
        }
        Role roleUser = roleRep.findByAuthority("USER").orElseThrow(() -> new NotFoundException("Error 404"));
        Set<Role> roles = new HashSet<>();
        roles.add(roleUser);
        User user = userMapper.mapTo(t, roles);
        ShoppingCart cart = new ShoppingCart();
        ShoppingCart newCart = cartRep.save(cart);
        user.setCart(newCart);
        User newUser = userRep.save(user);
        return userMapper.mapToDto(newUser);
    }

    @Override
    public LoginDto login(String username, String password) {
        Authentication authentication =  authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        String token = tokenService.GeneratorToken(authentication);
        User user  = userRep.findByUsername(username).orElseThrow(() -> new NotFoundException("username or password is invalid"));
        return new LoginDto(user.getId(), user.getUsername(), user.getEmail(),user.getFirstName(),user.getLastName(), user.getPassword(), user.getPhone(),user.getAuthorities().stream().findFirst().get().getAuthority(), token);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRep.findByUsername(username).orElseThrow(() -> new NotFoundException(String.format("Username with id %s not found", username)));

    }
}
