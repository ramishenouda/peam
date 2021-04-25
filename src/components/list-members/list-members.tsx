/*
    Takes a list of users and show them
*/
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

import { Member } from "../../models/memeber";
import teacherAvatar from '../../assets/teacher-avatar.png';

import { Div, VerticalCenterdElement } from '../../style';

type Props = {
    members: Array<Member>;
    showButton?: boolean;
    ButtonText?: string;
    optionFuncton?: (member: Member) => void;
}

export const ListMembers = (props: Props) => {
    let members;
    if (props.members) {
        members = props.members.map(item => {
            const pictureURL = item.avatar ? item.avatar : teacherAvatar
            return (
                <Div className={`px-3 pt-2 mb-2 text-dark bg-g-dark pb-5`}>
                    <VerticalCenterdElement left={"10px"} key={item.username}>
                        <img src={pictureURL}
                            className="mr-2"
                            alt='teacher'
                            width='40px'
                            height='40px'
                        />
                        <Link to={"/" + item.username} className="link">
                            { item.name ? item.name : item.username }
                        </Link>
                    </VerticalCenterdElement>
                    {
                        props.showButton &&
                        <VerticalCenterdElement right={"10px"}>
                            <Button onClick={() => {props.optionFuncton && props.optionFuncton(item)}} variant="dark">
                                { props.ButtonText }
                            </Button>
                        </VerticalCenterdElement>
                    }
                </Div>
            )
        })
    }

    return (
        <div>
            { members ? (
                    members
                ) : (
                    <div>
                        Error while loading the teachers.<br/>Please reloard the page. 
                    </div>
                )
            }
        </div>
    )
} 