package com.example.clothes_shop.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@Table(name="user_site")
@SuperBuilder
@Entity
public  class User extends BaseEntity implements UserDetails {
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String email;
    private String phone;
    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Address> addresses;
    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<ShopOrder> shopOrders;
    @OneToOne
    @JoinColumn(name = "cartId")
    private ShoppingCart cart;
    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "user_role_func", joinColumns = @JoinColumn(name="user_site_id",referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name="role_id", referencedColumnName = "id"))
    Set<Role> authorities;

    public User(String username, String firstName, String lastName, String password, String email, String phone, Set<Role> roles, ShoppingCart cart) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.authorities = roles;
        this.cart = cart;
    }
    public String fullName() {
        return firstName + " " + lastName;
    }

}
