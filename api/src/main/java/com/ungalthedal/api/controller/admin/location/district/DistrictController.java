package com.ungalthedal.api.controller.admin.location.district;

import com.ungalthedal.api.constant.AlertType;
import com.ungalthedal.api.controller.abstraction.admin.location.district.IDistrictController;
import com.ungalthedal.api.domain.admin.location.district.District;
import com.ungalthedal.api.domain.admin.location.district.DistrictView;
import com.ungalthedal.api.model.Response;
import com.ungalthedal.api.service.abstraction.admin.location.city.ICityService;
import com.ungalthedal.api.service.abstraction.admin.location.district.IDistrictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("admin/district")
@CrossOrigin(origins = "*")
public class DistrictController implements IDistrictController {
    IDistrictService districtService;
    ICityService cityService;

    @Autowired
    DistrictController(IDistrictService districtService, ICityService cityService) {
        this.districtService = districtService;
        this.cityService = cityService;
    }

    @Override
    @PostMapping(value = "list", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getList(@RequestBody DistrictView districtView) throws Exception {
        return ResponseEntity.ok(this.districtService.getList(districtView));
    }

    @Override
    @PostMapping(value = "save", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> save(@RequestBody District district) throws Exception {
        District oldDistrict = this.districtService.getById(district.getId());
        if (oldDistrict != null) {
            return ResponseEntity.ok(districtService.save(district));
        }
        oldDistrict = this.districtService.getByNmeAndStateId(district);
        if (oldDistrict != null)
            return ResponseEntity.ok(new Response("District " + oldDistrict.getNme() + " already exists.", AlertType.SUCCESS));
        else return ResponseEntity.ok(districtService.save(district));
    }

    @Override
    @PostMapping(value = "delete", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> delete(@RequestBody District district) throws Exception {
        District district1 = this.districtService.getById(district.getId());
        if (district1 != null) {
            this.districtService.delete(district);
            return ResponseEntity.ok(new Response("District '" + district.getNme() + "' deleted successfully.", AlertType.SUCCESS));
        } else
            return ResponseEntity.ok(new Response("District '" + district.getNme() + "' not exists.", AlertType.WARNING));
    }

    @Override
    @PostMapping(value = "getById", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getById(@RequestBody DistrictView districtView) throws Exception {
        return ResponseEntity.ok(this.districtService.getById(districtView.getId()));
    }

    @Override
    @PostMapping(value = "listCityByDistrict", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getCityListByDistrict(@RequestBody DistrictView districtView) throws Exception {
        return ResponseEntity.ok(this.cityService.getCityListByDistrict(districtView));
    }
}

