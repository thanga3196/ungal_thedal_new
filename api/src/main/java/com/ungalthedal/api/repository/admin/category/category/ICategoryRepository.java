package com.ungalthedal.api.repository.admin.category.category;

import com.ungalthedal.api.domain.admin.category.category.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICategoryRepository extends JpaRepository<Category, Long> {
    Category getCategoryByNme(String nme);
    Category getCategoryById(Long id);
}
