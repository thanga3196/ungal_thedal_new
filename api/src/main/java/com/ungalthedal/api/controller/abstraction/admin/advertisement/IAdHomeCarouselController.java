package com.ungalthedal.api.controller.abstraction.admin.advertisement;

import com.ungalthedal.api.domain.admin.advertisement.AdHomeCarousel;
import com.ungalthedal.api.domain.admin.advertisement.AdHomeCarouselView;
import org.springframework.http.ResponseEntity;

public interface IAdHomeCarouselController {
    ResponseEntity<?> getList(AdHomeCarouselView adCarouselView) throws Exception;
    ResponseEntity<?> getById(AdHomeCarouselView adCarouselView) throws Exception;
    ResponseEntity<?> save(AdHomeCarousel adCarousel) throws Exception;
    ResponseEntity<?> delete(AdHomeCarousel adCarousel) throws Exception;
}
