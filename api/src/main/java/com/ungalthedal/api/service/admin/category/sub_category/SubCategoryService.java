package com.ungalthedal.api.service.admin.category.sub_category;

import com.ungalthedal.api.domain.admin.category.category.CategoryView;
import com.ungalthedal.api.domain.admin.category.sub_category.SubCategory;
import com.ungalthedal.api.domain.admin.category.sub_category.SubCategoryView;
import com.ungalthedal.api.repository.admin.category.sub_category.ISubCategoryRepository;
import com.ungalthedal.api.repository.admin.category.sub_category.ISubCategoryViewRepository;
import com.ungalthedal.api.service.abstraction.admin.category.sub_category.ISubCategoryService;
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
public class SubCategoryService implements ISubCategoryService {
    ISubCategoryViewRepository subCategoryViewRepository;
    ISubCategoryRepository subCategoryRepository;

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    SubCategoryService(ISubCategoryViewRepository subCategoryViewRepository, ISubCategoryRepository subCategoryRepository) {
        this.subCategoryViewRepository = subCategoryViewRepository;
        this.subCategoryRepository = subCategoryRepository;
    }

    @Override
    public List<SubCategoryView> getList(SubCategoryView subCategoryView) {
        Session session = entityManager.unwrap(Session.class);
        CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
        CriteriaQuery<SubCategoryView> criteriaQuery = criteriaBuilder.createQuery(SubCategoryView.class);
        Root<SubCategoryView> root = criteriaQuery.from(SubCategoryView.class);
        if ((subCategoryView.getNme() == null || subCategoryView.getNme().trim().length() < 1) && subCategoryView.getCategoryId() == null && subCategoryView.getActive() == null)
            criteriaQuery.select(root);
        if (subCategoryView.getNme() != null && subCategoryView.getNme().trim().length() > 0)
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("nme"), subCategoryView.getNme()));
        if (subCategoryView.getCategoryId() != null)
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("categoryId"), subCategoryView.getCategoryId()));
        if (subCategoryView.getActive() != null)
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("active"), subCategoryView.getActive()));
        return session.createQuery(criteriaQuery).list().stream().sorted(Comparator.comparing(SubCategoryView::getNme)).collect(Collectors.toList());
    }

    @Override
    public SubCategory getById(Long id) {
        return subCategoryRepository.getSubCategoryById(id);
    }

    @Override
    public SubCategory getByNmeAndCategoryId(SubCategory subCategory) {
        return this.subCategoryRepository.getSubCategoryByNmeAndCategoryId(subCategory.getNme(), subCategory.getCategoryId());
    }

    @Override
    public SubCategory save(SubCategory subCategory) {
        subCategory.setDateCreated(Date.from(Instant.now()));
        subCategory.setLastUpdated(Date.from(Instant.now()));
        return this.subCategoryRepository.save(subCategory);
    }

    @Override
    public void delete(SubCategory subCategory) {
        this.subCategoryRepository.delete(subCategory);
    }
}
