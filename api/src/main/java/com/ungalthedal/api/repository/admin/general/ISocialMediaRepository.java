package com.ungalthedal.api.repository.admin.general;

import com.ungalthedal.api.domain.admin.general.SocialMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISocialMediaRepository extends JpaRepository<SocialMedia, Long> {
    SocialMedia getSocialMediaByNme(String nme);
    SocialMedia getSocialMediaById(Long id);
}
