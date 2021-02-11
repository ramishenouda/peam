import React from 'react';
import NavbarView from './navbar-view';

type Props = {
    signIn?: boolean;
    signUp?: boolean;
    search?: boolean;
    hide?: boolean;
    logo?: boolean;
}

function Navbar(props: Props) {
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
