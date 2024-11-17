package com.example.clothes_shop.rep;

import com.example.clothes_shop.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RoleRep extends JpaRepository<Role, String> {
    Optional<Role> findByAuthority(String authority);

}
