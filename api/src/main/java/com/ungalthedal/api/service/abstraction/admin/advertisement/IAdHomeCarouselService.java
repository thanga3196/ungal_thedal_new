package com.ungalthedal.api.service.abstraction.admin.advertisement;

import com.ungalthedal.api.domain.admin.advertisement.AdHomeCarousel;
import com.ungalthedal.api.domain.admin.advertisement.AdHomeCarouselView;

import java.util.List;

public interface IAdHomeCarouselService {
    List<AdHomeCarouselView> getList(AdHomeCarouselView adHomeCarouselView);
    AdHomeCarousel getById(Long id);
    AdHomeCarousel getByNme(AdHomeCarousel adHomeCarousel);
    AdHomeCarousel save(AdHomeCarousel adHomeCarousel);
    void delete(AdHomeCarousel adHomeCarousel);
}
