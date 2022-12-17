package com.ungalthedal.api.service.abstraction.admin.location.state;

import com.ungalthedal.api.domain.admin.location.country.CountryView;
import com.ungalthedal.api.domain.admin.location.state.State;
import com.ungalthedal.api.domain.admin.location.state.StateView;

import java.util.List;

public interface IStateService {
    List<StateView> getList(StateView stateView);
    State getById(Long id);
    State getByNmeAndCountryId(State state);
    State save(State state);
    void delete(State state);
    List<StateView> getStateListByCountry(CountryView countryView);
}
