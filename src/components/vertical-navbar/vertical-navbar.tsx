import { Navbar } from './vertical-navbar-style';
import { NavItem } from './nav-item';

type Props = {
  active: number;
  setTab: (tab: number) => void;
  titles: Array<string>;
  emptyTitlesText?: string;
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
  if (!props.titles || !props.titles.length)
    return (
      <div className="text-danger text-center f3 font-roboto">
        {props.emptyTitlesText
          ? props.emptyTitlesText
          : "VerticalNavbar: tabs can't be undefined."}
      </div>
    );

  let tabs = [];
  let index = 0; // I'm not using the iterator of the for loop incase if we were adding a title.

  for (let i = 0; i < props.titles.length; i++) {
    const strings = props.titles[i].split('{');
    const title = strings[0];
    const color = sliceString(props.titles[i], '{{', '}}');
    const isTitle = sliceString(props.titles[i], '[[', ']]');

    tabs.push(
      <div className="text-info" key={props.titles[i] + i}>
        {!isTitle && (
          <div className="bg-white my-1">
            <NavItem
              active={props.active}
              setTab={props.setTab}
              tab={index++}
              title={title}
              color={color ? color : ''}
            />
            {i + 1 !== props.titles.length && (
              <div className="border-bottom w-100"></div>
            )}
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

  return <Navbar className="text-center">{tabs}</Navbar>;
};
