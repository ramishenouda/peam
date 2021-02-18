import styled from 'styled-components';

import { Form as form } from 'react-bootstrap';

import deleteIcon from '@material-ui/icons/Delete';
import settings from '@material-ui/icons/Settings';

export const Form = styled(form)`
    background: #f0f0f0;
    border-radius: 5px;
`

export const Div = styled.div`
    clear: both;
    background: #f0f0f0;
    border-radius: 5px;
    transition: 0.5s;

    :hover {
        background: #e3e3e3;
    }

    -ms-word-break: break-all;
    word-break: break-all;
    word-break: break-word;

    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    hyphens: auto;
`

export const DeleteIcon = styled(deleteIcon)`
    cursor: pointer;
    color: #ca3623;

    :hover {
        color: #ff1111;
    }
`

export const SettingsIcon = styled(settings)`
    cursor: pointer;
`
