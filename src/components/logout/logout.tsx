import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Container } from 'react-bootstrap';

import { updateSession } from '../../store/system/actions';
import { success } from '../../services/notification-service';

export const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.clear();
    success('Signed out successfully');
    dispatch(
      updateSession({
        name: '',
        jwt_id: '',
        loggedIn: false,
        token: '',
        user_id: '',
        username: '',
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="text-center f1 font-roboto mt-5 pt-5">
      Signing out....
    </Container>
  );
};
