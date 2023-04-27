import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import * as React from "react";
import { Link, NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { Session, SessionContext } from "../../../../../util/core/session";
import Routes from "../../../../../util/core/misc/routes";

export const NewCourse = (): JSX.Element => {
    const session: Session = React.useContext(SessionContext);
    const nav: NavigateFunction = useNavigate();
    const { ID } = useParams();

    const [code, setCode] = React.useState("");
    const [position, setPosition] = React.useState<number>(-1);

    const submitNewCourse = (): void => {
        session.postAPI(`${Routes.COURSE}/new`, {
            code: code,
            position: position,
            term: ID
        }).then(() => {
            session.notify(`Course ${code} was successfully added!`, "success");
            nav(`/timetable/edit/${ID}`);
        }).catch((err) => {
            if (err.response.status === 401) {
                session.refreshAuth();
                submitNewCourse();
                return;
            }
            session.notify("An internal error occurred. Please contact an admin to get it fixed!", "error");
        });
    }

    return (
        <>
            <link rel="stylesheet" href="/static/css/secondary.css" />
            <link rel="stylesheet" href="/static/css/timetable/main.css" />
            <link rel="stylesheet" href="/static/css/timetable/new_course.css" />
            <form onSubmit={(ev) => {
                ev.preventDefault();
                submitNewCourse();
            }}>
                <h6 className="card-subtitle mb-2 text-muted card-top">Add a course for Test term</h6>

                <label htmlFor="id_code" className="active">Code:</label>

                <input type="text" onChange={(ev) => {
                    setCode(ev.target.value);
                }} name="code" maxLength={16} placeholder="Ex. AAA1O1" required id="id_code" />
                <label className="active">On Day 1, which period is this course in?</label>

                {/* <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl> */}

                <div id="id_position">
                    <div>
                        <label htmlFor="id_position_0">
                            <input onClick={() => setPosition(1)} type="radio" name="position" value="1" required id="id_position_0" />
                            Period 1
                        </label>
                    </div>

                    <div>
                        <label htmlFor="id_position_1">
                            <input onClick={() => setPosition(2)} type="radio" name="position" value="2" required id="id_position_1" />
                            Period 2
                        </label>
                    </div>

                    <div>
                        <label htmlFor="id_position_2">
                            <input onClick={() => setPosition(3)} type="radio" name="position" value="3" required id="id_position_2" />
                            Period 3
                        </label>
                    </div>

                    <div>
                        <label htmlFor="id_position_3">
                            <input onClick={() => setPosition(4)} type="radio" name="position" value="4" required id="id_position_3" />
                            Period 4
                        </label>

                    </div>

                    <div>
                        <label htmlFor="id_position_4">
                            <input onClick={() => setPosition(5)} type="radio" name="position" value="5" required id="id_position_4" />
                            This course is a 2-credit Co-op in the morning.
                        </label>
                    </div>

                    <div>
                        <label onClick={() => setPosition(6)} htmlFor="id_position_5"><input type="radio" name="position" value="6" required id="id_position_5" />
                            This course is a 2-credit Co-op in the afternoon.</label>
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", "gap": "3px", marginTop: "1.5em" }}>
                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                    <Link to="/timetable" className="btn btn-primary">Cancel</Link>
                </div>
            </form>
        </>
    );
}