package com.ungalthedal.api.repository.admin.location.country;

import com.ungalthedal.api.domain.admin.location.country.CountryView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICountryViewRepository extends JpaRepository<CountryView, Long> {
    List<CountryView> getCountryViewByRegionId(Long regionId);
}
