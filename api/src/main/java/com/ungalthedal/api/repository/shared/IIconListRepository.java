package com.ungalthedal.api.repository.shared;

import com.ungalthedal.api.domain.shared.IconList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IIconListRepository extends JpaRepository<IconList, Long> {
}
