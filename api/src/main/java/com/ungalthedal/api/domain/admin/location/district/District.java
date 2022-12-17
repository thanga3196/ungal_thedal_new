package com.ungalthedal.api.domain.admin.location.district;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "district")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class District {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "state_id")
    private Long stateId;

    @Column(name = "nme")
    private String nme;

    @Column(name = "active")
    private boolean active;

    @Column(name = "date_created")
    private Date dateCreated;

    @Column(name = "last_updated")
    private Date lastUpdated;
}
