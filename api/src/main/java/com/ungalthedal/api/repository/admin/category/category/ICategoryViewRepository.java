package com.ungalthedal.api.repository.admin.category.category;

import com.ungalthedal.api.domain.admin.category.category.CategoryView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ICategoryViewRepository extends JpaRepository<CategoryView, Long> {

}
