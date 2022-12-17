package com.ungalthedal.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ungalthedal.api.domain.credential.UserView;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class CustomUserDetails implements UserDetails {
    private String firstNme;
    private String lastNme;
    private String displayNme;
    private String email;
    private String mobile;
    @JsonIgnore
    private String password;
    private boolean accountExpired = false;
    private boolean accountLocked;
    private boolean passwordExpired;
    private boolean accountEnabled;
    private List<CustomRole> roles;

    public CustomUserDetails(String firstNme, String lastNme, String displayNme, String email, String mobile, String password, boolean accountExpired, boolean accountLocked, boolean passwordExpired, boolean accountEnabled, List<CustomRole> roles) {
        this.firstNme = firstNme;
        this.lastNme = lastNme;
        this.displayNme = displayNme;
        this.email = email;
        this.mobile = mobile;
        this.password = password;
        this.accountExpired = accountExpired;
        this.accountLocked = accountLocked;
        this.passwordExpired = passwordExpired;
        this.accountEnabled = accountEnabled;
        this.roles = roles;
    }

    public static CustomUserDetails copy(UserView userView) {
        return new CustomUserDetails(userView.getFirstNme(), userView.getLastNme(), userView.getDisplayNme(), userView.getEmail(), userView.getMobile(), userView.getPassword(), false, userView.isAccountLocked(), userView.isPasswordExpired(), userView.isAccountEnabled(), List.of());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return !accountExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !accountLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return !passwordExpired;
    }

    @Override
    public boolean isEnabled() {
        return accountEnabled;
    }

    public String getFirstNme() {
        return firstNme;
    }

    public String getLastNme() {
        return lastNme;
    }

    public String getDisplayNme() {
        return displayNme;
    }

    public String getEmail() {
        return email;
    }

    public String getMobile() {
        return mobile;
    }

    public boolean isAccountExpired() {
        return accountExpired;
    }

    public boolean isAccountLocked() {
        return accountLocked;
    }

    public boolean isPasswordExpired() {
        return passwordExpired;
    }

    public boolean isAccountEnabled() {
        return accountEnabled;
    }

    public List<CustomRole> getRoles() {
        return roles;
    }
}
