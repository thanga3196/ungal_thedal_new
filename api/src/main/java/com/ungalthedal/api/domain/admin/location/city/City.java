package com.ungalthedal.api.domain.admin.location.city;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "city")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "district_id")
    private Long districtId;

    @Column(name = "nme")
    private String nme;

    @Column(name = "active")
    private boolean active;

    @Column(name = "date_created", nullable = true)
    private Date dateCreated;

    @Column(name = "last_updated", nullable = true)
    private Date lastUpdated;
}
