package com.ungalthedal.api.domain.admin.category.business;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "business_operative_hours")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@DynamicUpdate
public class BusinessOperativeHours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "business_id")
    private Long businessId;

    @Column(name = "week_days_id")
    private Long weekDaysId;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    @Column(name = "is_holiday")
    private boolean isHoliday;

    @Column(name = "reason")
    private String reason;
}
