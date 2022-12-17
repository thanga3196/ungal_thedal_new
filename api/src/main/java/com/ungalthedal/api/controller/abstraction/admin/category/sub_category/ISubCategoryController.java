package com.ungalthedal.api.controller.abstraction.admin.category.sub_category;

import com.ungalthedal.api.domain.admin.category.sub_category.SubCategory;
import com.ungalthedal.api.domain.admin.category.sub_category.SubCategoryView;
import org.springframework.http.ResponseEntity;

public interface ISubCategoryController {
    ResponseEntity<?> getList(SubCategoryView subCategoryView) throws Exception;
    ResponseEntity<?> getById(SubCategoryView subCategoryView) throws Exception;
    ResponseEntity<?> save(SubCategory subCategory) throws Exception;
    ResponseEntity<?> delete(SubCategory subCategory) throws Exception;
}
