package com.ungalthedal.api.repository.admin.location.region;

import com.ungalthedal.api.domain.admin.location.country.CountryView;
import com.ungalthedal.api.domain.admin.location.region.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRegionRepository extends JpaRepository<Region, Long> {
    Region getRegionByNme(String nme);
    Region getRegionById(Long id);
}
