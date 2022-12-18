import {Component, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Icon} from "../../../core/models/shared/Icon";
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors
} from "@angular/forms";

@Component({
  selector: 'icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: IconPickerComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: IconPickerComponent
    }
  ]
})
export class IconPickerComponent implements OnInit, OnChanges, ControlValueAccessor {
  showDiv: boolean = false;
  @Input() id: string = '';
  @Input() selectedIcon!: Icon;
  buttonId: string = "button-" + this.id;
  @Input() iconList: Icon[] = [];
  _value: string = '';
  touched = false;
  @Input() disabled = false;

  onChange = (value: string) => {
  };
  onTouched = () => {
  };

  constructor() {
  }

  writeValue(value: string) {
    this._value = value;
    // @ts-ignore
    this.selectedIcon = this.iconList.find((obj) => {
      return obj.nme === value;
    });
  }

  registerOnChange(fn: (val: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.buttonId = "button-" + this.id;
  }

  ngOnInit(): void {

  }

  showIconList() {
    console.log(this.showDiv)
    this.showDiv = true;

  }

  selectItem(item: any) {
    console.log(item)
    this.markAsTouched();
    if (!this.disabled) {
      console.log(item)
      this.selectedIcon = item;
      this.onChange(item?.nme); //If missed, changing the value will not get updated.
      this.showDiv = false;
    }
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  @HostListener('document:click', ['$event'])
  toggle(event: Event) {
    let target = event.target as HTMLElement;
    if (target.id !== this.id && target.id != this.buttonId) {
      this.showDiv = false;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }
}
