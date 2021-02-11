import { AxiosError } from 'axios';
import { error } from './notifications-service';

export const showAxiosResponseErrors = (errors: AxiosError) => {
    const res = errors.response?.data;
    let message = '';
    for (const ms in res)
        message += res[ms] + '\n';

    error('Error while registering', message);
}
