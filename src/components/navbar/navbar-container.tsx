import React from 'react';

import { useSelector } from 'react-redux';
import { SystemState } from '../../store/system/types';

import NavbarView from './navbar-view';


type Props = {
    signIn?: boolean;
    signUp?: boolean;
    search?: boolean;
    hide?: boolean;
    logo?: boolean;
}

function Navbar(props: Props) {
    const systemState: SystemState = useSelector((state: any) => state.system);

    console.log(systemState);

    if (props.hide)
        return <> </>

    return (
        <NavbarView
            signIn={props.signIn}
            signUp={props.signUp}
            logo={props.logo}
            hide={props.hide}
            search={props.search}
            color="shiny"
        />
    );
}

export default Navbar;
