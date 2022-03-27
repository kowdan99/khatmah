import { ItemType } from "react-native-dropdown-picker";

export type AppRootParamList = {
    Home: undefined;
    Questions: undefined;
    Log: {currentSurah: ItemType | null | undefined, currentPage: ItemType | null | undefined, currentStartPage: ItemType | null | undefined};
  };
  
  // This registers which makes navigation fully type-safe.
  // https://reactnavigation.org/docs/typescript#specifying-default-types-for-usenavigation-link-ref-etc
  declare global {
    namespace ReactNavigation {
      interface RootParamList extends AppRootParamList {}
    }
  }