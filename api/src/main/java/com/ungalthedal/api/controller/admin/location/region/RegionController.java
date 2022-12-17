package com.ungalthedal.api.controller.admin.location.region;

import com.ungalthedal.api.constant.AlertType;
import com.ungalthedal.api.controller.abstraction.admin.location.region.IRegionController;
import com.ungalthedal.api.domain.admin.location.region.Region;
import com.ungalthedal.api.domain.admin.location.region.RegionView;
import com.ungalthedal.api.model.Response;
import com.ungalthedal.api.service.abstraction.admin.location.country.ICountryService;
import com.ungalthedal.api.service.abstraction.admin.location.region.IRegionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("admin/region")
@CrossOrigin(origins = "*")
public class RegionController implements IRegionController {
    IRegionService regionService;
    ICountryService countryService;

    @Autowired
    RegionController(IRegionService regionService, ICountryService countryService) {
        this.regionService = regionService;
        this.countryService = countryService;
    }

    @Override
    @PostMapping(value = "list", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getList(@RequestBody RegionView regionView) throws Exception {
        return ResponseEntity.ok(this.regionService.getList(regionView));
    }

    @Override
    @PostMapping(value = "listCountryByRegion", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getCountryListByRegion(@RequestBody RegionView regionView) throws Exception {
        return ResponseEntity.ok(this.countryService.getCountryListByRegion(regionView));
    }

    @Override
    @PostMapping(value = "save", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> save(@RequestBody Region region) throws Exception {
        Region oldRegion = this.regionService.getById(region.getId());
        if (oldRegion != null) {
            return ResponseEntity.ok(regionService.save(region));
        }
        oldRegion = this.regionService.getByNme(region);
        if (oldRegion != null)
            return ResponseEntity.ok(new Response("Region " + oldRegion.getNme() + " already exists.", AlertType.SUCCESS));
        else return ResponseEntity.ok(regionService.save(region));
    }

    @Override
    @PostMapping(value = "delete", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> delete(@RequestBody Region region) throws Exception {
        Region region1 = this.regionService.getById(region.getId());
        if (region1 != null) {
            this.regionService.delete(region);
            return ResponseEntity.ok(new Response("Region '" + region.getNme() + "' deleted successfully.", AlertType.SUCCESS));
        } else
            return ResponseEntity.ok(new Response("Region '" + region.getNme() + "' not exists.", AlertType.WARNING));
    }

    @Override
    @PostMapping(value = "getById", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getById(@RequestBody RegionView regionView) throws Exception {
        return ResponseEntity.ok(this.regionService.getById(regionView.getId()));
    }
}

