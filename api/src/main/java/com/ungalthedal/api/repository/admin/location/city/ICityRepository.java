package com.ungalthedal.api.repository.admin.location.city;

import com.ungalthedal.api.domain.admin.location.city.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICityRepository extends JpaRepository<City, Long> {
    City getCityByNmeAndDistrictId(String nme, Long districtId);
    City getCityById(Long id);
}
