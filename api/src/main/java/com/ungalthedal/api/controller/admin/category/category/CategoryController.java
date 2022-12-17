package com.ungalthedal.api.controller.admin.category.category;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ungalthedal.api.constant.AlertType;
import com.ungalthedal.api.controller.abstraction.admin.category.category.ICategoryController;
import com.ungalthedal.api.domain.admin.category.category.Category;
import com.ungalthedal.api.domain.admin.category.category.CategoryView;
import com.ungalthedal.api.model.Response;
import com.ungalthedal.api.service.abstraction.admin.category.category.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("admin/category")
@CrossOrigin(origins = "*")
public class CategoryController implements ICategoryController {
    ICategoryService categoryService;
    HttpServletRequest httpServletRequest;
    ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    CategoryController(ICategoryService categoryService, HttpServletRequest httpServletRequest) {
        this.httpServletRequest = httpServletRequest;
        this.categoryService = categoryService;
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    @Override
    @PostMapping(value = "list", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getList(@RequestBody CategoryView categoryView) throws Exception {
        return ResponseEntity.ok(this.categoryService.getList(categoryView));
    }

    @Override
    @PostMapping(value = "save", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> save(@RequestBody Category category) throws Exception {
        Category oldCategory = this.categoryService.getById(category.getId());
        if (oldCategory != null) {
            return ResponseEntity.ok(categoryService.save(category));
        }
        oldCategory = this.categoryService.getByNme(category);
        if (oldCategory != null)
            return ResponseEntity.ok(new Response("Category " + oldCategory.getNme() + " already exists.", AlertType.SUCCESS));
        else return ResponseEntity.ok(categoryService.save(category));
    }

    @Override
    @PostMapping(value = "delete", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> delete(@RequestBody Category category) throws Exception {
        Category category1 = this.categoryService.getById(category.getId());
        if (category1 != null) {
            this.categoryService.delete(category);
            return ResponseEntity.ok(new Response("Category '" + category.getNme() + "' deleted successfully.", AlertType.SUCCESS));
        } else
            return ResponseEntity.ok(new Response("Category '" + category.getNme() + "' not exists.", AlertType.WARNING));
    }

    @Override
    @PostMapping(value = "getById", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getById(@RequestBody CategoryView categoryView) throws Exception {
        return ResponseEntity.ok(this.categoryService.getById(categoryView.getId()));
    }
}

