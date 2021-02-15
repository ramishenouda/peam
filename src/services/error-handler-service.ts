import { AxiosError } from 'axios';
import { error } from './notifications-service';

export const showAxiosResponseErrors = (errors: AxiosError, title?: string) => {
    const res = errors.response?.data;
    let message = '';
    for (const ms in res)
        message += res[ms] + '\n';

    const _title = title === undefined ? 'Error' : title;
    error(_title, message);
}
