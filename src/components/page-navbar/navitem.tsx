import { Link } from 'react-router-dom';

import { NavItem as Item } from 'models';

import { NavItem as StyledItem } from 'style';

type Props = {
  navItem: Item;
};

export const NavItem = ({ navItem }: Props) => {
  const data = (
    <StyledItem
      onClick={() => navItem.setTab(navItem.tab)}
      className={`course-nav-item ${navItem.active && 'active-tab'}`}
    >
      <span className="offset-icon mt-2 mx-2">{navItem.icon}</span>
      {navItem.title}
    </StyledItem>
  );

  if (navItem.link) {
    return (
      <Link className="disable-link-style" to={navItem.link}>
        {data}
      </Link>
    );
  }

  return data;
};
