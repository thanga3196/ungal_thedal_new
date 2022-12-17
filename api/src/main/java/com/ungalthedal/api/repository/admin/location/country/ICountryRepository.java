package com.ungalthedal.api.repository.admin.location.country;

import com.ungalthedal.api.domain.admin.location.country.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICountryRepository extends JpaRepository<Country, Long> {
    Country getCountryByNmeAndRegionId(String nme, Long regionId);
    Country getCountryById(Long id);
}
