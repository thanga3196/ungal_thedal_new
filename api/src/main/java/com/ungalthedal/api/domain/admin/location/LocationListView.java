package com.ungalthedal.api.domain.admin.location;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "v_location_list")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LocationListView {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nme")
    private String nme;
}
