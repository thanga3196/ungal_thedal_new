package com.ungalthedal.api.repository.admin.advertisement;

import com.ungalthedal.api.domain.admin.advertisement.AdHomeCarouselView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAdHomeCarouselViewRepository extends JpaRepository<AdHomeCarouselView, Long> {
}
