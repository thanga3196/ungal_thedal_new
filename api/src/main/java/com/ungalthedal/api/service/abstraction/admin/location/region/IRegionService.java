package com.ungalthedal.api.service.abstraction.admin.location.region;

import com.ungalthedal.api.domain.admin.location.region.Region;
import com.ungalthedal.api.domain.admin.location.region.RegionView;

import java.util.List;

public interface IRegionService {
    List<RegionView> getList(RegionView regionView);
    Region getById(Long id);
    Region getByNme(Region region);
    Region save(Region region);
    void delete(Region region);
}
