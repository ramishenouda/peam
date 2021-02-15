import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { CourseState } from '../../../../store/course/types';

import { StudentForCourseList as student } from '../../../../models/student';
import { GetCourseStudents } from '../../../../services/course-service';

import View from './course-students-view'


function CourseStudents () {
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(false);
    const [students, setStudents] = useState(Array<student>());
    const [filterdStudents, setFilterdStudents] = useState(Array<student>());
    const [searchValue, setSearchValue] = useState('');

    const courseState: CourseState = useSelector((state: any) => state.course);

    useEffect(() => {
        let canUnload = false;
        setTimeout(() => { canUnload = true; }, 500);

        GetCourseStudents(courseState.courseOwner, courseState.courseCode)
        .then((result) => {
            setStudents(result.data.students);
        }).catch((err) => {
            setError(true);
            console.log(err);
        }).finally(() => {
            if(canUnload === true)
                setFetching(false);
            else {
                setTimeout(() => { setFetching(false); }, 500);
            }
        });
    })

    const searchStudents = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value;
        setSearchValue(searchValue);

        if (searchValue === '') {
            setFilterdStudents([]);
            return;
        }

        const filterdStudents = students.filter(student => {
            return searchValue.trimStart().toLowerCase() === (
                student.fullName.slice(0, searchValue.length).toLowerCase() || student.username.slice(0, searchValue.length).toLowerCase()
            )
        })

        setFilterdStudents(filterdStudents);
    }

    if (fetching) {
        return <div> Loading </div>
    } else if (error) {
        return <div> Error </div>
    } else {
        return (
            <View
                searchStudents={searchStudents}
                students={students}
                filteredStudents={filterdStudents}
                searchValue={searchValue}
                role={courseState.role}
            />
        )
    }
}

export default CourseStudents;
