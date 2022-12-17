package com.ungalthedal.api.service;

import com.ungalthedal.api.constant.AlertType;
import com.ungalthedal.api.domain.admin.category.CategoryListView;
import com.ungalthedal.api.domain.admin.category.category.CategoryView;
import com.ungalthedal.api.domain.admin.category.sub_category.SubCategoryView;
import com.ungalthedal.api.domain.admin.location.LocationListView;
import com.ungalthedal.api.domain.admin.location.city.CityView;
import com.ungalthedal.api.domain.admin.location.country.CountryView;
import com.ungalthedal.api.domain.admin.location.district.DistrictView;
import com.ungalthedal.api.domain.admin.location.region.RegionView;
import com.ungalthedal.api.domain.admin.location.state.StateView;
import com.ungalthedal.api.domain.credential.User;
import com.ungalthedal.api.domain.credential.UserCredential;
import com.ungalthedal.api.domain.credential.UserLogin;
import com.ungalthedal.api.domain.credential.UserProfile;
import com.ungalthedal.api.domain.shared.IconListView;
import com.ungalthedal.api.model.*;
import com.ungalthedal.api.repository.admin.category.ICategoryListViewRepository;
import com.ungalthedal.api.repository.admin.category.category.ICategoryViewRepository;
import com.ungalthedal.api.repository.admin.category.sub_category.ISubCategoryViewRepository;
import com.ungalthedal.api.repository.admin.location.ILocationListViewRepository;
import com.ungalthedal.api.repository.admin.location.city.ICityViewRepository;
import com.ungalthedal.api.repository.admin.location.country.ICountryViewRepository;
import com.ungalthedal.api.repository.admin.location.district.IDistrictViewRepository;
import com.ungalthedal.api.repository.admin.location.region.IRegionViewRepository;
import com.ungalthedal.api.repository.admin.location.state.IStateViewRepository;
import com.ungalthedal.api.repository.contact.IContactViewRepository;
import com.ungalthedal.api.repository.credential.IUserCredentialRepository;
import com.ungalthedal.api.repository.credential.IUserLoginRepository;
import com.ungalthedal.api.repository.credential.IUserProfileRepository;
import com.ungalthedal.api.repository.credential.IUserRepository;
import com.ungalthedal.api.repository.shared.IIconListViewRepository;
import com.ungalthedal.api.service.abstraction.IApiService;
import com.ungalthedal.api.util.AuthenticationTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApiService implements IApiService {
    private final ICityViewRepository cityViewRepository;
    private final IDistrictViewRepository districtViewRepository;
    private final IStateViewRepository stateViewRepository;
    private final ICountryViewRepository countryViewRepository;
    private final IRegionViewRepository regionViewRepository;
    private final ICategoryViewRepository categoryViewRepository;
    private final ISubCategoryViewRepository subCategoryViewRepository;
    private final ILocationListViewRepository locationListViewRepository;
    private final ICategoryListViewRepository categoryListViewRepository;
    private final IContactViewRepository contactViewRepository;
    private final IUserRepository userRepository;
    private final IUserLoginRepository userLoginRepository;
    private final IUserProfileRepository userProfileRepository;
    private final IUserCredentialRepository userCredentialRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManager authenticationManager;
    private final AuthenticationTokenUtil authenticationTokenUtil;
    private final IIconListViewRepository iIconListViewRepository;

    @Override
    public AccessTokenResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUserName(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        return new AccessTokenResponse().copy(customUserDetails, authenticationTokenUtil.generateAccessToken(customUserDetails), authenticationTokenUtil.generateRefreshToken(customUserDetails));
    }

    @Override
    @Transactional
    public RegisterResponse register(RegisterRequest registerRequest) {
        UserProfile userProfileByEmail = userProfileRepository.findByEmail(registerRequest.getEmail());
        if (userProfileByEmail != null)
            return new RegisterResponse("Email Id Already Exists.", AlertType.WARNING);
        UserProfile userProfileByMobile = userProfileRepository.findByMobile(registerRequest.getMobile());
        if (userProfileByMobile != null)
            return new RegisterResponse("Mobile Number Already Exists.", AlertType.WARNING);
        UserCredential userCredential = new UserCredential();
        userCredential.setPassword(bCryptPasswordEncoder.encode(registerRequest.getPassword()));
        userCredential.setDateCreated(new Date());
        userCredential.setLastUpdated(new Date());
        userCredential = userCredentialRepository.save(userCredential);

        UserLogin userLogin = new UserLogin();
        userLogin.setFailedAttempts(0);
        userLogin = userLoginRepository.save(userLogin);

        UserProfile userProfile = new UserProfile();
        userProfile.setFirstNme(registerRequest.getFirstName());
        userProfile.setLastNme(registerRequest.getLastName());
        userProfile.setGender(registerRequest.getGender());
        userProfile.setMobile(registerRequest.getMobile());
        userProfile.setEmail(registerRequest.getEmail());
        userProfile.setDateCreated(new Date());
        userProfile.setLastUpdated(new Date());
        userProfile = userProfileRepository.save(userProfile);

        User userNew = new User();
        userNew.setCredentialId(userCredential.getId());
        userNew.setLoginId(userLogin.getId());
        userNew.setProfileId(userProfile.getId());
        userNew.setEnabled(true);
        userNew.setDateCreated(new Date());
        userNew.setLastUpdated(new Date());
        userNew = userRepository.save(userNew);
        if (userNew.getId() > 0)
            return new RegisterResponse("Registration Successful.", AlertType.SUCCESS);
        else return new RegisterResponse("Registration Failed.", AlertType.ERROR);
    }

    @Override
    public Status getStatus() {
        return new Status(true, "Server Connected");
    }

    @Override
    public List<LocationListView> getAllLocationList() {
        return this.locationListViewRepository.findAll(Sort.by(Sort.Direction.ASC, "nme"));
    }

    @Override
    public List<CategoryListView> getAllCategoryList() {
        return this.categoryListViewRepository.findAll(Sort.by(Sort.Direction.ASC, "nme"));
    }

    @Override
    public List<CityView> getAllCity() {
        return this.cityViewRepository.findAll(Sort.by(Sort.Direction.ASC, "nme"));
    }

    @Override
    public List<DistrictView> getAllDistrict() {
        return this.districtViewRepository.findAll(Sort.by(Sort.Direction.ASC, "nme"));
    }

    @Override
    public List<StateView> getAllState() {
        return this.stateViewRepository.findAll(Sort.by(Sort.Direction.ASC, "nme"));
    }

    @Override
    public List<CountryView> getAllCountry() {
        return this.countryViewRepository.findAll(Sort.by(Sort.Direction.ASC, "nme"));
    }

    @Override
    public List<RegionView> getAllRegion() {
        return this.regionViewRepository.findAll(Sort.by(Sort.Direction.ASC, "nme"));
    }

    @Override
    public List<CategoryView> getAllCategory() {
        return this.categoryViewRepository.findAll(Sort.by(Sort.Direction.ASC, "nme"));
    }

    @Override
    public List<SubCategoryView> getAllSubCategory() {
        return this.subCategoryViewRepository.findAll(Sort.by(Sort.Direction.ASC, "nme"));
    }

    @Override
    public List<IconListView> getAllIconList() {
        return this.iIconListViewRepository.findAll(Sort.by(Sort.Direction.ASC, "nme"));
    }

    @Override
    public Search getSearchDropDownDetails() {
        Search search = new Search();
        search.setCategoryListViewList(this.getAllCategoryList());
        search.setLocationListViewList(this.getAllLocationList());
        return search;
    }

    @Override
    public Shared getSharedDetails() {
        Shared shared = new Shared();
        shared.setContactCountByReadInd(this.contactViewRepository.countByReadInd(false));
        return shared;
    }

}
