package com.ungalthedal.api.repository.credential;

import com.ungalthedal.api.domain.credential.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserProfileRepository extends JpaRepository<UserProfile, Long> {
    UserProfile findByEmail(String email);
    UserProfile findByMobile(String mobile);
}
