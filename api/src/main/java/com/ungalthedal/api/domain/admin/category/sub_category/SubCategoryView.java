package com.ungalthedal.api.domain.admin.category.sub_category;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "v_sub_category")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SubCategoryView {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "category_nme")
    private String categoryNme;

    @Column(name = "nme")
    private String nme;

    @Column(name = "logo")
    private String logo;

    @Column(name = "logo_path")
    private String logoPath;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "date_created")
    private Date dateCreated;

    @Column(name = "last_updated")
    private Date lastUpdated;
}
