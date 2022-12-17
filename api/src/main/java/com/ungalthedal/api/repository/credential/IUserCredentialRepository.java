package com.ungalthedal.api.repository.credential;

import com.ungalthedal.api.domain.credential.UserCredential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserCredentialRepository extends JpaRepository<UserCredential, Long> {

}
