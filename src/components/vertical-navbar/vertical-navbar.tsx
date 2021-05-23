import { Navbar } from './vertical-navbar-style';
import { NavItem } from './nav-item';

type Props = {
  active: number;
  setTab: (tab: number) => void;
  titles: Array<string>;
};

export const VerticalNavbar = (props: Props) => {
  if (!props.titles || !props.titles.length)
    return <div> tabs can't be undefined. </div>;

  let tabs = [];
  for (let i = 0; i < props.titles.length; i++) {
    const strings = props.titles[i].split('{');
    const title = strings[0];
    const color = !strings[2] ? undefined : strings[2].split('}')[0];

    tabs.push(
      <div key={props.titles[i] + i}>
        <NavItem
          active={props.active}
          setTab={props.setTab}
          tab={i}
          title={title}
          color={color}
        />
        {i !== props.titles.length - 1 && <hr />}
      </div>
    );
  }

  return <Navbar className="text-center">{tabs}</Navbar>;
};
