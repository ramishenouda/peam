import { Teacher } from "../../../../models/teacher"

type Props = {
    teachers: Array<Teacher>
}

export const CourseTeachers = (props: Props) => {
    let teachers;

    if (props.teachers.length) {
        teachers = props.teachers.map(item => {
            return (
                <p>
                    { item.full_name ? item.full_name : item.username }
                </p>
            )
        })
    }

    return (
        <div>
            { teachers ? teachers : (
                <div>
                    Error while loading the teachers. Please reloard the page. 
                </div>
            )}
        </div>
    )
} 