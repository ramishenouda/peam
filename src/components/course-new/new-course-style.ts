import styled from 'styled-components';

import textAreaAutosize from 'react-textarea-autosize';
import { 
    Container as container, Form as form,
    FormControl as formControl,
    FormLabel as formLabel,
    Button as button
} from 'react-bootstrap';

export const Container = styled(container)`
`
export const Form = styled(form)`
`

export const FormControl = styled(formControl)`
    font-family: Roboto, sans-serif;
`

export const FormLabel = styled(formLabel)`
`
export const TextareaAutosize = styled(textAreaAutosize)`
    width: 100%;
    height: 200px !important;
`

export const Button = styled(button)`
`