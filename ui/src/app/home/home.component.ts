import {AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {
  faAngleLeft,
  faAngleRight,
  faBriefcase,
  faLocationArrow,
  faSearch,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import {CommonService} from 'src/app/shared/services/common/common.service';
import {Category} from 'src/app/admin/category/models/Category';
import {HomeService} from 'src/app/home/services/home/home.service';
import {Theme} from "src/app/shared/models/Theme";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  faSearch: IconDefinition = faSearch;
  faLocationArrow: IconDefinition = faLocationArrow;
  faBriefCase: IconDefinition = faBriefcase;
  faAngleLeft: IconDefinition = faAngleLeft;
  faAngleRight: IconDefinition = faAngleRight;
  categoryList: Category[] = [];
  searchForm!: FormGroup;
  filteredLocation!: Location[];
  filteredCategory!: Category[];
  carouselItemsList: any[] = [];
  carouselList: any[] = [
    {
      "imgPath": "src/assets/images/background.jpg"
    }
  ];
  position: number = 0;
  totalPosition!: number;
  lang: string = '';
  theme!: Theme;

  constructor(@Inject(HomeService) private homeService: HomeService, private commonService: CommonService, private renderer: Renderer2, private elementRef: ElementRef) {
    this.commonService.setShowNav(true);
    this.totalPosition = this.carouselList.length + 1;
    this.initSubscription();
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundImage = 'none';
    this.commonService.setShowPreLoader(false);
    this.carouselItemsList = this.elementRef.nativeElement.querySelectorAll('.carousel-item');
  }

  hideAllSlides(): void {
    this.carouselItemsList.forEach((element) => {
      this.renderer.removeClass(element, 'carousel-item-visible');
    });
  }

  slideNext() {
    this.hideAllSlides();
    if (this.position === this.carouselItemsList.length - 1) {
      this.position = 0;
    } else {
      this.position++;
    }
    this.renderer.addClass(this.carouselItemsList[this.position], 'carousel-item-visible');
  }

  slidePrev() {
    this.hideAllSlides();
    if (this.position === 0) {
      this.position = this.carouselItemsList.length - 1;
    } else {
      this.position--;
    }
    this.renderer.addClass(this.carouselItemsList[this.position], 'carousel-item-visible');
  }

  initSubscription() {
    this.commonService.getTheme().subscribe(value => {
      this.theme = value;
    });
    this.commonService.getLang().subscribe(value => {
      this.lang = value;
    });
  }

  ngOnInit(): void {
    this.buildForm();
    this.commonService.getSearchDropDownDetails().subscribe((data: any) => {
      this.filteredLocation = data.locationListViewList;
      this.filteredCategory = data.categoryListViewList;
    });
  }

  buildForm() {
    this.searchForm = new FormGroup(
      {
        searchControl: new FormControl('', []),
        locationControl: new FormControl('', []),
        categoryControl: new FormControl('', [])
      }
    );
  }
}
