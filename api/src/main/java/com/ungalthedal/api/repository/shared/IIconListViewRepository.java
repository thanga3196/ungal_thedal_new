package com.ungalthedal.api.repository.shared;

import com.ungalthedal.api.domain.shared.IconListView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IIconListViewRepository extends JpaRepository<IconListView, Long> {
}
