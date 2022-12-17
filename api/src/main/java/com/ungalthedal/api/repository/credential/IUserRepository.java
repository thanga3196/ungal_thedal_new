package com.ungalthedal.api.repository.credential;

import com.ungalthedal.api.domain.credential.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {
}
