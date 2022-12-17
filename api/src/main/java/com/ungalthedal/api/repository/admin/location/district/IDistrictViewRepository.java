package com.ungalthedal.api.repository.admin.location.district;

import com.ungalthedal.api.domain.admin.location.district.DistrictView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IDistrictViewRepository extends JpaRepository<DistrictView, Long> {
    List<DistrictView> getDistrictViewByStateId(Long stateId);
}
