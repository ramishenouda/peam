import React, { useEffect } from 'react';

import { Container } from 'react-bootstrap';

export const Logout = () => {
    useEffect(() => {
        localStorage.clear();
        window.location.reload();
    }, [])
    return (
        <Container className="text-center mt-5 pt-5">
            Signing out....   
        </Container>
    )
}
