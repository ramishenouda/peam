import { useEffect, useState } from 'react';

import CloseIcon from '@material-ui/icons/Close';
import OpenIcon from '@material-ui/icons/ArrowForward';

import { NavContainer, Navbar, ToggleButton } from './vertical-navbar-style';
import { NavItem } from './nav-item';

type Props = {
  active: number;
  setTab: (tab: number) => void;
  titles: Array<string>;
  emptyTitlesText?: string;
  toggleCallBack?: (arg: boolean) => void;
  defaultOpen?: boolean;
  showToggleButton?: boolean;
  navOptions?: string;
  navItemContainerOptions?: string;
  navItemOptions?: string;
  header?: JSX.Element;
};

// add options for text-align
function sliceString(value: string, start: string, end: string) {
  const startIndex = value.indexOf(start);
  const endIndex = value.indexOf(end);

  if (
    startIndex < 0 ||
    endIndex < 0 ||
    startIndex > endIndex ||
    start.length + end.length > value.length
  )
    return false;

  return value.slice(startIndex + start.length, endIndex);
}

export const VerticalNavbar = (props: Props) => {
  const [tabs, setTabs] = useState(new Array<JSX.Element>());
  const [isOpen, setIsOpen] = useState(true);

  const toggleFunction = () => {
    setIsOpen(!isOpen);
    if (props.toggleCallBack) props.toggleCallBack(!isOpen);
  };

  useEffect(() => {
    let tabs = [];
    for (let i = 0, index = 0; i < props.titles.length; i++) {
      const strings = props.titles[i].split('{');
      const title = strings[0];
      const color = sliceString(props.titles[i], '{{', '}}');
      const isTitle = sliceString(props.titles[i], '[[', ']]');
      const isDisabled = sliceString(props.titles[i], '((', '))');
      console.log(props.titles[i]);
      tabs.push(
        <div
          className={`text-info ${
            props.navItemContainerOptions && props.navItemContainerOptions
          }`}
          key={props.titles[i] + i}
        >
          {!isTitle && (
            <div>
              <NavItem
                active={props.active}
                setTab={props.setTab}
                tab={index++}
                title={title}
                color={color ? color : ''}
                options={props.navItemOptions}
                disabled={isDisabled ? true : false}
              />
            </div>
          )}
          {isTitle && (
            <div className="text-left font-roboto font-bold">
              {title.slice(0, title.lastIndexOf('[['))}
            </div>
          )}
        </div>
      );
    }

    setTabs(tabs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.titles]);

  if (!props.titles || !props.titles.length) {
    return (
      <div className="text-danger text-center f3 font-roboto">
        {props.emptyTitlesText
          ? props.emptyTitlesText
          : "VerticalNavbar: tabs can't be undefined."}
      </div>
    );
  }

  return (
    <div
      className={`position-relative mb-4 ${
        props.navOptions && props.navOptions
      }`}
    >
      {isOpen && props.showToggleButton && (
        <ToggleButton onClick={toggleFunction}>
          <CloseIcon />
        </ToggleButton>
      )}
      {!isOpen && props.showToggleButton && (
        <ToggleButton hidden={!isOpen} onClick={toggleFunction}>
          <OpenIcon />
        </ToggleButton>
      )}
      <NavContainer>
        <Navbar hidden={!isOpen} className={`text-center`}>
          {props.header && props.header}
          {tabs}
        </Navbar>
      </NavContainer>
    </div>
  );
};
