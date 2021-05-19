// A navbar that can be added to any page.
import { Link } from 'react-router-dom';
import { Navbar } from '../navbar/navbar-style';
import { Link as NavLink } from './link';

type Props = {
  active: number;
  setTab: (tab: number) => void;
  type?: string;
  links?: Array<string>;
  titles: Array<string>;
  conditions?: Array<boolean>;
  icons: Array<JSX.Element>;
  styleColor?: 'gray' | 'none';
  showHeader?: boolean;
  title?: string;
  titleLink?: string;
  subTitle?: string;
  subTitileLink?: string;
  description?: string;
} & typeof defaultProps;

const defaultProps = {
  subTitle: '',
  title: '',
  description: '',
  showHeader: false,
  titleLink: '',
};

export const PageNavbar = (props: Props): JSX.Element => {
  if (!props.titles || !props.titles.length)
    return <div> tabs can't be undefined. </div>;

  if (!props.icons || !props.icons.length)
    return <div> link can't be undefined. </div>;

  if (props.icons.length !== props.titles.length)
    return <div> make sure to provide the one link for each tab. </div>;

  let tabs = [];
  for (let i = 0; i < props.titles.length; i++) {
    if (props.conditions && !props.conditions[i]) continue;

    tabs.push(
      <span key={props.titles[i] + Date()} className={`px-4`}>
        <NavLink
          icon={props.icons[i]}
          title={props.titles[i]}
          active={props.active}
          setTab={props.setTab}
          tab={i}
          type={props.type}
          link={props.links && props.links[i] && props.links[i]}
        />
      </span>
    );
  }

  const Navbar = navbar(tabs);

  if (props.showHeader)
    return headerNavbar(
      props.title,
      props.subTitle,
      Navbar,
      props.titleLink,
      '',
      props.description
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
  console.log(titleLink);

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
  return (
    <Navbar className={`course-navbar ${styleColor === 'gray' && ''}`}>
      {tabs}
      <span className="">&nbsp;</span>
    </Navbar>
  );
};

PageNavbar.defaultProps = defaultProps;
