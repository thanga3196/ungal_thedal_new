package com.ungalthedal.api.domain.admin.advertisement;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "v_ad_home_carousel")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@DynamicUpdate
public class AdHomeCarouselView {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nme")
    private String nme;

    @Column(name = "business_id")
    private Long businessId;

    @Column(name = "path_nme")
    private String pathNme;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "start_dte")
    private Date startDte;

    @Column(name = "end_dte")
    private Date endDte;

    @Column(name = "date_created")
    private Date dateCreated;

    @Column(name = "last_updated")
    private Date lastUpdated;
}
