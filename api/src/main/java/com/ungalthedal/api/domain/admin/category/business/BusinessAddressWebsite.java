package com.ungalthedal.api.domain.admin.category.business;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Table(name = "business_address_website")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@DynamicUpdate
public class BusinessAddressWebsite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "business_address_id")
    private Long businessAddressId;

    @Column(name = "site_url")
    private String siteUrl;
}
