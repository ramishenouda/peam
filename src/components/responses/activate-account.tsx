import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";

import { Verify } from "../../services/auth-service";
import { showAxiosResponseErrors } from "../../services/error-handler-service";
import { success } from "../../services/notification-service";

interface ActivateParams {
    key: string;
}

export const ActivateAccount = () => {
    const params: ActivateParams = useParams();
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        Verify(params.key)
            .then((result) => {
                console.log(result);
                success("Email verified successfully.", "You can now login.");
                setRedirect(true);
            }).catch((err) => {
                showAxiosResponseErrors(err)
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (redirect) {
        return <Redirect to ="/login" />
    }

    return (
        <div className="text-center mt-5 f1">
            Verifying your account...
        </div>
    );
};