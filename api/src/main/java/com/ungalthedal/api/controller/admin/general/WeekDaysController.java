package com.ungalthedal.api.controller.admin.general;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ungalthedal.api.constant.AlertType;
import com.ungalthedal.api.controller.abstraction.admin.general.IWeekDaysController;
import com.ungalthedal.api.domain.admin.general.WeekDays;
import com.ungalthedal.api.domain.admin.general.WeekDaysView;
import com.ungalthedal.api.model.Response;
import com.ungalthedal.api.service.abstraction.admin.general.IWeekDaysService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("admin/week-days")
@CrossOrigin(origins = "*")
public class WeekDaysController implements IWeekDaysController {
    IWeekDaysService weekDaysService;
    HttpServletRequest httpServletRequest;
    ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    WeekDaysController(IWeekDaysService weekDaysService, HttpServletRequest httpServletRequest) {
        this.httpServletRequest = httpServletRequest;
        this.weekDaysService = weekDaysService;
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    @Override
    @PostMapping(value = "list", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getList(@RequestBody WeekDaysView weekDaysView) throws Exception {
        return ResponseEntity.ok(this.weekDaysService.getList(weekDaysView));
    }

    @Override
    @PostMapping(value = "save", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> save(@RequestBody WeekDays weekDays) throws Exception {
        WeekDays oldWeekDays = this.weekDaysService.getById(weekDays.getId());
        if (oldWeekDays != null) {
            return ResponseEntity.ok(weekDaysService.save(weekDays));
        }
        oldWeekDays = this.weekDaysService.getByNme(weekDays);
        if (oldWeekDays != null)
            return ResponseEntity.ok(new Response("Week Days " + oldWeekDays.getNme() + " already exists.", AlertType.SUCCESS));
        else return ResponseEntity.ok(weekDaysService.save(weekDays));
    }

    @Override
    @PostMapping(value = "delete", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> delete(@RequestBody WeekDays weekDays) throws Exception {
        WeekDays weekDays1 = this.weekDaysService.getById(weekDays.getId());
        if (weekDays1 != null) {
            this.weekDaysService.delete(weekDays);
            return ResponseEntity.ok(new Response("Week Days '" + weekDays.getNme() + "' deleted successfully.", AlertType.SUCCESS));
        } else
            return ResponseEntity.ok(new Response("Week Days '" + weekDays.getNme() + "' not exists.", AlertType.WARNING));
    }

    @Override
    @PostMapping(value = "getById", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getById(@RequestBody WeekDaysView weekDaysView) throws Exception {
        return ResponseEntity.ok(this.weekDaysService.getById(weekDaysView.getId()));
    }
}

