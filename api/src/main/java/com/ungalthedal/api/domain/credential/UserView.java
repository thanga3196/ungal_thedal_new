package com.ungalthedal.api.domain.credential;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "v_user")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserView {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_nme")
    private String firstNme;

    @Column(name = "last_nme")
    private String lastNme;

    @Column(name = "display_nme")
    private String displayNme;

    @Column(name = "gender")
    private String gender;

    @Column(name = "email")
    private String email;

    @Column(name = "mobile")
    private String mobile;

    @Column(name = "password")
    private String password;

    @Column(name = "password_expired")
    private boolean passwordExpired;

    @Column(name = "account_enabled")
    private boolean accountEnabled;

    @Column(name = "account_locked")
    private boolean accountLocked;
}
