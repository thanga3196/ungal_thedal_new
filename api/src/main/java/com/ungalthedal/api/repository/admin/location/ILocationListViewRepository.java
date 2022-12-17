package com.ungalthedal.api.repository.admin.location;

import com.ungalthedal.api.domain.admin.location.LocationListView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ILocationListViewRepository extends JpaRepository<LocationListView, Long> {

}
