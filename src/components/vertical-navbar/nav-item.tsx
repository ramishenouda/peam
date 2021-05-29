import { NavItem as Navitem } from './vertical-navbar-style';

type Props = {
  title: string;
  tab: number;
  active: number;
  setTab: (arg: number) => void;
  color?: string;
};

export const NavItem = (props: Props) => {
  return (
    <Navitem
      onClick={() => props.setTab(props.tab)}
      className={`py-2 ${props.active === props.tab && 'active'}`}
      color={props.color}
    >
      {props.title}
    </Navitem>
  );
};
