import { Link as Ref } from 'react-router-dom';

type Props = {
    title: string;  //Title of the item
    tab: number;    //tab number
    active: number; //number of the current active tab
    icon: JSX.Element;
    type?: string;  //Used to hide the red line under tabs if needed
    setTab: (tab: number) => void; //TabSetter function
    link?: string;
};

export const Link = (props: Props) => {
    const data = 
        <span onClick={() => props.setTab(props.tab)} className={`course-nav-item ${(props.active === props.tab && !props.type) && 'active-tab'}`}>
            <span> { props.icon } { props.title } </span>
        </span>

    if (props.link) {
        return (
            <Ref className="disable-link-style" to={props.link}>
                { data }
            </Ref>
        );
    }

    return (
        data
    );
};
