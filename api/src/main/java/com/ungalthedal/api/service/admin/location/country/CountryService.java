package com.ungalthedal.api.service.admin.location.country;

import com.ungalthedal.api.domain.admin.location.country.Country;
import com.ungalthedal.api.domain.admin.location.country.CountryView;
import com.ungalthedal.api.domain.admin.location.region.RegionView;
import com.ungalthedal.api.repository.admin.location.country.ICountryRepository;
import com.ungalthedal.api.repository.admin.location.country.ICountryViewRepository;
import com.ungalthedal.api.service.abstraction.admin.location.country.ICountryService;
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
public class CountryService implements ICountryService {

    ICountryViewRepository countryViewRepository;
    ICountryRepository countryRepository;

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    CountryService(ICountryViewRepository countryViewRepository, ICountryRepository countryRepository) {
        this.countryViewRepository = countryViewRepository;
        this.countryRepository = countryRepository;
    }

    @Override
    public List<CountryView> getList(CountryView countryView) {
        Session session = entityManager.unwrap(Session.class);
        CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
        CriteriaQuery<CountryView> criteriaQuery = criteriaBuilder.createQuery(CountryView.class);
        Root<CountryView> root = criteriaQuery.from(CountryView.class);
        if ((countryView.getNme() == null || countryView.getNme().trim().length() < 1) && countryView.getRegionId() == null && countryView.getActive() == null)
            criteriaQuery.select(root);
        if (countryView.getNme() != null && countryView.getNme().trim().length() > 0)
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("nme"), countryView.getNme()));
        if (countryView.getRegionId() != null)
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("regionId"), countryView.getRegionId()));
        if (countryView.getActive() != null)
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("active"), countryView.getActive()));
        return session.createQuery(criteriaQuery).list().stream().sorted(Comparator.comparing(CountryView::getNme)).collect(Collectors.toList());
    }

    @Override
    public List<CountryView> getCountryListByRegion(RegionView regionView) {
        return this.countryViewRepository.getCountryViewByRegionId(regionView.getId());
    }

    @Override
    public Country getById(Long id) {
        return countryRepository.getCountryById(id);
    }

    @Override
    public Country getByNmeAndRegionId(Country country) {
        return this.countryRepository.getCountryByNmeAndRegionId(country.getNme(), country.getRegionId());
    }

    @Override
    public Country save(Country country) {
        country.setDateCreated(Date.from(Instant.now()));
        country.setLastUpdated(Date.from(Instant.now()));
        return this.countryRepository.save(country);
    }

    @Override
    public void delete(Country country) {
        this.countryRepository.delete(country);
    }
}
