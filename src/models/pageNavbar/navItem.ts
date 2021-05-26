export default interface NavItem {
  setTab: (tab: number) => void;
  tab: number;
  title: string;
  active: boolean;
  link?: string;
  hideCondition?: boolean;
  disableCondition?: boolean;
  disableText?: string;
  icon?: JSX.Element;
}
