import React from 'react';

import { RequestPasswordReset as RequestReset } from '../../services/auth-service';
import { showAxiosResponseErrors } from '../../services/error-handler-service';

import { UserForPasswordReset as User } from '../../models/user';

import PasswordResetView from './request-password-reset-view'
import { success } from '../../services/notification-service';

export const RequestPasswordReset = () => {
    const reset = (user: User) => {
        RequestReset(user)
            .then((result) => {
                success("Password reset link was sent to your email.");
                console.log(result);
            }).catch((err) => {
                showAxiosResponseErrors(err);
            });
    }

    return (
        <>
            <PasswordResetView
                register={reset}
            />
        </>
    );
}
