import React from 'react';
import { Link } from 'react-router-dom';

import { Div } from '../../course-page/course-components/settings/settings-components/teachers/style';

import { Description, Title } from '../settings-style';

type Props = {
    options: {}
};

export const Teams = (props: Props) => {
    let data: any = props.options;

    const view = data.teams.map((item: any) => {
        return (
            <Div className="p-3 mt-2">
                <Title  className="disable-link-style link f1">
                    {
                        item.name
                    }
                </Title>
            </Div>
        )
    });

    return (
        <div>
            { view }
        </div>
    );
};
