package com.ungalthedal.api.service.abstraction.admin.general;

import com.ungalthedal.api.domain.admin.general.WeekDays;
import com.ungalthedal.api.domain.admin.general.WeekDaysView;

import java.util.List;

public interface IWeekDaysService {
    List<WeekDaysView> getList(WeekDaysView weekDaysView);

    WeekDays getById(Long id);

    WeekDays getByNme(WeekDays weekDays);

    WeekDays save(WeekDays weekDays);

    void delete(WeekDays weekDays);
}
