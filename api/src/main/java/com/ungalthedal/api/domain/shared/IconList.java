package com.ungalthedal.api.domain.shared;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "icon_list")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class IconList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nme")
    private String nme;

    @Column(name = "path")
    private String path;

    @Column(name = "active")
    private boolean active;
}
