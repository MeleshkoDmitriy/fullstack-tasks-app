import { BottomTabsParamList } from '../navigation/BottomTabsNavigator';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends BottomTabsParamList {}
  }
}
