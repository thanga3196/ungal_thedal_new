package com.ungalthedal.api.repository.admin.location.city;

import com.ungalthedal.api.domain.admin.location.city.CityView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICityViewRepository extends JpaRepository<CityView, Long> {
    List<CityView> getCityViewByDistrictId(Long districtId);
}
