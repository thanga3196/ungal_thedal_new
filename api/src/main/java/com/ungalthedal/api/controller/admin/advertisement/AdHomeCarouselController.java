package com.ungalthedal.api.controller.admin.advertisement;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ungalthedal.api.constant.AlertType;
import com.ungalthedal.api.controller.abstraction.admin.advertisement.IAdHomeCarouselController;
import com.ungalthedal.api.domain.admin.advertisement.AdHomeCarousel;
import com.ungalthedal.api.domain.admin.advertisement.AdHomeCarouselView;
import com.ungalthedal.api.model.Response;
import com.ungalthedal.api.service.abstraction.admin.advertisement.IAdHomeCarouselService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("admin/advertisement/home/ad-carousel")
@CrossOrigin(origins = "*")
public class AdHomeCarouselController implements IAdHomeCarouselController {
    IAdHomeCarouselService adHomeCarouselService;
    HttpServletRequest httpServletRequest;
    ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    AdHomeCarouselController(IAdHomeCarouselService adHomeCarouselService, HttpServletRequest httpServletRequest) {
        this.httpServletRequest = httpServletRequest;
        this.adHomeCarouselService = adHomeCarouselService;
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    @Override
    @PostMapping(value = "list", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getList(AdHomeCarouselView adHomeCarouselView) throws Exception {
        return ResponseEntity.ok(this.adHomeCarouselService.getList(adHomeCarouselView));
    }

    @Override
    @PostMapping(value = "getById", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getById(AdHomeCarouselView adHomeCarouselView) throws Exception {
        return ResponseEntity.ok(this.adHomeCarouselService.getById(adHomeCarouselView.getId()));
    }

    @Override
    @PostMapping(value = "save", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> save(AdHomeCarousel adHomeCarousel) throws Exception {
        return ResponseEntity.ok(adHomeCarouselService.save(adHomeCarousel));
    }

    @Override
    @PostMapping(value = "delete", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> delete(AdHomeCarousel adHomeCarousel) throws Exception {
        AdHomeCarousel adHomeCarousel1 = this.adHomeCarouselService.getById(adHomeCarousel.getId());
        if (adHomeCarousel1 != null) {
            this.adHomeCarouselService.delete(adHomeCarousel);
            return ResponseEntity.ok(new Response("Carousel for '" + adHomeCarousel.getBusinessId() + "' deleted successfully.", AlertType.SUCCESS));
        } else
            return ResponseEntity.ok(new Response("Carousel for '" + adHomeCarousel.getBusinessId() + "' not exists.", AlertType.WARNING));
    }
}
