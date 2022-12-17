package com.ungalthedal.api.model;

import org.springframework.security.core.GrantedAuthority;

public class CustomRole implements GrantedAuthority {
    private String nme;

    @Override
    public String getAuthority() {
        return nme;
    }
}
