export interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export interface TabItem {
  name: string;
  label: string;
  icon: string;
  activeIcon?: string;
}
