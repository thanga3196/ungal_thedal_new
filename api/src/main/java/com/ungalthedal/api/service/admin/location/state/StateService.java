package com.ungalthedal.api.service.admin.location.state;

import com.ungalthedal.api.domain.admin.location.country.CountryView;
import com.ungalthedal.api.domain.admin.location.state.State;
import com.ungalthedal.api.domain.admin.location.state.StateView;
import com.ungalthedal.api.repository.admin.location.state.IStateRepository;
import com.ungalthedal.api.repository.admin.location.state.IStateViewRepository;
import com.ungalthedal.api.service.abstraction.admin.location.state.IStateService;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.sql.Date;
import java.time.Instant;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StateService implements IStateService {

    IStateViewRepository stateViewRepository;
    IStateRepository stateRepository;

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    StateService(IStateViewRepository stateViewRepository, IStateRepository stateRepository) {
        this.stateViewRepository = stateViewRepository;
        this.stateRepository = stateRepository;
    }

    @Override
    public List<StateView> getList(StateView stateView) {
        Session session = entityManager.unwrap(Session.class);
        CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
        CriteriaQuery<StateView> criteriaQuery = criteriaBuilder.createQuery(StateView.class);
        Root<StateView> root = criteriaQuery.from(StateView.class);
        if ((stateView.getNme() == null || stateView.getNme().trim().length() < 1) && stateView.getCountryId() == null && stateView.getActive() == null)
            criteriaQuery.select(root);
        if (stateView.getNme() != null && stateView.getNme().trim().length() > 0)
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("nme"), stateView.getNme()));
        if (stateView.getCountryId() != null)
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("countryId"), stateView.getCountryId()));
        if (stateView.getActive() != null)
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("active"), stateView.getActive()));
        return session.createQuery(criteriaQuery).list().stream().sorted(Comparator.comparing(StateView::getNme)).collect(Collectors.toList());
    }

    @Override
    public State getById(Long id) {
        return stateRepository.getStateById(id);
    }

    @Override
    public State getByNmeAndCountryId(State state) {
        return this.stateRepository.getStateByNmeAndCountryId(state.getNme(), state.getCountryId());
    }

    @Override
    public State save(State state) {
        state.setDateCreated(Date.from(Instant.now()));
        state.setLastUpdated(Date.from(Instant.now()));
        return this.stateRepository.save(state);
    }

    @Override
    public void delete(State state) {
        this.stateRepository.delete(state);
    }

    @Override
    public List<StateView> getStateListByCountry(CountryView countryView) {
        return this.stateViewRepository.getStateViewByCountryId(countryView.getId());
    }
}
