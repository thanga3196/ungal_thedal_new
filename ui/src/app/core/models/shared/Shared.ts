import { Category } from "../admin/category/Category";
import { CategoryList } from "../admin/category/CategoryList";
import { SubCategory } from "../admin/category/SubCategory";
import { City } from "../admin/location/City";
import { Country } from "../admin/location/Country";
import { District } from "../admin/location/District";
import { LocationList } from "../admin/location/LocationList";
import { Region } from "../admin/location/Region";
import { State } from "../admin/location/State";

export class Shared {
    cityList: City[] = [];
    districtList: District[] = [];
    stateList: State[] = [];
    countryList: Country[] = [];
    regionList: Region[] = [];
    categoryList: Category[] = [];
    subCategoryList: SubCategory[] = [];
    locationViewList: LocationList[] = [];
    categoryViewList: CategoryList[] = [];
    contactContactByReadInd: number = 0;
}
