package com.ungalthedal.api.repository.admin.location.state;

import com.ungalthedal.api.domain.admin.location.state.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IStateRepository extends JpaRepository<State, Long> {
    State getStateByNmeAndCountryId(String nme, Long countryId);
    State getStateById(Long id);
}
