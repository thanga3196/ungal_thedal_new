package com.ungalthedal.api.controller.admin.location.city;

import com.ungalthedal.api.constant.AlertType;
import com.ungalthedal.api.controller.abstraction.admin.location.city.ICityController;
import com.ungalthedal.api.domain.admin.location.city.City;
import com.ungalthedal.api.domain.admin.location.city.CityView;
import com.ungalthedal.api.model.Response;
import com.ungalthedal.api.service.abstraction.admin.location.city.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("admin/city")
@CrossOrigin(origins = "*")
public class CityController implements ICityController {
    ICityService cityService;

    @Autowired
    CityController(ICityService cityService) {
        this.cityService = cityService;
    }

    @Override
    @PostMapping(value = "list", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getList(@RequestBody CityView cityView) throws Exception {
        return ResponseEntity.ok(this.cityService.getList(cityView));
    }

    @Override
    @PostMapping(value = "getById", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getById(@RequestBody CityView cityView) throws Exception {
        return ResponseEntity.ok(this.cityService.getById(cityView.getId()));
    }

    @Override
    @PostMapping(value = "save", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> save(@RequestBody City city) throws Exception {
        City oldCity = this.cityService.getById(city.getId());
        if (oldCity != null) {
            return ResponseEntity.ok(cityService.save(city));
        }
        oldCity = this.cityService.getByNmeAndDistrictId(city);
        if (city.getId() == 0 && oldCity != null)
            return ResponseEntity.ok(new Response("City " + oldCity.getNme() + " already exists.", AlertType.SUCCESS));
        else return ResponseEntity.ok(cityService.save(city));
    }

    @Override
    @PostMapping(value = "delete", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> delete(@RequestBody City city) throws Exception {
        City city1 = this.cityService.getById(city.getId());
        if (city1 != null) {
            this.cityService.delete(city);
            return ResponseEntity.ok(new Response("City '" + city.getNme() + "' deleted successfully.", AlertType.SUCCESS));
        } else
            return ResponseEntity.ok(new Response("City '" + city.getNme() + "' not exists.", AlertType.WARNING));

    }


}
