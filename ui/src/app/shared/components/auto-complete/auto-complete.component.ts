import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {IconDefinition} from '@fortawesome/free-regular-svg-icons';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {AutoComplete} from 'src/app/core/models/shared/AutoComplete';
import {CommonService} from "../../service/common/common.service";
import {Theme} from "../../models/Theme";

@Component({
  selector: 'auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit, OnChanges {
  @Input() placeHolder = '';
  @Input() fontSize = '16px';
  @Input() icon!: IconDefinition;
  @Input() iconSize = '16px';
  @Input() items: any[] = [];
  @Input() key: string = "key";
  @Input() value: string = "value";
  @Input() id: string = '';
  filteredItems: any[] = [];
  showDiv: boolean = false;
  faXMark: IconDefinition = faXmark;
  selectedItem!: AutoComplete;
  lang: string = '';
  theme!: Theme;

  constructor(private commonService: CommonService) {
    this.selectedItem = new AutoComplete();
    this.selectedItem.id = 0;
    this.selectedItem.nme = '';
    this.initSubscription();
  }

  initSubscription() {
    this.commonService.getTheme().subscribe(value => {
      this.theme = value;
    });
    this.commonService.getLang().subscribe(value => {
      this.lang = value;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.items)
      this.updateSuggestionBox(this.items);
  }

  ngOnInit(): void {

  }

  contains(event: any) {
    if (event.target.value) {
      this.updateSuggestionBox(
        this.items.filter((it) => {
          return it[this.value].toLowerCase().indexOf(event.target.value.toLowerCase()) > -1;
        }));
    }
  }

  updateSuggestionBox(items: any[]) {
    this.filteredItems = [];
    if (items.length > 0) {
      items.forEach(it => {
        this.filteredItems.push(it);
      });
    }
  }

  showSuggestionBox() {
    this.showDiv = true;
  }

  selectItem(item: any) {
    this.selectedItem.id = item[this.key];
    this.selectedItem.nme = item[this.value];
    this.showDiv = false;
  }

  clearText() {
    this.selectedItem.id = 0;
    this.selectedItem.nme = '';
  }

  @HostListener('document:click', ['$event'])
  toggle(event: Event) {
    let target = event.target as HTMLElement;
    if (target.id !== this.id) {
      this.showDiv = false;
    }
  }
}
