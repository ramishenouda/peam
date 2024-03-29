import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { CourseState } from '../../../../store/course/types';

import { Requirements } from '../settings/settings-components/requirements/requirements';
import { Attachments } from './attachments/attachments';
import { ListMembers } from '../../../list-members/list-members';

import './overview-style.css';

type Props = {

}

export const OverView = (props: Props) => {
    const courseState: CourseState = useSelector((state: any) => state.course);

    const [windowSize, setWindowSize] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', setSize);

        return function cleanup () {
            window.removeEventListener('resize', setSize);
        }
    }, []);

    const setSize = () => {
        setWindowSize(window.innerWidth)
    }

    const isSmallScreen = windowSize < 769;

    return (
        <div id="course-over-view">
            <div>
                <Requirements />
            </div>
            <div>
                {
                    !isSmallScreen &&
                    <div>
                        <h1 className={`f3 overview-title ${isSmallScreen && 'mt-2'}`}>
                            About
                        </h1>
                        <p className="overview-description peam-title-1 mt-2">
                            { courseState.description }
                        </p>
                    </div>
                }
                <div className="separator">
                    <hr/>
                </div>
                <div>
                    <h1 className={`f3 overview-title ${isSmallScreen && 'mt-4 text-center'}`}>Teachers</h1>
                    {isSmallScreen && 
                        <div className="mb-2"> 
                            <hr style={{width: '140px', textAlign: 'center', margin: 'auto'}} />
                        </div>
                    }
                    <ListMembers members={ courseState.teachers }/>
                </div>
                <div className="separator">
                    <hr/>
                </div>
                <div>
                    <h1 className={`f3 overview-title ${isSmallScreen && 'mt-4 text-center'}`}>Attachments</h1>
                    {isSmallScreen && 
                        <div className="mb-2"> 
                            <hr style={{width: '140px', textAlign: 'center', margin: 'auto'}} />
                        </div>
                    }
                    <Attachments attachments={ courseState.attachments }/>
                </div>
            </div>
        </div>
    );
}
