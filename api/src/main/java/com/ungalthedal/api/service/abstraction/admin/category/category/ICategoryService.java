package com.ungalthedal.api.service.abstraction.admin.category.category;

import com.ungalthedal.api.domain.admin.category.category.Category;
import com.ungalthedal.api.domain.admin.category.category.CategoryView;

import java.util.List;

public interface ICategoryService {
    List<CategoryView> getList(CategoryView categoryView);

    Category getById(Long id);

    Category getByNme(Category category);

    Category save(Category category);

    void delete(Category category);
}
