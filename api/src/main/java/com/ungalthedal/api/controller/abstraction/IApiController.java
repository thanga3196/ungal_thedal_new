package com.ungalthedal.api.controller.abstraction;

import com.ungalthedal.api.model.LoginRequest;
import com.ungalthedal.api.model.RegisterRequest;
import org.springframework.http.ResponseEntity;

public interface IApiController {
    ResponseEntity<?> getStatus() throws Exception;
    ResponseEntity<?> getSharedDetails();
    ResponseEntity<?> getSearchDropDownDetails();
    ResponseEntity<?> getCityList();
    ResponseEntity<?> getDistrictList();
    ResponseEntity<?> getStateList();
    ResponseEntity<?> getCountryList();
    ResponseEntity<?> getRegionList();
    ResponseEntity<?> getCategoryList();
    ResponseEntity<?> getSubCategoryList();
    ResponseEntity<?> getIconList();
    ResponseEntity<?> login(LoginRequest loginRequest) throws Exception;
    ResponseEntity<?> register(RegisterRequest registerRequest) throws Exception;
}
