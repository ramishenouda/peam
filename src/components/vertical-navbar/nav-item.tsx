import { NavItem as Navitem } from './vertical-navbar-style';

type Props = {
  title: string;
  tab: number;
  active: number;
  setTab: (arg: number) => void;
  color?: string;
  options?: string;
  disabled?: boolean;
};

export const NavItem = (props: Props) => {
  return (
    <>
      {!props.disabled && (
        <Navitem
          onClick={() => props.setTab(props.tab)}
          className={`${props.options ? props.options : 'py-3 my-1'} ${
            props.active === props.tab && 'active'
          }`}
          color={props.color}
        >
          {props.title}
        </Navitem>
      )}
      {props.disabled && (
        <div
          className={`text-left font-roboto font-bold`}
          style={{ color: props.color }}
        >
          {props.title}
        </div>
      )}
    </>
  );
};
