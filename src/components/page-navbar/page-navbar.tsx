// A navbar that can be added to any page.
import { Link } from 'react-router-dom';

import { PageNavbar as NavbarType } from 'models';

import { NavItem } from './navitem';

import { Navbar } from '../navbar/navbar-style';

type Props = {
  pageNavbar: NavbarType;
};

export const PageNavbar = ({ pageNavbar }: Props): JSX.Element => {
  const tabs = pageNavbar.navItems
    .filter((item) => !item.hideCondition)
    .map((item) => (
      <span key={item.title + Date()}>
        <NavItem
          navItem={{ ...item, active: item.tab === pageNavbar.active }}
        />
      </span>
    ));

  const Navbar = navbar(tabs);
  const title = pageNavbar.title ? pageNavbar.title : '';
  const titleLink = pageNavbar.titleLink ? pageNavbar.titleLink : '';
  const subTitle = pageNavbar.subTitle ? pageNavbar.subTitle : '';

  if (pageNavbar.showHeader)
    return headerNavbar(
      title,
      subTitle,
      Navbar,
      titleLink,
      pageNavbar.subTitileLink,
      pageNavbar.description
    );

  return Navbar;
};

const headerNavbar = (
  title: string,
  subTitle: string,
  Navbar: JSX.Element,
  titleLink: string,
  subTitleLink?: string,
  description?: string
) => {
  const isSmallScreen = window.innerWidth < 769;

  return (
    <header className="head ">
      <div className="flex-auto pb-1">
        <h1 className="course-title f2">
          <Link className="disable-link-style" to={`${titleLink}`}>
            {title}
          </Link>
          {subTitle && (
            <>
              <span>|</span>
              <Link
                className="disable-link-style"
                to={subTitleLink ? subTitleLink : titleLink}
              >
                {subTitle}
              </Link>
            </>
          )}
        </h1>
        {isSmallScreen && description && (
          <h2 className="course-description f3">{description}</h2>
        )}
      </div>
      {Navbar}
    </header>
  );
};

const navbar = (tabs: any, styleColor?: string) => {
  return <Navbar className={`${styleColor === 'gray' && ''}`}>{tabs}</Navbar>;
};
