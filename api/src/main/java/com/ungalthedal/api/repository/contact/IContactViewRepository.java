package com.ungalthedal.api.repository.contact;

import com.ungalthedal.api.domain.contact.ContactView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IContactViewRepository extends JpaRepository<ContactView, Long> {
    Long countByReadInd(boolean readInd);
}
