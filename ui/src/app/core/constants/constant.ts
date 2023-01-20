import {Theme} from "src/app/shared/models/Theme";

export class Constant {
  public static defaultTheme: Theme = {
    primaryColor: "denim",
    secondaryColor: "black",
    teritaryColor: "white",
    primaryBackgroundColor: "cultured"
  };
  public static customMobilePattern = {
    '0': {pattern: new RegExp('[6-9]')},
    '9': {pattern: new RegExp('[0-9]')}
  };
}
