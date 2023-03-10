package com.ungalthedal.api.domain.admin.category;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "v_category_list")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CategoryListView {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nme")
    private String nme;

    @Column(name = "logo_path")
    private String logoPath;

    @Column(name = "sub_category_count")
    private Long subCategoryCount;
}