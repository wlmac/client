import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import * as React from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { loggedIn } from "../../../util/core/AuthService";
import { Course, Timetable, Term } from "../../../util/core/interfaces/timetable";
import Routes from "../../../util/core/misc/routes";
import { Session, SessionContext } from "../../../util/core/session";
import { ProfileNav } from "../left-nav";

const TimetableElement = (props: { timetable: Timetable }): JSX.Element => {

    const CourseElement = (props: { course_1: { code: string }, course_2: { code: string } }): JSX.Element => {
        const course_1 = props.course_1, course_2 = props.course_2;
        return (
            <>
                <td>{course_1 ? course_1.code : "-"}</td><td>{course_2 ? course_2.code : "-"}</td>
            </>
        );
    }

    const timetable = props.timetable;
    const [courses, setCourses] = React.useState(Array(5));

    React.useEffect(() => {
        for (let i = 0; i < timetable.courses.length; i++) {
            const course = timetable.courses[i];
            courses[course.position] = course;
        }
        setCourses([...courses]);
    }, []);

    return (
        <details className="mb-3" open>
            <summary className="card-top">
                <span className="card-title"><strong>{timetable.term.name}</strong></span>
            </summary>
            <div className="card-body timetable-details" id="card-body-1" hidden={false}>
                <p className="card-text"></p>
                <table className="table"><thead><tr><th scope="col">Period</th><th scope="col">Day 1</th><th scope="col">Day 2</th></tr></thead>
                    <tbody>
                        <tr>
                            <th scope="row">09:00 am - 10:15 am</th>
                            <CourseElement course_1={courses[1]} course_2={courses[1]} />
                        </tr>
                        <tr>
                            <th scope="row">10:20 am - 11:35 am</th>
                            <CourseElement course_1={courses[2]} course_2={courses[2]} />
                        </tr>
                        <tr>
                            <th scope="row">12:20 pm - 01:35 pm</th>
                            <CourseElement course_1={courses[3]} course_2={courses[4]} />
                        </tr>
                        <tr>
                            <th scope="row">01:40 pm - 02:55 pm</th>
                            <CourseElement course_1={courses[4]} course_2={courses[3]} />
                        </tr>
                    </tbody>
                </table>
                <p></p>
                <Link to={`/timetable/edit/${timetable.term.id}`} className="card-link">Edit timetable</Link>
            </div>
        </details>
    );
}

export const TimetablePage = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();
    const [timetable, setTimetable] = React.useState({} as Timetable);
    const [noTimetable, setNoTimetable] = React.useState(false);
    const [term, setTerm] = React.useState({} as Term);
    const session: Session = React.useContext(SessionContext);

    const fetchTimetable = (): void => {
        if (loggedIn()) {
            session.request('get', Routes.PERSONAL_TIMETABLE).then((res) => {
                setTimetable(res.data);
                setNoTimetable(false);
            }).catch((err) => {
                setNoTimetable(true);
            });
        }
    }

    const dateInBetween = (start: string, current: Date, end: string): boolean => {
        return new Date(start) <= current && current <= new Date(end) ? true : false;
    }

    const fetchTerm = (): void => {
        if(loggedIn()) {
            session.request('get', `${Routes.OBJECT}/term`).then((res) => {
                if(res.status === 200){
                    if(res.data.results?.length > 0){
                        const curTerm: Term = res.data.results[0];
                        if(dateInBetween(curTerm.start_date, new Date(), curTerm.end_date)){
                            setTerm(curTerm);
                        }
                    }
                }
            }).catch((err) => {
                if(err.status === 404){
                    return;
                }
                session.refreshAuth();
                fetchTimetable();
            })
        }
    }

    React.useEffect(() => {
        fetchTimetable();
    }, []);

    React.useEffect(() => {
        fetchTerm();
    }, [])

    const createTimetable = (): void => {
        nav(`/timetable/add/${term.id}`);
    }

    // console.log(term)
    // console.log(noTimetable)
    return (
        <>
            <link rel="stylesheet" href="/resources/static/css/timetable/list.css" />
            <link rel="stylesheet" href="/resources/static/css/timetable/main.css" />
            <link rel="stylesheet" href="/resources/static/css/base.css" />

            <link rel="stylesheet" href="/resources/static/css/secondary.css" />

            <div className="container">
                <ProfileNav />

                <div className="white-bg">
                    {
                        "id" in timetable ?
                            <TimetableElement timetable={timetable} />
                            :
                            <div className="timetable-add-container">
                                <div className="card-body">
                                    <form onSubmit={(ev) => { ev.preventDefault(); createTimetable(); }}>
                                        <h5 className="card-title">Add timetable</h5>
                                        <hr />
                                        <input type="hidden" name="csrfmiddlewaretoken" value="M5IY2bEzx9c5zEI25e3yzsF7XGycqazLGhT6fs8hrUw5fUunY4kgQZETZDpblGVm" />

                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Term</InputLabel>
                                                {term && noTimetable ? <Select
                                                    labelId={term.name}
                                                    id={"" + term.id}
                                                    value={term.id}
                                                    label="Term"
                                                >
                                                        <MenuItem value={term.id}>{term.name}</MenuItem>
                                                    </Select> : 
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={0}
                                                    label="Term"
                                                >
                                                    <MenuItem value={0}>---------</MenuItem>
                                                </Select>}
                                            </FormControl>
                                        </Box>

                                        <div className="mt-3">
                                            <button type="submit" id="continue-button" className="btn btn-primary mr-2" style={{ letterSpacing: 0 }}>Continue</button>
                                            <Link to={`/user/${session.user.username}`} className="btn btn-primary" role="button" aria-pressed="true">Cancel</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                    }
                </div>

            </div>
        </>
    );
}
