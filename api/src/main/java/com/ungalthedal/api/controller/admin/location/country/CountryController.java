package com.ungalthedal.api.controller.admin.location.country;

import com.ungalthedal.api.constant.AlertType;
import com.ungalthedal.api.controller.abstraction.admin.location.country.ICountryController;
import com.ungalthedal.api.domain.admin.location.country.Country;
import com.ungalthedal.api.domain.admin.location.country.CountryView;
import com.ungalthedal.api.model.Response;
import com.ungalthedal.api.service.abstraction.admin.location.country.ICountryService;
import com.ungalthedal.api.service.abstraction.admin.location.state.IStateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("admin/country")
@CrossOrigin(origins = "*")
public class CountryController implements ICountryController {
    ICountryService countryService;
    IStateService stateService;

    @Autowired
    CountryController(ICountryService countryService, IStateService stateService) {
        this.countryService = countryService;
        this.stateService = stateService;
    }

    @Override
    @PostMapping(value = "list", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getList(@RequestBody CountryView countryView) throws Exception {
        return ResponseEntity.ok(this.countryService.getList(countryView));
    }

    @Override
    @PostMapping(value = "listStateByCountry", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getStateListByCountry(@RequestBody CountryView countryView) throws Exception {
        return ResponseEntity.ok(this.stateService.getStateListByCountry(countryView));
    }

    @Override
    @PostMapping(value = "save", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> save(@RequestBody Country country) throws Exception {
        Country oldCountry = this.countryService.getById(country.getId());
        if (oldCountry != null) {
            return ResponseEntity.ok(countryService.save(country));
        }
        oldCountry = this.countryService.getByNmeAndRegionId(country);
        if (oldCountry != null)
            return ResponseEntity.ok(new Response("Country " + oldCountry.getNme() + " already exists.", AlertType.SUCCESS));
        else return ResponseEntity.ok(countryService.save(country));
    }

    @Override
    @PostMapping(value = "delete", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> delete(@RequestBody Country country) throws Exception {
        Country country1 = this.countryService.getById(country.getId());
        if (country1 != null) {
            this.countryService.delete(country);
            return ResponseEntity.ok(new Response("Country '" + country.getNme() + "' deleted successfully.", AlertType.SUCCESS));
        } else
            return ResponseEntity.ok(new Response("Country '" + country.getNme() + "' not exists.", AlertType.WARNING));
    }

    @Override
    @PostMapping(value = "getById", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getById(@RequestBody CountryView countryView) throws Exception {
        return ResponseEntity.ok(this.countryService.getById(countryView.getId()));
    }


}

