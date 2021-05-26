import { NavItem } from '.';

export default interface PageNavbar {
  active: number;
  navItems: Array<NavItem>;
  styleColor?: 'gray' | 'none';
  showHeader?: boolean;
  title?: string;
  titleLink?: string;
  subTitle?: string;
  subTitileLink?: string;
  description?: string;
}
