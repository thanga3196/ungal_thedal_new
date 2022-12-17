package com.ungalthedal.api.domain.credential;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "user_profile")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_nme")
    private String firstNme;

    @Column(name = "last_nme")
    private String lastNme;

    @Column(name = "gender")
    private String gender;

    @Column(name = "mobile")
    private String mobile;

    @Column(name = "email")
    private String email;

    @Column(name = "date_created")
    private Date dateCreated;

    @Column(name = "last_updated")
    private Date lastUpdated;

}
