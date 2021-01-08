import React, { Component } from 'react';
import NavbarView from './navbar-view';

type Props = {
    signIn?: boolean;
    signUp?: boolean;
    search?: boolean;
    hide?: boolean;
    logo?: boolean;
}

class Navbar extends Component<Props> {
    render() {
        return (
            <NavbarView 
                signIn={this.props.signIn} 
                signUp={this.props.signUp} 
                logo={this.props.logo} 
                hide={this.props.hide} 
                search={this.props.search}
                color="shiny"
            />
        );
    }
}

export default Navbar;
