package com.ungalthedal.api.repository.admin.category.sub_category;

import com.ungalthedal.api.domain.admin.category.sub_category.SubCategoryView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISubCategoryViewRepository extends JpaRepository<SubCategoryView, Long> {

}
