// A navbar that can be added to any page.
import { Navbar } from 'react-bootstrap';

import { Link } from './link';

type Props = {
    active: number;
    setTab: (tab: number) => void;
    type?: string;
    links?: Array<string>;
    titles: Array<string>;
    icons: Array<JSX.Element>;
    styleColor?: 'gray'| 'none';
}

export const PageNavbar = (props: Props): JSX.Element => {
    if (!props.titles || !props.titles.length)
        return <div> tabs can't be undefined. </div>;

    if (!props.icons || !props.icons.length)
        return <div> link can't be undefined. </div>;

    if (props.icons.length !== props.titles.length)
        return <div> make sure to provide the one link for each tab. </div>;

    let tabs = [];
    for(let i = 0; i < props.titles.length; i++) {
        tabs.push(
            <span className={`px-4`}>
            <Link
                    icon={props.icons[i]}
                    title={props.titles[i]}
                    active={props.active}
                    setTab={props.setTab}
                    tab={i}
                    key={props.titles[i]}
                    type={props.type}
                    link={(props.links && props.links[i]) && props.links[i]}
                />
            </span>
        );
    }

    return (
        <Navbar className={`course-navbar ${props.styleColor === 'gray' && 'bg-g-gray'}`}>
            { tabs }
            <span className="">&nbsp;</span>
        </Navbar>
    );
}
