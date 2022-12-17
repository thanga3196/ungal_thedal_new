package com.ungalthedal.api.domain.credential;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "user_credential")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserCredential {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "password")
    private String password;

    @Column(name = "date_created")
    private Date dateCreated;

    @Column(name = "last_updated")
    private Date lastUpdated;
}
