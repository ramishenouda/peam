import styled from 'styled-components';

import { Form as form } from 'react-bootstrap';

export const FileUpload = styled(form.File)`
    display: none;
`

export const FileToggle = styled.img`
    cursor: pointer;
    border-radius: 20px;
    width: 200px
`
