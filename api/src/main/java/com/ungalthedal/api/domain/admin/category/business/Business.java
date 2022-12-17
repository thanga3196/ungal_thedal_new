package com.ungalthedal.api.domain.admin.category.business;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "business")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@DynamicUpdate
public class Business {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nme")
    private String nme;

    @Column(name = "active")
    private boolean active;

    @Column(name = "business_address_id")
    private Long businessAddressId;

    @Column(name = "business_general_info_id")
    private Long businessGeneralInfoId;

    @Column(name = "start_dte")
    private Date startDte;

    @Column(name = "end_dte")
    private Date endDte;

    @Column(name = "date_created")
    private Date dateCreated;

    @Column(name = "last_updated")
    private Date lastUpdated;
}
