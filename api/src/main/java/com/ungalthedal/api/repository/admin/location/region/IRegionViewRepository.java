package com.ungalthedal.api.repository.admin.location.region;

import com.ungalthedal.api.domain.admin.location.region.RegionView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface IRegionViewRepository extends JpaRepository<RegionView, Long> {

}
