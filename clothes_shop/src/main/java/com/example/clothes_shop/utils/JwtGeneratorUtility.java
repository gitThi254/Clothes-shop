package com.example.clothes_shop.utils;

import java.security.KeyPair;
import java.security.KeyPairGenerator;

public class JwtGeneratorUtility {
    public static KeyPair generatorRSAKey() {
        KeyPair keyPair;
        try {
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
            keyPair = keyPairGenerator.generateKeyPair();
        } catch (Exception ex) {
            throw new IllegalStateException();
        }
        return keyPair;
    }
}
