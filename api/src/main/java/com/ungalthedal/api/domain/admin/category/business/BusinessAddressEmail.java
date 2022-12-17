package com.ungalthedal.api.domain.admin.category.business;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Table(name = "business_address_email")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@DynamicUpdate
public class BusinessAddressEmail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "business_address_id")
    private Long businessAddressId;

    @Column(name = "email_id")
    private String emailId;
}
