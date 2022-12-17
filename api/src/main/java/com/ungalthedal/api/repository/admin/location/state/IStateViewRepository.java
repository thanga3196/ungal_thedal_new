package com.ungalthedal.api.repository.admin.location.state;

import com.ungalthedal.api.domain.admin.location.state.StateView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IStateViewRepository extends JpaRepository<StateView, Long> {
    List<StateView> getStateViewByCountryId(Long countryId);
}
