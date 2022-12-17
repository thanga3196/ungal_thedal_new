package com.ungalthedal.api.service.credential;

import com.ungalthedal.api.domain.credential.UserView;
import com.ungalthedal.api.model.CustomUserDetails;
import com.ungalthedal.api.repository.credential.IUserViewRepository;
import com.ungalthedal.api.service.abstraction.credential.ICustomUserDetailsService;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class CustomUserDetailsService implements ICustomUserDetailsService {

    private final IUserViewRepository userViewRepository;

    @Autowired
    public CustomUserDetailsService(IUserViewRepository userViewRepository) {
        this.userViewRepository = userViewRepository;
    }

    @Override
    public CustomUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return new CustomUserDetails("Thangavel", "Ayyasamy", "Thangavel Ayyasamy", "indianthanga@gmail.com", "+919042079408", "", false, false, false, true, List.of());
    }

    public CustomUserDetails getCustomerUserDetailsFromUserName(String userName) {
        CustomUserDetails customUserDetails = null;
        UserView userView = null;
        if (!Strings.isEmpty(userName)) {
            userView = userViewRepository.findUserViewByEmail(userName);
            if (Objects.isNull(userView)) {
                userView = userViewRepository.findUserViewByMobile(userName);
            }
        }
        if (!Objects.isNull(userView)) {
            customUserDetails = CustomUserDetails.copy(userView);
        }
        return customUserDetails;
    }
}
