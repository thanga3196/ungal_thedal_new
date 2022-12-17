package com.ungalthedal.api.service.abstraction.admin.location.district;

import com.ungalthedal.api.domain.admin.location.district.District;
import com.ungalthedal.api.domain.admin.location.district.DistrictView;
import com.ungalthedal.api.domain.admin.location.state.StateView;

import java.util.List;

public interface IDistrictService {
    List<DistrictView> getList(DistrictView districtView);
    District getById(Long id);
    District getByNmeAndStateId(District district);
    District save(District district);
    void delete(District district);
    List<DistrictView> getDistrictListByState(StateView stateView);
}
