package com.example.clothes_shop.utils;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.security.KeyPair;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

@Component
@Data
public class JwtRsaProperties {
    private RSAPublicKey publicKey;
    private RSAPrivateKey privateKey;
    public JwtRsaProperties() {
        KeyPair key = JwtGeneratorUtility.generatorRSAKey();
        this.publicKey = (RSAPublicKey) key.getPublic();
        this.privateKey = (RSAPrivateKey) key.getPrivate();
    }
}

