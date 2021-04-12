import { NavItem as Navitem } from './vertical-navbar-style';

type Props = {
    title: string;
    tab: number;
    active: number;
    setTab: (arg: number) => void;
};

export const NavItem = (props: Props) => {
    return (
        <Navitem
            onClick={() => props.setTab(props.tab)}
            className={`py-2 my-2 ${props.active === props.tab && 'active'}`}
        >
            {props.title}
        </Navitem>
    );
};
