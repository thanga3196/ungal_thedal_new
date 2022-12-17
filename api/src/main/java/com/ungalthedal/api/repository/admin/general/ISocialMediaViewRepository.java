package com.ungalthedal.api.repository.admin.general;

import com.ungalthedal.api.domain.admin.general.SocialMediaView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISocialMediaViewRepository extends JpaRepository<SocialMediaView, Long> {
}
