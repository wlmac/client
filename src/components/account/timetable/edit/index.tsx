import { Autocomplete, TextField } from "@mui/material";
import * as React from "react";
import { Session, SessionContext } from "../../../../util/core/session";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Course, Timetable } from "../../../../util/core/interfaces/timetable";
import Routes from "../../../../util/core/misc/routes";

export const TimetableEdit = (): JSX.Element => {
    const session: Session = React.useContext(SessionContext);
    const nav = useNavigate();

    const { ID } = useParams();

    const [allCourses, setAllCourses] = React.useState<Array<Course>>([]);
    const [selectedCourses, setSelectedCourses] = React.useState<Array<Course>>([]);

    const [timetable, setTimetable] = React.useState({} as Timetable);

    const fetchTimetable = (): void => {
        session.request('get', Routes.PERSONAL_TIMETABLE).then((res) => {
            setTimetable(res.data);
            // console.log(res.data[1]);
        });
    }

    React.useEffect(() => {
        fetchTimetable();
    }, []);

    React.useEffect(() => {
        session.request('get', `${Routes.COURSE}?term=${ID}`).then((res) => {
            setAllCourses(res.data.results);
        });
    }, []);

    const submitForm = (): void => {
        session.request('put', `${Routes.TIMETABLE}/single/${timetable.id}`, {
            term: timetable.term,
            courses: selectedCourses
        }).then(() => {
            session.notify("Successfully updated courses!", "success");
        });
    }

    return (
        <>
            <link rel="stylesheet" href="/static/css/timetable/edit.css" />
            <link rel="stylesheet" href="/static/css/select2.min.css" />
            <div className="card-body" data-select2-id="select2-data-21-vyjo">
                <form onSubmit={(ev) => {
                    ev.preventDefault();
                    submitForm();
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
                        // defaultValue={[top100Films[13]]}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Courses"
                                placeholder="Start typing course code..."
                            />
                        )}
                        sx={{ marginTop: "1.25em", marginBottom: "1.25em" }}
                    />

                    <Link to={`/course/add/term/${1}?next=/timetable/edit/2`}>Add a missing course</Link><br />

                    <div style={{ display: "flex", alignItems: "center", "gap": "3px", marginTop: "1.5em" }}>
                        <button type="submit" className="btn btn-primary mr-2">Save</button>
                        <Link to="/timetable" className="btn btn-primary">Cancel</Link>
                    </div>
                </form>
            </div>
        </>
    );
}