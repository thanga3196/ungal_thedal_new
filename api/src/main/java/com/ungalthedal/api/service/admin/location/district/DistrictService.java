package com.ungalthedal.api.service.admin.location.district;

import com.ungalthedal.api.domain.admin.location.district.District;
import com.ungalthedal.api.domain.admin.location.district.DistrictView;
import com.ungalthedal.api.domain.admin.location.state.StateView;
import com.ungalthedal.api.repository.admin.location.district.IDistrictRepository;
import com.ungalthedal.api.repository.admin.location.district.IDistrictViewRepository;
import com.ungalthedal.api.service.abstraction.admin.location.district.IDistrictService;
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
public class DistrictService implements IDistrictService {

    IDistrictViewRepository districtViewRepository;
    IDistrictRepository districtRepository;

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    DistrictService(IDistrictViewRepository districtViewRepository, IDistrictRepository districtRepository) {
        this.districtViewRepository = districtViewRepository;
        this.districtRepository = districtRepository;
    }


    @Override
    public List<DistrictView> getList(DistrictView districtView) {
        Session session = entityManager.unwrap(Session.class);
        CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
        CriteriaQuery<DistrictView> criteriaQuery = criteriaBuilder.createQuery(DistrictView.class);
        Root<DistrictView> root = criteriaQuery.from(DistrictView.class);
        if ((districtView.getNme() == null || districtView.getNme().trim().length() < 1) && districtView.getStateId() == null && districtView.getActive() == null)
            criteriaQuery.select(root);
        if (districtView.getNme() != null && districtView.getNme().trim().length() > 0)
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("nme"), districtView.getNme()));
        if (districtView.getStateId() != null)
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("stateId"), districtView.getStateId()));
        if (districtView.getActive() != null)
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("active"), districtView.getActive()));
        return session.createQuery(criteriaQuery).list().stream().sorted(Comparator.comparing(DistrictView::getNme)).collect(Collectors.toList());
    }

    @Override
    public District getById(Long id) {
        return districtRepository.getDistrictById(id);
    }

    @Override
    public District getByNmeAndStateId(District district) {
        return this.districtRepository.getDistrictByNmeAndStateId(district.getNme(), district.getStateId());
    }

    @Override
    public District save(District district) {
        district.setDateCreated(Date.from(Instant.now()));
        district.setLastUpdated(Date.from(Instant.now()));
        return this.districtRepository.save(district);
    }

    @Override
    public void delete(District district) {
        this.districtRepository.delete(district);
    }

    @Override
    public List<DistrictView> getDistrictListByState(StateView stateView) {
        return this.districtViewRepository.getDistrictViewByStateId(stateView.getId());
    }
}
