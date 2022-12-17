package com.ungalthedal.api.repository.admin.general;

import com.ungalthedal.api.domain.admin.general.WeekDaysView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IWeekDaysViewRepository extends JpaRepository<WeekDaysView, Long> {
}
