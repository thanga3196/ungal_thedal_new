package com.ungalthedal.api.service.abstraction.admin.location.country;

import com.ungalthedal.api.domain.admin.location.country.Country;
import com.ungalthedal.api.domain.admin.location.country.CountryView;
import com.ungalthedal.api.domain.admin.location.region.RegionView;
import com.ungalthedal.api.domain.admin.location.state.StateView;

import java.util.List;

public interface ICountryService {
    List<CountryView> getList(CountryView countryView);
    List<CountryView> getCountryListByRegion(RegionView regionView);
    Country getById(Long id);
    Country getByNmeAndRegionId(Country country);
    Country save(Country country);
    void delete(Country country);
}
