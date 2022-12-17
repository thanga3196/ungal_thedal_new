package com.ungalthedal.api.service.abstraction.admin.location.city;

import com.ungalthedal.api.domain.admin.location.city.City;
import com.ungalthedal.api.domain.admin.location.city.CityView;
import com.ungalthedal.api.domain.admin.location.district.DistrictView;

import java.util.List;

public interface ICityService {
    List<CityView> getList(CityView cityView);
    City getById(Long id);
    City getByNmeAndDistrictId(City city);
    List<CityView> getCityListByDistrict(DistrictView districtView);
    City save(City city);
    void delete(City city);
}
