package com.ungalthedal.api.service.admin.advertisement;

import com.ungalthedal.api.domain.admin.advertisement.AdHomeCarousel;
import com.ungalthedal.api.domain.admin.advertisement.AdHomeCarouselView;
import com.ungalthedal.api.repository.admin.advertisement.IAdHomeCarouselRepository;
import com.ungalthedal.api.repository.admin.advertisement.IAdHomeCarouselViewRepository;
import com.ungalthedal.api.service.abstraction.admin.advertisement.IAdHomeCarouselService;
import org.hibernate.Session;
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
public class AdHomeCarouselService implements IAdHomeCarouselService {

    IAdHomeCarouselRepository adHomeCarouselRepository;
    IAdHomeCarouselViewRepository adHomeCarouselViewRepository;

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<AdHomeCarouselView> getList(AdHomeCarouselView adHomeCarouselView) {
        Session session = entityManager.unwrap(Session.class);
        CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
        CriteriaQuery<AdHomeCarouselView> criteriaQuery = criteriaBuilder.createQuery(AdHomeCarouselView.class);
        Root<AdHomeCarouselView> root = criteriaQuery.from(AdHomeCarouselView.class);
        if (adHomeCarouselView.getBusinessId() == null && adHomeCarouselView.getActive() == null)
            criteriaQuery.select(root);
        if (adHomeCarouselView.getBusinessId() != null)
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("businessId"), adHomeCarouselView.getBusinessId()));
        if (adHomeCarouselView.getActive() != null)
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("active"), adHomeCarouselView.getActive()));
        return session.createQuery(criteriaQuery).list().stream().sorted(Comparator.comparing(AdHomeCarouselView::getBusinessId)).collect(Collectors.toList());
    }

    @Override
    public AdHomeCarousel getById(Long id) {
        return adHomeCarouselRepository.getAdHomeCarouselById(id);
    }

    @Override
    public AdHomeCarousel getByNme(AdHomeCarousel adHomeCarousel) {
        return this.adHomeCarouselRepository.getAdHomeCarouselByNme(adHomeCarousel.getNme());
    }

    @Override
    public AdHomeCarousel save(AdHomeCarousel adHomeCarousel) {
        adHomeCarousel.setDateCreated(Date.from(Instant.now()));
        adHomeCarousel.setLastUpdated(Date.from(Instant.now()));
        return this.adHomeCarouselRepository.save(adHomeCarousel);
    }

    @Override
    public void delete(AdHomeCarousel adHomeCarousel) {
        this.adHomeCarouselRepository.delete(adHomeCarousel);
    }
}
