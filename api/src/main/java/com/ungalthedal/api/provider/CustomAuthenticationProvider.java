package com.ungalthedal.api.provider;

import com.ungalthedal.api.model.CustomUserDetails;
import com.ungalthedal.api.service.credential.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private final CustomUserDetailsService customUserDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String userName = authentication.getName();
        String password = (String) authentication.getCredentials();

        CustomUserDetails customUserDetails = customUserDetailsService.getCustomerUserDetailsFromUserName(userName);

        if (Objects.isNull(customUserDetails) || !(customUserDetails.getEmail().equalsIgnoreCase(userName) || customUserDetails.getMobile().equalsIgnoreCase(userName))) {
            throw new BadCredentialsException("User not exists.");
        }

        if (!bCryptPasswordEncoder.matches(password, customUserDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password.");
        }

        return new UsernamePasswordAuthenticationToken(customUserDetails, password, List.of());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return true;
    }
}
