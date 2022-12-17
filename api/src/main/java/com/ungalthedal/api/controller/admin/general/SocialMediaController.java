package com.ungalthedal.api.controller.admin.general;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ungalthedal.api.constant.AlertType;
import com.ungalthedal.api.controller.abstraction.admin.general.ISocialMediaController;
import com.ungalthedal.api.domain.admin.general.SocialMedia;
import com.ungalthedal.api.domain.admin.general.SocialMediaView;
import com.ungalthedal.api.model.Response;
import com.ungalthedal.api.service.abstraction.admin.general.ISocialMediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("admin/social-media")
@CrossOrigin(origins = "*")
public class SocialMediaController implements ISocialMediaController {
    ISocialMediaService socialMediaService;
    HttpServletRequest httpServletRequest;
    ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    SocialMediaController(ISocialMediaService socialMediaService, HttpServletRequest httpServletRequest) {
        this.httpServletRequest = httpServletRequest;
        this.socialMediaService = socialMediaService;
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    @Override
    @PostMapping(value = "list", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getList(@RequestBody SocialMediaView socialMediaView) throws Exception {
        return ResponseEntity.ok(this.socialMediaService.getList(socialMediaView));
    }

    @Override
    @PostMapping(value = "save", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> save(@RequestBody SocialMedia socialMedia) throws Exception {
        SocialMedia oldSocialMedia = this.socialMediaService.getById(socialMedia.getId());
        if (oldSocialMedia != null) {
            return ResponseEntity.ok(socialMediaService.save(socialMedia));
        }
        oldSocialMedia = this.socialMediaService.getByNme(socialMedia);
        if (oldSocialMedia != null)
            return ResponseEntity.ok(new Response("SocialMedia " + oldSocialMedia.getNme() + " already exists.", AlertType.SUCCESS));
        else return ResponseEntity.ok(socialMediaService.save(socialMedia));
    }

    @Override
    @PostMapping(value = "delete", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> delete(@RequestBody SocialMedia socialMedia) throws Exception {
        SocialMedia socialMedia1 = this.socialMediaService.getById(socialMedia.getId());
        if (socialMedia1 != null) {
            this.socialMediaService.delete(socialMedia);
            return ResponseEntity.ok(new Response("SocialMedia '" + socialMedia.getNme() + "' deleted successfully.", AlertType.SUCCESS));
        } else
            return ResponseEntity.ok(new Response("SocialMedia '" + socialMedia.getNme() + "' not exists.", AlertType.WARNING));
    }

    @Override
    @PostMapping(value = "getById", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getById(@RequestBody SocialMediaView socialMediaView) throws Exception {
        return ResponseEntity.ok(this.socialMediaService.getById(socialMediaView.getId()));
    }
}

