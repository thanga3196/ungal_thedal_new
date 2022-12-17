package com.ungalthedal.api.controller.abstraction.admin.location.region;

import com.ungalthedal.api.domain.admin.location.region.Region;
import com.ungalthedal.api.domain.admin.location.region.RegionView;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

public interface IRegionController {
    ResponseEntity<?> getList(RegionView regionView) throws Exception;
    ResponseEntity<?> getCountryListByRegion(RegionView regionView) throws Exception;
    ResponseEntity<?> getById(RegionView regionView) throws Exception;
    ResponseEntity<?> save(Region region) throws Exception;
    ResponseEntity<?> delete(Region region) throws Exception;
}
