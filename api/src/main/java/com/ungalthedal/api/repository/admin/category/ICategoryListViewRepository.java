package com.ungalthedal.api.repository.admin.category;

import com.ungalthedal.api.domain.admin.category.CategoryListView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICategoryListViewRepository extends JpaRepository<CategoryListView, Long> {

}
