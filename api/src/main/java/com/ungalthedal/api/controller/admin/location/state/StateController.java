package com.ungalthedal.api.controller.admin.location.state;

import com.ungalthedal.api.constant.AlertType;
import com.ungalthedal.api.controller.abstraction.admin.location.state.IStateController;
import com.ungalthedal.api.domain.admin.location.state.State;
import com.ungalthedal.api.domain.admin.location.state.StateView;
import com.ungalthedal.api.model.Response;
import com.ungalthedal.api.service.abstraction.admin.location.district.IDistrictService;
import com.ungalthedal.api.service.abstraction.admin.location.state.IStateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("admin/state")
@CrossOrigin(origins = "*")
public class StateController implements IStateController {
    IStateService stateService;
    IDistrictService districtService;

    @Autowired
    StateController(IStateService stateService, IDistrictService districtService) {
        this.stateService = stateService;
        this.districtService = districtService;
    }

    @Override
    @PostMapping(value = "list", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getList(@RequestBody StateView stateView) throws Exception {
        return ResponseEntity.ok(this.stateService.getList(stateView));
    }

    @Override
    @PostMapping(value = "listDistrictByState", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getDistrictListByState(@RequestBody StateView stateView) throws Exception {
        return ResponseEntity.ok(this.districtService.getDistrictListByState(stateView));
    }

    @Override
    @PostMapping(value = "save", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> save(@RequestBody State state) throws Exception {
        State oldState = this.stateService.getById(state.getId());
        if (oldState != null) {
            return ResponseEntity.ok(stateService.save(state));
        }
        oldState = this.stateService.getByNmeAndCountryId(state);
        if (oldState != null)
            return ResponseEntity.ok(new Response("State " + oldState.getNme() + " already exists.", AlertType.SUCCESS));
        else return ResponseEntity.ok(stateService.save(state));
    }

    @Override
    @PostMapping(value = "delete", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> delete(@RequestBody State state) throws Exception {
        State state1 = this.stateService.getById(state.getId());
        if (state1 != null) {
            this.stateService.delete(state);
            return ResponseEntity.ok(new Response("State '" + state.getNme() + "' deleted successfully.", AlertType.SUCCESS));
        } else
            return ResponseEntity.ok(new Response("State '" + state.getNme() + "' not exists.", AlertType.WARNING));
    }

    @Override
    @PostMapping(value = "getById", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getById(@RequestBody StateView stateView) throws Exception {
        return ResponseEntity.ok(this.stateService.getById(stateView.getId()));
    }
}

