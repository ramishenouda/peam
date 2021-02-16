import React from 'react';

import AsyncSelect from 'react-select/async';

import { Button } from 'react-bootstrap';

import { SearchUsers } from '../../../../../services/user-service';

import { Section } from '../settings-style'

type Props = {
    
};
export const Teachers = (props: Props) => {
    return (
        <Section id="add-students">
            <p className="f1 mt-3">
                Invite Teachers
            </p>
            <hr />
            <div>
                <AsyncSelect isMulti cacheOptions loadOptions={SearchUsers} />
            </div>
            <div>
                <Button variant="dark" className="my-2 px-5 py-2"> Send Invite </Button>
            </div>
        </Section>
    );
};