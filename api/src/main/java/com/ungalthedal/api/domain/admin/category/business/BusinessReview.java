package com.ungalthedal.api.domain.admin.category.business;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "business_review")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@DynamicUpdate
public class BusinessReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "business_id")
    private Long businessId;

    @Column(name = "nme")
    private String nme;

    @Column(name = "country_id")
    private Long countryId;

    @Column(name = "nbr")
    private String nbr;

    @Column(name = "msg")
    private String msg;

    @Column(name = "rating")
    private int rating;
}
