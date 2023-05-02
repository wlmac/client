import * as React from "react";
import { loggedIn } from "../../../util/core/AuthService";
import { Session, SessionContext } from "../../../util/core/session";
import { ScheduleSlot } from "../../../util/core/interfaces/schedule";
import Routes from "../../../util/core/misc/routes";
import { Link } from "react-router-dom";

export const Schedule = (): JSX.Element => {
    const [schedule, setSchedule] = React.useState<Array<ScheduleSlot>>([]);
    const [fetched, setFetched] = React.useState(false);
    const session: Session = React.useContext(SessionContext);

    const [currentTime, setCurrentTime] = React.useState(new Date());

    const fetchSchedule = (): void => {
        session.request('get', loggedIn() ? Routes.SCHEDULE.LOGGED_IN : Routes.SCHEDULE.NOT_LOGGED_IN).then((res) => {
            setSchedule(res.data);
            setFetched(true);
        }).catch((err) => {
            if (err.response.status === 404) {
                return;
            }
            if (err.response.status === 401) {
                session.refreshAuth(fetchSchedule);
            }
        });
    }

    React.useEffect(() => {
        fetchSchedule();
    }, []);

    React.useEffect(() => {
        const timerID = setInterval(() => setCurrentTime(new Date()), 1000);

        return () => clearInterval(timerID);
    }, []);

    const timeDigitDisplay = (amt: number, unit: string): string => {
        if (amt <= 0) return '';
        if (amt === 1) return `${amt} ${unit}, `;
        else return `${amt} ${unit}s, `;
    }

    const CurrentCourse = (): JSX.Element => {
        if (schedule.length === 0) { // No courses
            return (
                <>
                    <h4 className="schedule-course">No School</h4>
                    <span className="schedule-description">Enjoy your day!</span>
                </>
            );
        }

        let currentCourse: ScheduleSlot = null!;
        schedule.forEach((slot: ScheduleSlot) => {
            if (currentTime <= new Date(slot.time.end)) { // Check to see if this course has finished
                if (!currentCourse || new Date(slot.time.start) < new Date(currentCourse.time.start)) { // Find the course with the earliest start
                    currentCourse = slot;
                }
            }
        });

        if (!currentCourse) { // No more courses, end of day
            return (
                <>
                    <h4 className="schedule-course">School Over</h4>
                    <span className="schedule-description">Enjoy your evening!</span>
                </>
            );
        }
        else if (currentTime >= new Date(currentCourse.time.start)) { // Check if course is in progress
            var msec = new Date(currentCourse.time.end).getTime() - currentTime.getTime();
            var hh = Math.floor(msec / 1000 / 60 / 60);
            msec -= hh * 1000 * 60 * 60;
            var mm = Math.floor(msec / 1000 / 60);
            msec -= mm * 1000 * 60;
            var ss = Math.floor(msec / 1000);
            msec -= ss * 1000;
            return (
                <>
                    <h4 className="schedule-course">{currentCourse.course}</h4>
                    <span className="schedule-description">{`${currentCourse.description.course}: Ends in ${timeDigitDisplay(hh, "hour")}${timeDigitDisplay(mm, "minute")}${ss} ${ss === 1 ? 'second' : 'seconds'}`}</span>
                </>
            );
        }
        else {
            var msec = new Date(currentCourse.time.start).getTime() - currentTime.getTime();
            var hh = Math.floor(msec / 1000 / 60 / 60);
            msec -= hh * 1000 * 60 * 60;
            var mm = Math.floor(msec / 1000 / 60);
            msec -= mm * 1000 * 60;
            var ss = Math.floor(msec / 1000);
            msec -= ss * 1000;
            return (
                <>
                    <h4 className="schedule-course">{currentCourse.course}</h4>
                    <span className="schedule-description">{`${currentCourse.description.course}: Starts in ${timeDigitDisplay(hh, "hour")}${timeDigitDisplay(mm, "minute")}${ss} ${ss === 1 ? 'second' : 'seconds'}`}</span>
                </>
            );
        }
    }

    return (
        <div className="banner">
            <div className="background"><img alt="" src="/static/img/themes/banners/spring.jpg" /></div>
            <div className="overlay-container valign-wrapper">
                <div className="next-class center-align">
                    {
                        fetched ?
                            <CurrentCourse />
                            :
                            <h4 className="schedule-course">Loading your timetable...</h4>
                    }
                </div>
            </div>
            <div className="schedule-today-overlay hide-on-small-and-down">
                <div className="schedule-today-overlay-container">
                    {fetched && schedule.length > 0 && <h4 className="schedule-cycle">{schedule[0].cycle}</h4>}
                    <div className="schedule-today-courses">
                        {/* <span className="schedule-today-course">Period 1 - HZT4U1.2</span><br />
                            <span className="schedule-today-course">Period 2 - SCH4UP.3</span><br />
                            <span className="schedule-today-course">Period 4 - MDM4UO.2</span><br /> */}
                        {/*
                                "courses" in timetable && timetable.courses.map((course: Course, idx: number): JSX.Element => {
                                    return (
                                        <>
                                            <span className="schedule-today-course">{`Period ${course.position} - ${course.code}`}</span><br />
                                        </>
                                    );
                                })
                            */}
                        {schedule.map((slot: ScheduleSlot): JSX.Element => {
                            return (
                                <>
                                    <span className="schedule-today-course">{slot.description.course} - {slot.course}</span><br />
                                </>
                            );
                        })}
                    </div>
                </div>
            </div>
            {
                !loggedIn() &&
                <div className="overlay-container">
                    <div className="banner-message center-align">
                        <span>
                            <Link to="/accounts/signup/">Sign up</Link> and add your timetable to see a personalized schedule here.
                        </span>
                    </div>
                </div>
            }
        </div>
    );
}