package com.ungalthedal.api.domain.admin.category.sub_category;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "sub_category")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SubCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "nme")
    private String nme;

    @Column(name = "active")
    private boolean active;

    @Column(name = "date_created")
    private Date dateCreated;

    @Column(name = "last_updated")
    private Date lastUpdated;
}
