package com.ungalthedal.api.model;

import com.ungalthedal.api.domain.admin.category.CategoryListView;
import com.ungalthedal.api.domain.admin.category.category.CategoryView;
import com.ungalthedal.api.domain.admin.category.sub_category.SubCategoryView;
import com.ungalthedal.api.domain.admin.location.LocationListView;
import com.ungalthedal.api.domain.admin.location.city.CityView;
import com.ungalthedal.api.domain.admin.location.country.CountryView;
import com.ungalthedal.api.domain.admin.location.district.DistrictView;
import com.ungalthedal.api.domain.admin.location.region.RegionView;
import com.ungalthedal.api.domain.admin.location.state.StateView;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Shared {
    private Long contactCountByReadInd;
}
