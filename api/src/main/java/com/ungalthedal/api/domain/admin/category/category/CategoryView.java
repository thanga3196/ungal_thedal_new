package com.ungalthedal.api.domain.admin.category.category;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "v_category")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CategoryView {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
