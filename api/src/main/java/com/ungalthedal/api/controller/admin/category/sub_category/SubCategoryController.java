package com.ungalthedal.api.controller.admin.category.sub_category;

import com.ungalthedal.api.constant.AlertType;
import com.ungalthedal.api.controller.abstraction.admin.category.sub_category.ISubCategoryController;
import com.ungalthedal.api.domain.admin.category.sub_category.SubCategory;
import com.ungalthedal.api.domain.admin.category.sub_category.SubCategoryView;
import com.ungalthedal.api.model.Response;
import com.ungalthedal.api.service.abstraction.admin.category.sub_category.ISubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("admin/sub-category")
@CrossOrigin(origins = "*")
public class SubCategoryController implements ISubCategoryController {
    ISubCategoryService subCategoryService;

    @Autowired
    SubCategoryController(ISubCategoryService subCategoryService) {
        this.subCategoryService = subCategoryService;
    }

    @Override
    @PostMapping(value = "list", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getList(@RequestBody SubCategoryView subCategoryView) throws Exception {
        return ResponseEntity.ok(this.subCategoryService.getList(subCategoryView));
    }

    @Override
    @PostMapping(value = "save", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> save(@RequestBody SubCategory subCategory) throws Exception {
        SubCategory oldSubCategory = this.subCategoryService.getById(subCategory.getId());
        if (oldSubCategory != null) {
            return ResponseEntity.ok(subCategoryService.save(subCategory));
        }
        oldSubCategory = this.subCategoryService.getByNmeAndCategoryId(subCategory);
        if (oldSubCategory != null)
            return ResponseEntity.ok(new Response("Sub Category " + oldSubCategory.getNme() + " already exists.", AlertType.SUCCESS));
        else return ResponseEntity.ok(subCategoryService.save(subCategory));
    }

    @Override
    @PostMapping(value = "getById", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getById(@RequestBody SubCategoryView subCategoryView) throws Exception {
        return ResponseEntity.ok(this.subCategoryService.getById(subCategoryView.getId()));
    }

    @Override
    @PostMapping(value = "delete", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> delete(@RequestBody SubCategory subCategory) throws Exception {
        SubCategory subCategory1 = this.subCategoryService.getById(subCategory.getId());
        if (subCategory1 != null) {
            this.subCategoryService.delete(subCategory);
            return ResponseEntity.ok(new Response("Sub Category '" + subCategory.getNme() + "' deleted successfully.", AlertType.SUCCESS));
        } else
            return ResponseEntity.ok(new Response("Sub Category '" + subCategory.getNme() + "' not exists.", AlertType.WARNING));
    }
}

