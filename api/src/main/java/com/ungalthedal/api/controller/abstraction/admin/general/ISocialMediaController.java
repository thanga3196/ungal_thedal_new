package com.ungalthedal.api.controller.abstraction.admin.general;

import com.ungalthedal.api.domain.admin.general.SocialMedia;
import com.ungalthedal.api.domain.admin.general.SocialMediaView;
import org.springframework.http.ResponseEntity;

public interface ISocialMediaController {
    ResponseEntity<?> getList(SocialMediaView socialMediaView) throws Exception;
    ResponseEntity<?> getById(SocialMediaView socialMediaView) throws Exception;
    ResponseEntity<?> save(SocialMedia socialMedia) throws Exception;
    ResponseEntity<?> delete(SocialMedia socialMedia) throws Exception;
}
