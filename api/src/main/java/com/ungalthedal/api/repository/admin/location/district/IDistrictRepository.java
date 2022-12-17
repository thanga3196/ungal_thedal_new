package com.ungalthedal.api.repository.admin.location.district;

import com.ungalthedal.api.domain.admin.location.district.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IDistrictRepository extends JpaRepository<District, Long> {
    District getDistrictByNmeAndStateId(String nme, Long stateId);
    District getDistrictById(Long id);
}
