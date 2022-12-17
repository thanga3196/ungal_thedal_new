package com.ungalthedal.api.service.admin.category.category;

import com.ungalthedal.api.domain.admin.category.category.Category;
import com.ungalthedal.api.domain.admin.category.category.CategoryView;
import com.ungalthedal.api.repository.admin.category.category.ICategoryRepository;
import com.ungalthedal.api.repository.admin.category.category.ICategoryViewRepository;
import com.ungalthedal.api.service.abstraction.admin.category.category.ICategoryService;
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
public class CategoryService implements ICategoryService {

    ICategoryViewRepository categoryViewRepository;
    ICategoryRepository categoryRepository;

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    CategoryService(ICategoryViewRepository categoryViewRepository, ICategoryRepository categoryRepository) {
        this.categoryViewRepository = categoryViewRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<CategoryView> getList(CategoryView categoryView) {
        Session session = entityManager.unwrap(Session.class);
        CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
        CriteriaQuery<CategoryView> criteriaQuery = criteriaBuilder.createQuery(CategoryView.class);
        Root<CategoryView> root = criteriaQuery.from(CategoryView.class);
        if ((categoryView.getNme() == null || categoryView.getNme().trim().length() < 1) && categoryView.getActive() == null)
            criteriaQuery.select(root);
        if (categoryView.getNme() != null && categoryView.getNme().trim().length() > 0)
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("nme"), categoryView.getNme()));
        if (categoryView.getActive() != null)
            criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("active"), categoryView.getActive()));
        return session.createQuery(criteriaQuery).list().stream().sorted(Comparator.comparing(CategoryView::getNme)).collect(Collectors.toList());
    }

    @Override
    public Category getById(Long id) {
        return this.categoryRepository.getCategoryById(id);
    }

    @Override
    public Category getByNme(Category category) {
        return this.categoryRepository.getCategoryByNme(category.getNme());
    }

    @Override
    public Category save(Category category) {
        category.setDateCreated(Date.from(Instant.now()));
        category.setLastUpdated(Date.from(Instant.now()));
        return this.categoryRepository.save(category);
    }

    @Override
    public void delete(Category category) {
        this.categoryRepository.delete(category);
    }
}
