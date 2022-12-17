package com.ungalthedal.api.service.admin.location.city;

import com.ungalthedal.api.domain.admin.location.city.City;
import com.ungalthedal.api.domain.admin.location.city.CityView;
import com.ungalthedal.api.domain.admin.location.district.DistrictView;
import com.ungalthedal.api.repository.admin.location.city.ICityRepository;
import com.ungalthedal.api.repository.admin.location.city.ICityViewRepository;
import com.ungalthedal.api.service.abstraction.admin.location.city.ICityService;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.time.Instant;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CityService implements ICityService {
    ICityViewRepository cityViewRepository;
    ICityRepository cityRepository;

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    CityService(ICityViewRepository cityViewRepository, ICityRepository cityRepository) {
        this.cityViewRepository = cityViewRepository;
        this.cityRepository = cityRepository;
    }

    @Override
    public List<CityView> getList(CityView cityView) {
        Session session = entityManager.unwrap(Session.class);
        CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
        CriteriaQuery<CityView> criteriaQuery = criteriaBuilder.createQuery(CityView.class);
        Root<CityView> root = criteriaQuery.from(CityView.class);
        if ((cityView.getNme() == null || cityView.getNme().trim().length() < 1) && cityView.getDistrictId() == null && cityView.getActive() == null)
            criteriaQuery.select(root);
        if (cityView.getNme() != null && cityView.getNme().trim().length() > 0)
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("nme"), cityView.getNme()));
        if (cityView.getDistrictId() != null)
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("districtId"), cityView.getDistrictId()));
        if (cityView.getActive() != null)
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("active"), cityView.getActive()));
        return session.createQuery(criteriaQuery).list().stream().sorted(Comparator.comparing(CityView::getNme)).collect(Collectors.toList());
    }

    @Override
    public City getById(Long id) {
        return cityRepository.getCityById(id);
    }

    @Override
    public City getByNmeAndDistrictId(City city) {
        return this.cityRepository.getCityByNmeAndDistrictId(city.getNme(), city.getDistrictId());
    }

    @Override
    public List<CityView> getCityListByDistrict(DistrictView districtView) {
        return this.cityViewRepository.getCityViewByDistrictId(districtView.getId());
    }

    @Override
    public City save(City city) {
        city.setDateCreated(Date.from(Instant.now()));
        city.setLastUpdated(Date.from(Instant.now()));
        return this.cityRepository.save(city);
    }

    @Override
    public void delete(City city) {
        this.cityRepository.delete(city);
    }
}
