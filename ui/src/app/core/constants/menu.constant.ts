import {faUser} from "@fortawesome/free-solid-svg-icons";
import {Constant} from "./constant";

export class MenuConstant {
  public static menuList = [
    {
      name: "Home",
      routerLink: "home",
      clicked: false,
      children: []
    },
    {
      name: "Services",
      routerLink: undefined,
      clicked: false,
      children: [
        {
          name: "Search",
          routerLink: "search",
          logo: "search",
          children: []
        },
        {
          name: "Blog",
          routerLink: "blog",
          logo: "blog",
          children: []
        },
        {
          name: "Movie",
          routerLink: "movie",
          logo: "movie",
          children: []
        }
      ]
    },
    {
      name: "About",
      routerLink: "about",
      clicked: false,
      children: []
    },
    {
      name: "Contact",
      routerLink: "contact",
      clicked: false,
      children: []
    },
  ];
  public static additionalMenuList = [
    {
      name: "Add Listing",
      routerLink: "listing/add-listing",
      isButton: true,
      clicked: false,
      children: []
    },
    {
      name: "Advertise",
      routerLink: "advertise",
      isButton: false,
      clicked: false,
      children: []
    },
    {
      name: "Login",
      routerLink: "login",
      isButton: false,
      clicked: false,
      children: []
    },
    {
      name: "Register",
      routerLink: "register",
      isButton: false,
      clicked: false,
      children: []
    },
  ];
  public static profileMenuList = [
    {
      name: "Profile",
      routerLink: "/profile",
      icon: faUser,
      children: []
    }
  ];
  public static adminMenuList = [
    {
      name: "Administration",
      routerLink: undefined,
      clicked: false,
      children: [
        {
          name: "General",
          routerLink: undefined, clicked: false,
          children: [
            {
              name: "Social Media",
              routerLink: "admin/general/social-media-search",
              clicked: false,
              children: []
            },
            {
              name: "Week Days",
              routerLink: "admin/general/week-days-search",
              clicked: false,
              children: []
            }
          ]
        },
        {
          name: "Category",
          routerLink: undefined, clicked: false,
          children: [
            {
              name: "Category",
              routerLink: "admin/category/category-search",
              clicked: false,
              children: []
            },
            {
              name: "Sub Category",
              routerLink: "admin/category/sub-category-search",
              clicked: false,
              children: []
            }
          ]
        },
        {
          name: "Location",
          routerLink: undefined, clicked: false,
          children: [
            {
              name: "Region",
              routerLink: "admin/location/region-search",
              clicked: false,
              children: []
            },
            {
              name: "Country",
              routerLink: "admin/location/country-search",
              clicked: false,
              children: []
            },
            {
              name: "State",
              routerLink: "admin/location/state-search",
              clicked: false,
              children: []
            },
            {
              name: "District",
              routerLink: "admin/location/district-search",
              clicked: false,
              children: []
            },
            {
              name: "City",
              routerLink: "admin/location/city-search",
              clicked: false,
              children: []
            }
          ]
        },
        {
          name: "Advertisement",
          routerLink: undefined, clicked: false,
          children: [
            {
              name: "Home - Carousel",
              routerLink: "admin/advertisement/ad-home-carousel-search", clicked: false,
              children: []
            }
          ]
        }
      ]
    }
  ];
  public static yesOrNoList = [
    {
      id: true,
      nme: "Yes"
    },
    {
      id: false,
      nme: "No"
    }
  ];
  public static otherSettingsList = [
    {
      name: "Theme",
      routerLink: undefined,
      clicked: false,
      children: [
        {
          name: "Denim",
          routerLink: undefined,
          clicked: false,
          theme: Constant.defaultTheme,
          children: []
        },
        {
          name: 'Dodger Blue',
          routerLink: undefined,
          clicked: false,
          children: [],
          theme: {
            primaryColor: "dodger-blue",
            secondaryColor: "black",
            teritaryColor: "white",
            primaryBackgroundColor: "cultured"
          }
        },
        {
          name: 'Dark Sea Green',
          routerLink: undefined,
          clicked: false,
          children: [],
          theme: {
            primaryColor: "dark-sea-green",
            secondaryColor: "black",
            teritaryColor: "white",
            primaryBackgroundColor: "cultured"
          }
        },
        {
          name: 'Razzmatazz',
          routerLink: undefined,
          clicked: false,
          children: [],
          theme: {
            primaryColor: "razzmatazz",
            secondaryColor: "black",
            teritaryColor: "white",
            primaryBackgroundColor: "cultured"
          }
        },
        {
          name: 'Deep Lilac',
          routerLink: undefined,
          clicked: false,
          children: [],
          theme: {
            primaryColor: "deep-lilac",
            secondaryColor: "black",
            teritaryColor: "white",
            primaryBackgroundColor: "cultured"
          }
        }
      ]
    },
    {
      name: "Language",
      routerLink: undefined,
      clicked: false,
      children: [
        {
          name: "English",
          routerLink: undefined,
          clicked: false,
          lang: "en",
          children: [],
        },
        {
          name: "Tamil",
          routerLink: undefined,
          clicked: false,
          lang: "ta",
          children: [],
        }
      ]
    },
    {
      name: "Notification",
      routerLink: undefined,
      clicked: false,
      children: [

      ]
    }
  ];
}
