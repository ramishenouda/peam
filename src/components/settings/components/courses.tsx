import React from 'react';
import { Link } from 'react-router-dom';

import { Div } from '../../course-page/course-components/settings/settings-components/teachers/style';

import { Description, Title } from '../settings-style';

type Props = {
    options: {}
};

export const Courses = (props: Props) => {
    let data: any = props.options;
    const view = data.courses.map((item: any) => {
        return (
            <Div className="p-3 mt-2">
                <Link to={`/${item.owner.username}/${item.code}`} className="disable-link-style link f1">
                    <Title>
                        {
                            item.title
                        }
                    </Title>
                </Link>
                <Description className="f2">
                    {
                        item.description
                    }
                </Description>
            </Div>
        )
    });

    return (
        <div>
            { view }
        </div>
    );
};