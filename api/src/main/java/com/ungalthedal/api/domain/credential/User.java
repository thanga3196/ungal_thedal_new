package com.ungalthedal.api.domain.credential;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "`user`")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "credential_id")
    private Long credentialId;

    @Column(name = "profile_id")
    private Long profileId;

    @Column(name = "login_id")
    private Long loginId;

    @Column(name = "enabled")
    private boolean enabled = true;

    @Column(name = "date_created")
    private Date dateCreated;

    @Column(name = "last_updated")
    private Date lastUpdated;
}
