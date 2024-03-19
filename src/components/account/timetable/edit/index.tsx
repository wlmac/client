import { Autocomplete, TextField } from "@mui/material";
import * as React from "react";
import { Session, SessionContext } from "../../../../util/core/session";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Course, Timetable, Term } from "../../../../util/core/interfaces/timetable";
import Routes from "../../../../util/core/misc/routes";
import "../../../../../public/resources/static/css/timetable/main.css";

export const TimetableEdit = (): JSX.Element => {
    const session: Session = React.useContext(SessionContext);
    const nav = useNavigate();

    const [timetable, setTimetable] = React.useState<Timetable | undefined>(undefined);
    const [term, setTerm] = React.useState<Term | undefined>(undefined);

    const fetchTimetable = (): void => {
        session.request('get', Routes.PERSONAL_TIMETABLE).then((res) => {
            setTimetable(res.data);
            session.request('get', `${Routes.OBJECT}/term?id=${res.data.term.id}`).then((res) => {
                setTerm(res.data.results[0]);
            })
        });
    }

    React.useEffect(() => {
        fetchTimetable();
    }, []);

    const submitForm = (selectedCourses: Array<Course>): void => {
        if(timetable){
            session.request('put', `${Routes.TIMETABLE}/single/${timetable.id}`, {
                term: timetable.term.id,
                courses: selectedCourses.map((course: Course): number => {
                    return course.id
                }),
                owner: session.user.id
            }).then(() => {
                session.notify("Successfully updated courses!", "success");
                nav(`/timetable`)
            });
        }
    }

    return timetable && term ? <TimetableEditor term={term} submitForm={submitForm} defaultCourses={timetable.courses} /> : <></>
}

export const TimetableAdd = (): JSX.Element => {
    const session: Session = React.useContext(SessionContext);
    const { ID } = useParams();
    const [term, setTerm] = React.useState<Term | undefined>(undefined);

    React.useEffect(() => {
        session.request('get', `${Routes.OBJECT}/term?id=${ID}`).then((res) => {
            if(res.status === 200){
                if(res.data.results?.length > 0){
                    setTerm(res.data.results[0])
                }
            }
        })
    }, [])

    return term ? <TimetableEditor term={term} submitForm={(courses: Array<Course>) => {
        session.request('post', `${Routes.OBJECT}/timetable/new`, {
            term: term.id,
            courses: courses.map(i => i.id),
            owner: session.user.id
        })
    }} defaultCourses={[]}></TimetableEditor> : <></>
}

const TimetableEditor = (params: {
    term: Term, submitForm: (course: Array<Course>) => void, defaultCourses: Array<Course>
}): JSX.Element => {
    const term = params.term;
    
    const allCourses = term.courses;
    const [selectedCourses, setSelectedCourses] = React.useState<Array<Course>>(params.defaultCourses);

    return (
        <>
            <link rel="stylesheet" href="/resources/static/css/timetable/edit.css" />
            <link rel="stylesheet" href="/resources/static/css/select2.min.css" />
            <div className="card-body" data-select2-id="select2-data-21-vyjo">
                <form onSubmit={(ev) => {
                    ev.preventDefault();
                    params.submitForm(selectedCourses);
                }} data-select2-id="select2-data-20-cr8n">
                    <h5 className="card-title"><strong>Edit timetable for Test term</strong></h5>
                    <input type="hidden" name="csrfmiddlewaretoken" value="dUBPiwcYI3sSDgC52qu3o8cutarEiO1xML4iteigRLs9eEEA26us3LXlBdxidNAh" />

                    {/* <label htmlFor="id_courses">Courses:</label> */}

                    <Autocomplete
                        multiple
                        onChange={(event, value) => {
                            setSelectedCourses(value);
                        }}
                        id="tags-outlined"
                        options={allCourses}
                        getOptionLabel={(option: Course) => option.code}
                        value={selectedCourses}
                        filterSelectedOptions
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Courses"
                                placeholder="Start typing course code..."
                            />
                        )}
                        sx={{ marginTop: "1.25em", marginBottom: "1.25em" }}
                    />

                    <Link to={`/course/add/term/${term.id}?next=${encodeURIComponent(window.location.pathname)}`}>Add a missing course</Link><br />

                    <div style={{ display: "flex", alignItems: "center", "gap": "3px", marginTop: "1.5em" }}>
                        <button type="submit" className="btn btn-primary mr-2">Save</button>
                        <Link to="/timetable" className="btn btn-primary">Cancel</Link>
                    </div>
                </form>
            </div>
        </>
    );
}