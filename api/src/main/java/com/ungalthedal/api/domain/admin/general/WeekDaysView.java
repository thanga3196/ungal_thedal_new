package com.ungalthedal.api.domain.admin.general;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "v_week_days")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class WeekDaysView {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nme")
    private String nme;

    @Column(name = "active")
    private Boolean active;
}
