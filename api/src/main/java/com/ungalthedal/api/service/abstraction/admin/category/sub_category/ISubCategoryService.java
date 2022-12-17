package com.ungalthedal.api.service.abstraction.admin.category.sub_category;

import com.ungalthedal.api.domain.admin.category.sub_category.SubCategory;
import com.ungalthedal.api.domain.admin.category.sub_category.SubCategoryView;

import java.util.List;

public interface ISubCategoryService {
    List<SubCategoryView> getList(SubCategoryView subCategoryView);

    SubCategory getById(Long id);

    SubCategory getByNmeAndCategoryId(SubCategory subCategory);

    SubCategory save(SubCategory subCategory);

    void delete(SubCategory subCategory);
}
