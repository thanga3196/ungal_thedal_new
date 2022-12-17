package com.ungalthedal.api.service.abstraction.admin.general;

import com.ungalthedal.api.domain.admin.general.SocialMedia;
import com.ungalthedal.api.domain.admin.general.SocialMediaView;

import java.util.List;

public interface ISocialMediaService {
    List<SocialMediaView> getList(SocialMediaView socialMediaView);

    SocialMedia getById(Long id);

    SocialMedia getByNme(SocialMedia socialMedia);

    SocialMedia save(SocialMedia socialMedia);

    void delete(SocialMedia socialMedia);
}
