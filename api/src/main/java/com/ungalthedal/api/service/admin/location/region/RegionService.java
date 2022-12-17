package com.ungalthedal.api.service.admin.location.region;

import com.ungalthedal.api.domain.admin.location.country.CountryView;
import com.ungalthedal.api.domain.admin.location.region.Region;
import com.ungalthedal.api.domain.admin.location.region.RegionView;
import com.ungalthedal.api.repository.admin.location.region.IRegionRepository;
import com.ungalthedal.api.repository.admin.location.region.IRegionViewRepository;
import com.ungalthedal.api.service.abstraction.admin.location.country.ICountryService;
import com.ungalthedal.api.service.abstraction.admin.location.region.IRegionService;
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
public class RegionService implements IRegionService {

    IRegionViewRepository regionViewRepository;
    IRegionRepository regionRepository;

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    RegionService(IRegionViewRepository regionViewRepository, IRegionRepository regionRepository) {
        this.regionViewRepository = regionViewRepository;
        this.regionRepository = regionRepository;
    }

    @Override
    public List<RegionView> getList(RegionView regionView) {
        Session session = entityManager.unwrap(Session.class);
        CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
        CriteriaQuery<RegionView> criteriaQuery = criteriaBuilder.createQuery(RegionView.class);
        Root<RegionView> root = criteriaQuery.from(RegionView.class);
        if ((regionView.getNme() == null || regionView.getNme().trim().length() < 1) && regionView.getActive() == null)
            criteriaQuery.select(root);
        if (regionView.getNme() != null && regionView.getNme().trim().length() > 0)
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("nme"), regionView.getNme()));
        if (regionView.getActive() != null)
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("active"), regionView.getActive()));
        return session.createQuery(criteriaQuery).list().stream().sorted(Comparator.comparing(RegionView::getNme)).collect(Collectors.toList());
    }

    @Override
    public Region getById(Long id) {
        return regionRepository.getRegionById(id);
    }

    @Override
    public Region getByNme(Region region) {
        return this.regionRepository.getRegionByNme(region.getNme());
    }

    @Override
    public Region save(Region region) {
        region.setDateCreated(Date.from(Instant.now()));
        region.setLastUpdated(Date.from(Instant.now()));
        return this.regionRepository.save(region);
    }

    @Override
    public void delete(Region region) {
        this.regionRepository.delete(region);
    }
}
