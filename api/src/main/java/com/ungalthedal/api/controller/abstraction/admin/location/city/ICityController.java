package com.ungalthedal.api.controller.abstraction.admin.location.city;

import com.ungalthedal.api.domain.admin.location.city.City;
import com.ungalthedal.api.domain.admin.location.city.CityView;
import org.springframework.http.ResponseEntity;

public interface ICityController {
    ResponseEntity<?> getList(CityView cityView) throws Exception;
    ResponseEntity<?> getById(CityView cityView) throws Exception;
    ResponseEntity<?> save(City city) throws Exception;
    ResponseEntity<?> delete(City city) throws Exception;
}
