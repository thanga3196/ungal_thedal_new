package com.ungalthedal.api.domain.admin.general;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "week_days")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class WeekDays {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nme")
    private String nme;

    @Column(name = "active")
    private Boolean active;
}
