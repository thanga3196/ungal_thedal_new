package com.ungalthedal.api.domain.admin.location.region;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "region")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Region {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nme")
    private String nme;

    @Column(name = "active")
    private boolean active;

    @Column(name = "date_created")
    private Date dateCreated;

    @Column(name = "last_updated")
    private Date lastUpdated;
}
