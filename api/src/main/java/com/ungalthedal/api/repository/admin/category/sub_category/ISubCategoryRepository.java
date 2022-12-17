package com.ungalthedal.api.repository.admin.category.sub_category;

import com.ungalthedal.api.domain.admin.category.sub_category.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISubCategoryRepository extends JpaRepository<SubCategory, Long> {
    SubCategory getSubCategoryByNmeAndCategoryId(String nme, Long categoryId);
    SubCategory getSubCategoryById(Long id);
}
