package com.ungalthedal.api.configuration;

import com.ungalthedal.api.entrypoint.AuthenticationTokenEntryPoint;
import com.ungalthedal.api.filter.AuthenticationTokenFilter;
import com.ungalthedal.api.provider.CustomAuthenticationProvider;
import com.ungalthedal.api.service.credential.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthenticationTokenEntryPoint authenticationTokenEntryPoint;
    private final AuthenticationTokenFilter authenticationTokenFilter;
    private final CustomAuthenticationProvider customAuthenticationProvider;

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        //Enable CORS and Disable CSRF
        httpSecurity.cors().and().csrf().disable()
                //Set Session Management to Stateless
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                //Set UnAuthorized Requests Exception Handler
                .exceptionHandling().authenticationEntryPoint(authenticationTokenEntryPoint).and()
                //Add Custom Authentication Provider
                .authenticationProvider(customAuthenticationProvider)
                //Set Endpoint Permissions
                .authorizeHttpRequests(auth ->
                        auth
                                .mvcMatchers("/api/**").permitAll()
                                //.mvcMatchers("/admin/**").permitAll()
                                .anyRequest().authenticated()

                )
                //Add JwtTokenFilter For Checking Token On Each Request
                .addFilterBefore(authenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }
}
