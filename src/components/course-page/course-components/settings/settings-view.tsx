import React, { useState } from 'react';

import { SearchUsers } from '../../../../services/user-service';

import AsyncSelect from 'react-select/async';

import { CourseInfo } from './settings-components/course-info';
import { Container, Separator } from './settings-style';
import { SettingsNavbar } from './settings-navbar';

type Props = {

};

export const SettingsView = (props: Props) => {
    const [tab, setTab] = useState(0);

    return (
        <Container className="mt-4">
            <SettingsNavbar
                setTab={setTab}
                active={tab}
            />
            <Separator className="py-3"></Separator>
            {
                tab === 0 && <CourseInfo />
            }
            {
                tab === 1 &&
                <section id="add-students">
                    <div>
                        <p className="f1 mt-3">
                            Add students
                        </p>
                        <hr />
                        <div>
                            <AsyncSelect isMulti cacheOptions loadOptions={SearchUsers} />
                        </div>
                    </div>
                </section>
            }
        </Container>
    );
};