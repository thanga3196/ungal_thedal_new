export class UrlConstant {
  //General
  public static serverStatus = "/api/status"
  public static sharedDetails = "/api/sharedDetails"
  public static searchDropDownDetails = "/api/searchDropDownDetails"
  public static cityList = "/api/cityList"
  public static districtList = "/api/districtList"
  public static stateList = "/api/stateList"
  public static regionList = "/api/regionList"
  public static countryList = "/api/countryList"
  public static iconList = "/api/iconList"
  public static categoryList = "/api/categoryList"
  public static subCategoryList = "/api/subCategoryList"

  //Login
  public static login = "/api/login"
  public static register = "/api/register"

  //Contact
  public static saveContact = "/contact/save"

  //City
  public static getCityById = "/admin/city/getById"
  public static listCity = "/admin/city/list"
  public static listBusinessByCity = "/admin/city/listBusinessByCity"
  public static saveCity = "/admin/city/save"
  public static deleteCity = "/admin/city/delete"

  //Country
  public static getCountryById = "/admin/country/getById"
  public static listCountry = "/admin/country/list"
  public static listStateByCountry = "/admin/country/listStateByCountry"
  public static saveCountry = "/admin/country/save"
  public static deleteCountry = "/admin/country/delete"

  //District
  public static getDistrictById = "/admin/district/getById"
  public static listDistrict = "/admin/district/list"
  public static listCityByDistrict = "/admin/district/listCityByDistrict"
  public static saveDistrict = "/admin/district/save"
  public static deleteDistrict = "/admin/district/delete"

  //State
  public static getStateById = "/admin/state/getById"
  public static listState = "/admin/state/list"
  public static listDistrictByState = "/admin/state/listDistrictByState"
  public static saveState = "/admin/state/save"
  public static deleteState = "/admin/state/delete"

  //Region
  public static getRegionById = "/admin/region/getById"
  public static listRegion = "/admin/region/list"
  public static listCountryByRegion = "/admin/region/listCountryByRegion"
  public static saveRegion = "/admin/region/save"
  public static deleteRegion = "/admin/region/delete"

  //Category
  public static getCategoryById = "/admin/category/getById"
  public static listCategory = "/admin/category/list"
  public static listSubCategoryByCategory = "/admin/category/listSubCategoryByCategory"
  public static saveCategory = "/admin/category/save"
  public static deleteCategory = "/admin/category/delete"

  //Sub Category
  public static getSubCategoryById = "/admin/sub-category/getById"
  public static listSubCategory = "/admin/sub-category/list"
  public static listBusinessBySubCategory = "/admin/category/listBusinessBySubCategory"
  public static saveSubCategory = "/admin/sub-category/save"
  public static deleteSubCategory = "/admin/sub-category/delete"
}
