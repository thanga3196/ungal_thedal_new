package com.ungalthedal.api.domain.admin.category.business;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Table(name = "business_address")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@DynamicUpdate
public class BusinessAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name ="line_1")
    private String line1;

    @Column(name ="line_2")
    private String line2;

    @Column(name ="area")
    private String area;

    @Column(name ="pin_cde")
    private String pin_cde;

    @Column(name ="city_id")
    private Long cityId;
}
