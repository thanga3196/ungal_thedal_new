package com.ungalthedal.api.domain.admin.general;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "v_social_media")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SocialMediaView {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nme")
    private String nme;

    @Column(name = "logo")
    private String logo;

    @Column(name = "active")
    private Boolean active;
}
