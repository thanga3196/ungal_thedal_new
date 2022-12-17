package com.ungalthedal.api.repository.credential;

import com.ungalthedal.api.domain.credential.UserLogin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserLoginRepository extends JpaRepository<UserLogin, Long> {
}
