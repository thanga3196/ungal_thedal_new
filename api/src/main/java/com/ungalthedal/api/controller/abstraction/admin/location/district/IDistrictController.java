package com.ungalthedal.api.controller.abstraction.admin.location.district;

import com.ungalthedal.api.domain.admin.location.district.District;
import com.ungalthedal.api.domain.admin.location.district.DistrictView;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public interface IDistrictController {
    ResponseEntity<?> getList(DistrictView districtView) throws Exception;
    ResponseEntity<?> getById(DistrictView districtView) throws Exception;
    ResponseEntity<?> save(District district) throws Exception;
    ResponseEntity<?> delete(District district) throws Exception;
    ResponseEntity<?> getCityListByDistrict(DistrictView districtView) throws Exception;
}
