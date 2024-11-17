package com.example.clothes_shop;

import com.example.clothes_shop.model.*;
import com.example.clothes_shop.model.Enum.ShippingEnum;
import com.example.clothes_shop.model.Enum.StatusEnum;
import com.example.clothes_shop.rep.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@SpringBootApplication
public class ClothesShopApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClothesShopApplication.class, args);
	}
	@Bean
	public CommandLineRunner commandLineRunner(UserRep userRep, RoleRep roleRep, PasswordEncoder passwordEncoder, CartRep cartRep, OrderStatusRep orderStatusRep, ShippingMethodRep shippingMethodRep) {
		return args -> {

			if (roleRep.findByAuthority("ADMIN").isPresent() && roleRep.findByAuthority("USER").isPresent()
			) {
				return;
			} else {
				Role roleAdmin = Role.builder().authority("ADMIN").build();
				Role roleUser = Role.builder().authority("USER").build();
				Role RoleUser = roleRep.save(roleUser);
				Role RoleAdmin = roleRep.save(roleAdmin);
				Set<Role> roles = new HashSet<>();
				roles.add(RoleAdmin);
				Set<Role> rolesUser = new HashSet<>();
				rolesUser.add(RoleUser);
				ShoppingCart cart1 = new ShoppingCart();
				ShoppingCart cart2 = new ShoppingCart();
				ShoppingCart newCart1 = cartRep.save(cart1);
				ShoppingCart newCart2 = cartRep.save(cart2);

				userRep.save(new User("admin", "user", "01", passwordEncoder.encode("password"), "admin@gmail.com", "0123456789", roles, newCart1));
				userRep.save(new User("user", "admin", "01", passwordEncoder.encode("password"), "user@gmail.com", "0123456789", rolesUser, newCart2));
				List<ShippingMethod> shippingMethods = new ArrayList<>();
				shippingMethods.add(new ShippingMethod(
						ShippingEnum.EconomyShipping.id,
						ShippingEnum.EconomyShipping.name,
						ShippingEnum.EconomyShipping.price
				));
				shippingMethods.add(new ShippingMethod(
						ShippingEnum.ExpressShipping.id,
						ShippingEnum.ExpressShipping.name,
						ShippingEnum.ExpressShipping.price
				));
				shippingMethods.add(new ShippingMethod(
						ShippingEnum.ExpressDelivery.id,
						ShippingEnum.ExpressDelivery.name,
						ShippingEnum.ExpressDelivery.price
				));
				shippingMethodRep.saveAll(shippingMethods);
				List<OrderStatus> orderStatuses = new ArrayList<>();
				orderStatuses.add(new OrderStatus(
						StatusEnum.Pending.id,
						StatusEnum.Pending.name
				));
				orderStatuses.add(new OrderStatus(
						StatusEnum.Cancelled.id,
						StatusEnum.Cancelled.name
				));
				orderStatuses.add(new OrderStatus(
						StatusEnum.Completed.id,
						StatusEnum.Completed.name
				));
				orderStatuses.add(new OrderStatus(
						StatusEnum.Processing.id,
						StatusEnum.Processing.name
				));
				orderStatuses.add(new OrderStatus(
						StatusEnum.Returned.id,
						StatusEnum.Returned.name
				));
				orderStatuses.add(new OrderStatus(
						StatusEnum.Shipping.id,
						StatusEnum.Shipping.name
				));
				orderStatuses.add(new OrderStatus(
						StatusEnum.Shipped.id,
						StatusEnum.Shipped.name
				));
				orderStatusRep.saveAll(orderStatuses);
			}
		};
	}
}
