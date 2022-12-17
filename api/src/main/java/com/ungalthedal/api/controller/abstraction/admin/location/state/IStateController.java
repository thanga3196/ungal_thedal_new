package com.ungalthedal.api.controller.abstraction.admin.location.state;

import com.ungalthedal.api.domain.admin.location.state.State;
import com.ungalthedal.api.domain.admin.location.state.StateView;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public interface IStateController {
    ResponseEntity<?> getList(StateView stateView) throws Exception;
    ResponseEntity<?> getById(StateView stateView) throws Exception;
    ResponseEntity<?> getDistrictListByState(StateView stateView) throws Exception;
    ResponseEntity<?> save(State state) throws Exception;
    ResponseEntity<?> delete(State state) throws Exception;
}
