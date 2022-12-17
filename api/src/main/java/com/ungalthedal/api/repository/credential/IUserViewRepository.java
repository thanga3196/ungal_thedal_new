package com.ungalthedal.api.repository.credential;

import com.ungalthedal.api.domain.credential.UserView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserViewRepository extends JpaRepository<UserView, Long> {
    UserView findUserViewByMobile(String mobile);
    UserView findUserViewByEmail(String email);
}
