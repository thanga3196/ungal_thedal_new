package com.ungalthedal.api.service.abstraction;

import com.ungalthedal.api.domain.admin.category.CategoryListView;
import com.ungalthedal.api.domain.admin.category.category.CategoryView;
import com.ungalthedal.api.domain.admin.category.sub_category.SubCategoryView;
import com.ungalthedal.api.domain.admin.location.LocationListView;
import com.ungalthedal.api.domain.admin.location.city.CityView;
import com.ungalthedal.api.domain.admin.location.country.CountryView;
import com.ungalthedal.api.domain.admin.location.district.DistrictView;
import com.ungalthedal.api.domain.admin.location.region.RegionView;
import com.ungalthedal.api.domain.admin.location.state.StateView;
import com.ungalthedal.api.domain.shared.IconListView;
import com.ungalthedal.api.model.*;

import java.util.List;

public interface IApiService {
    AccessTokenResponse login(LoginRequest loginRequest);
    RegisterResponse register(RegisterRequest registerRequest);
    Status getStatus();
    List<LocationListView> getAllLocationList();
    List<CategoryListView> getAllCategoryList();
    List<CityView> getAllCity();
    List<DistrictView> getAllDistrict();
    List<StateView> getAllState();
    List<CountryView> getAllCountry();
    List<RegionView> getAllRegion();
    List<CategoryView> getAllCategory();
    List<SubCategoryView> getAllSubCategory();
    List<IconListView> getAllIconList();
    Search getSearchDropDownDetails();
    Shared getSharedDetails();
}
