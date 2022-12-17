package com.ungalthedal.api.service.admin.general;

import com.ungalthedal.api.domain.admin.general.SocialMedia;
import com.ungalthedal.api.domain.admin.general.SocialMediaView;
import com.ungalthedal.api.repository.admin.general.ISocialMediaRepository;
import com.ungalthedal.api.repository.admin.general.ISocialMediaViewRepository;
import com.ungalthedal.api.service.abstraction.admin.general.ISocialMediaService;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SocialMediaService implements ISocialMediaService {

    ISocialMediaRepository socialMediaRepository;
    ISocialMediaViewRepository socialMediaViewRepository;

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    SocialMediaService(ISocialMediaRepository socialMediaRepository, ISocialMediaViewRepository socialMediaViewRepository) {
        this.socialMediaRepository = socialMediaRepository;
        this.socialMediaViewRepository = socialMediaViewRepository;
    }

    @Override
    public List<SocialMediaView> getList(SocialMediaView socialMediaView) {
        Session session = entityManager.unwrap(Session.class);
        CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
        CriteriaQuery<SocialMediaView> criteriaQuery = criteriaBuilder.createQuery(SocialMediaView.class);
        Root<SocialMediaView> root = criteriaQuery.from(SocialMediaView.class);
        if ((socialMediaView.getNme() == null || socialMediaView.getNme().trim().length() < 1) && socialMediaView.getActive() == null)
            criteriaQuery.select(root);
        if (socialMediaView.getNme() != null && socialMediaView.getNme().trim().length() > 0)
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("nme"), socialMediaView.getNme()));
        if (socialMediaView.getActive() != null)
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("active"), socialMediaView.getActive()));
        return session.createQuery(criteriaQuery).list().stream().sorted(Comparator.comparing(SocialMediaView::getNme)).collect(Collectors.toList());
    }

    @Override
    public SocialMedia getById(Long id) {
        return this.socialMediaRepository.getSocialMediaById(id);
    }

    @Override
    public SocialMedia getByNme(SocialMedia socialMedia) {
        return this.socialMediaRepository.getSocialMediaByNme(socialMedia.getNme());
    }

    @Override
    public SocialMedia save(SocialMedia socialMedia) {
        return this.socialMediaRepository.save(socialMedia);
    }

    @Override
    public void delete(SocialMedia socialMedia) {
        this.socialMediaRepository.delete(socialMedia);
    }
}
