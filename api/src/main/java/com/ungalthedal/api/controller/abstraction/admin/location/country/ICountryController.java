package com.ungalthedal.api.controller.abstraction.admin.location.country;

import com.ungalthedal.api.domain.admin.location.country.Country;
import com.ungalthedal.api.domain.admin.location.country.CountryView;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public interface ICountryController {
    ResponseEntity<?> getList(CountryView countryView) throws Exception;
    ResponseEntity<?> getById(CountryView countryView) throws Exception;
    ResponseEntity<?> getStateListByCountry(CountryView countryView) throws Exception;
    ResponseEntity<?> save(Country country) throws Exception;
    ResponseEntity<?> delete(Country country) throws Exception;
}
