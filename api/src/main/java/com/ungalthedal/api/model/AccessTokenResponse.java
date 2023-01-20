package com.ungalthedal.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AccessTokenResponse {
    private String firstNme;
    private String lastNme;
    private String displayNme;
    private String mobile;
    private String email;
    private String imgPath;
    private List<CustomRole> roleList;
    private String accessToken;
    private String refreshToken;

    public AccessTokenResponse copy(CustomUserDetails customUserDetails, String accessToken, String refreshToken) {
        this.firstNme = customUserDetails.getFirstNme();
        this.lastNme = customUserDetails.getLastNme();
        this.displayNme = customUserDetails.getDisplayNme();
        this.mobile = customUserDetails.getMobile();
        this.email = customUserDetails.getEmail();
        this.imgPath = customUserDetails.getImgPath();
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.roleList = customUserDetails.getRoles();
        return this;
    }
}
