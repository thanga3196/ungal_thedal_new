package com.ungalthedal.api.controller;

import com.ungalthedal.api.controller.abstraction.IApiController;
import com.ungalthedal.api.domain.admin.category.category.CategoryView;
import com.ungalthedal.api.domain.admin.category.sub_category.SubCategoryView;
import com.ungalthedal.api.domain.admin.location.city.CityView;
import com.ungalthedal.api.domain.admin.location.country.CountryView;
import com.ungalthedal.api.domain.admin.location.district.DistrictView;
import com.ungalthedal.api.domain.admin.location.region.RegionView;
import com.ungalthedal.api.domain.admin.location.state.StateView;
import com.ungalthedal.api.domain.shared.IconListView;
import com.ungalthedal.api.model.*;
import com.ungalthedal.api.service.abstraction.IApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")
public class ApiController implements IApiController {
    IApiService apiService;

    @Autowired
    public ApiController(IApiService apiService) {
        this.apiService = apiService;
    }

    @Override
    @GetMapping("status")
    public ResponseEntity<Status> getStatus() {
        return ResponseEntity.ok(apiService.getStatus());
    }

    @Override
    @GetMapping("sharedDetails")
    public ResponseEntity<Shared> getSharedDetails() {
        return ResponseEntity.ok(apiService.getSharedDetails());
    }

    @Override
    @GetMapping("searchDropDownDetails")
    public ResponseEntity<Search> getSearchDropDownDetails() {
        return ResponseEntity.ok(apiService.getSearchDropDownDetails());
    }

    @Override
    @GetMapping("cityList")
    public ResponseEntity<List<CityView>> getCityList() {
        return ResponseEntity.ok(apiService.getAllCity());
    }

    @Override
    @GetMapping("districtList")
    public ResponseEntity<List<DistrictView>> getDistrictList() {
        return ResponseEntity.ok(apiService.getAllDistrict());
    }

    @Override
    @GetMapping("stateList")
    public ResponseEntity<List<StateView>> getStateList() {
        return ResponseEntity.ok(apiService.getAllState());
    }

    @Override
    @GetMapping("countryList")
    public ResponseEntity<List<CountryView>> getCountryList() {
        return ResponseEntity.ok(apiService.getAllCountry());
    }

    @Override
    @GetMapping("regionList")
    public ResponseEntity<List<RegionView>> getRegionList() {
        return ResponseEntity.ok(apiService.getAllRegion());
    }

    @Override
    @GetMapping("categoryList")
    public ResponseEntity<List<CategoryView>> getCategoryList() {
        return ResponseEntity.ok(apiService.getAllCategory());
    }

    @Override
    @GetMapping("subCategoryList")
    public ResponseEntity<List<SubCategoryView>> getSubCategoryList() {
        return ResponseEntity.ok(apiService.getAllSubCategory());
    }

    @Override
    @GetMapping("iconList")
    public ResponseEntity<List<IconListView>> getIconList() {
        return ResponseEntity.ok(apiService.getAllIconList());
    }

    @Override
    @PostMapping(value = "login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(apiService.login(loginRequest));
    }

    @Override
    @PostMapping(value = "register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(apiService.register(registerRequest));
    }
}
