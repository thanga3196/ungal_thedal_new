package com.ungalthedal.api.controller.abstraction.admin.general;

import com.ungalthedal.api.domain.admin.general.WeekDays;
import com.ungalthedal.api.domain.admin.general.WeekDaysView;
import org.springframework.http.ResponseEntity;

public interface IWeekDaysController {
    ResponseEntity<?> getList(WeekDaysView weekDaysView) throws Exception;
    ResponseEntity<?> getById(WeekDaysView weekDaysView) throws Exception;
    ResponseEntity<?> save(WeekDays weekDays) throws Exception;
    ResponseEntity<?> delete(WeekDays weekDays) throws Exception;
}
