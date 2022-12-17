package com.ungalthedal.api.repository.admin.general;

import com.ungalthedal.api.domain.admin.general.WeekDays;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IWeekDaysRepository extends JpaRepository<WeekDays, Long> {
    WeekDays getWeekDaysByNme(String nme);
    WeekDays getWeekDaysById(Long id);
}
