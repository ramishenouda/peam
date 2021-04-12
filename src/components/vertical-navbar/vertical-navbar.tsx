import { Navbar } from './vertical-navbar-style';
import { NavItem } from './nav-item'

type Props = {
    active: number;
    setTab: (tab: number) => void;
    titles: Array<string>;
};

export const VerticalNavbar = (props: Props) => {
    if (!props.titles || !props.titles.length)
        return <div> tabs can't be undefined. </div>;

    let tabs = [];
    for(let i = 0; i < props.titles.length; i++) {
        tabs.push(
            <span className={`px-4`}>
                <NavItem
                    active={props.active}
                    setTab={props.setTab}
                    tab={i}
                    title={props.titles[i]}
                />
            </span>
        );
    }
    
    return (
        <Navbar className="text-center">
            { tabs }
        </Navbar>
    );
};
