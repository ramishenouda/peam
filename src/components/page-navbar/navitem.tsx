import { NavItem as Item } from 'models';
import { Link } from 'react-router-dom';

type Props = {
  navItem: Item;
};

export const NavItem = ({ navItem }: Props) => {
  const data = (
    <span
      onClick={() => navItem.setTab(navItem.tab)}
      className={`course-nav-item ${navItem.active && 'active-tab'}`}
    >
      <span className="material-ui-icon mx-2">{navItem.icon}</span>{' '}
      {navItem.title}
    </span>
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
