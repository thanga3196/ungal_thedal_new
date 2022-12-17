package com.ungalthedal.api.domain.admin.location.state;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "v_state")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class StateView {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "country_id")
    private Long countryId;

    @Column(name = "nme")
    private String nme;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "date_created")
    private Date dateCreated;

    @Column(name = "last_updated")
    private Date lastUpdated;
}
