import styled from 'styled-components';

import textAreaAutosize from 'react-textarea-autosize';


import { Form as form } from 'react-bootstrap'

export const Div = styled.div`
`

export const Item = styled.div`
    border-radius: 5px;
    color: #1a1a1a !important;
    position: relative;
    transition: 0.5s;
    background: #f0f0f0;
    padding: 10px;
    border-radius: 10px;
`

const style = `
    padding: 5px 10px;
    border-radius: 10px;
`

export const Title = styled.h1`
    ${style}
    font-family: 'Roboto';
    font-weight: 300;
    border-radius: 5px;
    height: fit-content;
    box-shadow: none;
    background: #fafafa;
`

export const DDate = styled.div`
    font-family: 'Roboto';
    font-weight: 300;
    border-radius: 5px;
    padding: 5px 0px 5px 10px;
`

export const Description = styled.p`
    ${style}
    box-shadow: none;
    border-radius: 5px;
    overflow-y: hidden;
    outline: none;
`

export const Form = styled(form)`
    outline: none;
    box-shadow: none;
`

export const FormControl = styled(form.Control)`
    outline: none;
    box-shadow: none;
`

export const TextareaAutosize = styled(textAreaAutosize)`
`

export const Section = styled.div`
    background: #fafafa;
    border-radius: 5px;
    padding: 10px;

`