import { Navbar } from './vertical-navbar-style';
import { NavItem } from './nav-item';
import { Title } from 'style';

type Props = {
  active: number;
  setTab: (tab: number) => void;
  titles: Array<string>;
};

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
    return <div> tabs can't be undefined. </div>;

  let tabs = [];
  for (let i = 0; i < props.titles.length; i++) {
    const strings = props.titles[i].split('{');
    const title = strings[0];
    const color = sliceString(props.titles[i], '{{', '}}');
    const isTitle = sliceString(props.titles[i], '[[', ']]');

    //    console.log(color, isTitle);

    tabs.push(
      <div className="text-info bg-white my-1" key={props.titles[i] + i}>
        {!isTitle && (
          <>
            <NavItem
              active={props.active}
              setTab={props.setTab}
              tab={i}
              title={title}
              color={color ? color : ''}
            />
            {i + 1 !== props.titles.length && (
              <div className="border-bottom w-100"></div>
            )}
          </>
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
