package com.ungalthedal.api.controller.abstraction.admin.category.category;

import com.ungalthedal.api.domain.admin.category.category.Category;
import com.ungalthedal.api.domain.admin.category.category.CategoryView;
import org.springframework.http.ResponseEntity;

public interface ICategoryController {
    ResponseEntity<?> getList(CategoryView categoryView) throws Exception;
    ResponseEntity<?> getById(CategoryView categoryView) throws Exception;
    ResponseEntity<?> save(Category category) throws Exception;
    ResponseEntity<?> delete(Category category) throws Exception;
}
