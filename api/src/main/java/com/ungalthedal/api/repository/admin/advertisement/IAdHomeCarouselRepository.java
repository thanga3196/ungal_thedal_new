package com.ungalthedal.api.repository.admin.advertisement;

import com.ungalthedal.api.domain.admin.advertisement.AdHomeCarousel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAdHomeCarouselRepository extends JpaRepository<AdHomeCarousel, Long> {
    AdHomeCarousel getAdHomeCarouselByNme(String nme);
    AdHomeCarousel getAdHomeCarouselById(Long id);
}
