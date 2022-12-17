package com.ungalthedal.api.domain.admin.location.country;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "country")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "region_id")
    private Long regionId;

    @Column(name = "nme")
    private String nme;

    @Column(name = "cde")
    private String cde;

    @Column(name = "mobile_cde")
    private String mobileCde;

    @Column(name = "mobile_regex")
    private String mobileRegex;

    @Column(name = "active")
    private boolean active;

    @Column(name = "date_created")
    private Date dateCreated;

    @Column(name = "last_updated")
    private Date lastUpdated;
}
