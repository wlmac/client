import React, { useState } from "react";
import "@fullcalendar/react/dist/vdom";
import FullCalendar, { EventInput } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { Session, SessionContext } from "../../util/core/session";
import { getPaginatedAPI } from "../../util/query/apiQuerying";
import Routes from "../../util/core/misc/routes";

import Tag from "../../util/core/interfaces/tag";
import Organization from "../../util/core/interfaces/organization";
import Event from "../../util/core/interfaces/event";

// ------------------- UTIL -----------------------------
export const getDate = (isoTime: string): string => {
  return isoTime.split("T")[0];
}

// convert the events into smth that fullCalendar uses
export const parseEvents = (toParse: Event[]): EventInput[] => {
  const parsed = [];
  for (let curEvent of toParse) {
  parsed.push({
      title: curEvent.name,
      start: curEvent.start_date, // get rid of the "time" element
      end: curEvent.end_date,
      color: (curEvent.tags[0] ?? { color: "lightblue" }).color,
      textColor: "#434343",
  })
  }
  return parsed;
}

export const Calendar = (): JSX.Element => {
  // raw events, used for caching id's before the session updates
  const [rawEvents, setRawEvents]: [Event[], (x: Event[]) => void] = useState<Event[]>([]);
  // list of events for the current month
  const [events, setEvents]: [Event[], (x: Event[]) => void] = useState<Event[]>([]);
  // the month currently displayed
  const [eventFetch, setEventFetch]: [string, (x: string) => void] = useState<string>("");
  // currently selected date
  const [selectedDate, setSelectedDate]: [Date | undefined, (x: Date | undefined) => void] = useState<Date | undefined>(new Date());
  // events on the currently selected date
  const [eventsOnDay, setEventsOnDay]: [Event[], (x: Event[]) => void] = useState<Event[]>([]);
  // current session
  const session: Session = React.useContext(SessionContext);

  // when the session or events update, try filling in the tags & org
  React.useEffect(() => {
    function parseEvent(raw: Event): Event {
      return Object.assign(Object.assign({}, raw), {
        organization: raw.organization
      })
    }
    setEvents(rawEvents.map(parseEvent));
  }, [session, rawEvents])

  // update the events for the current month
  const updateEvents = (fetchInfo: { startStr: string, endStr: string }, successCallback: (x: Event[]) => void, failureCallback: (x: Error) => void) => {
    let key: string = JSON.stringify(fetchInfo);
    if (eventFetch !== key) {
      // query events for this time period
      const url = `${Routes.BASEURL}/api/v3/obj/event?start=${getDate(fetchInfo.startStr)}&end=${getDate(fetchInfo.endStr)}`

      // gets all urls of a paginated url
      getPaginatedAPI((url: string) => session.request("get", url), url).then((response) => {
        // cache current event
        setEventFetch(key);

        // set the current raw events (organization needs to be queried later)
        setRawEvents(response);
        successCallback(events);
      }, (rejection) => {
        failureCallback(new Error(rejection))
      })
    } else {
      successCallback(events);
    }
  }

  React.useEffect(() => {
    console.log(rawEvents);
  }, [rawEvents]);

  // called when a new date is selected
  const newDateSelected = (day: Date | undefined) => {
    setSelectedDate(day);

    if (day === undefined) setEventsOnDay([]);
    else {
      // update the list of events for this dae
      let today = day;
      let eventsToday: Event[] = []
      let tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
      for (let curEvent of events) {
        let eventStart = new Date(curEvent.start_date)
        let eventEnd = new Date(curEvent.end_date)
        if (eventStart < tomorrow && eventEnd >= today) {
          eventsToday.push(curEvent);
        }
      }
      setEventsOnDay(eventsToday);
    }
  }

  // the string representation of the current date
  let dateStr = "";
  if (selectedDate !== undefined) {
    dateStr = selectedDate.toLocaleDateString(undefined, {
      day: "numeric",
      year: "numeric",
      weekday: "long",
      month: "long"
    })
  }

  return (
    <>
      <link rel="stylesheet" href="/resources/static/css/fullcalendar.min.css" type="text/css" />
      <link rel="stylesheet" href="/resources/static/css/calendar/view.css" type="text/css" />

      <div className="container">
        <CalendarBoard updateEvents={updateEvents} selectedDate={selectedDate}
          setSelectedDate={newDateSelected} />

        <div id="details">
          <div className="container">
            <a href="https://maclyonsden.com/calendar.ics">URL to iCalendar (use this to add to Google Calendar)</a>
            <h3 id="detailsCurrentDay">{dateStr}</h3>
            <p id="detailsCurrentWeek"></p>
            <hr />
            <p className="no-event-inform">No events on this day</p>
            <div id="eventDetails">
              <Cards eventsToday={eventsOnDay} date={selectedDate} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface BoardProps {
  updateEvents: (x: { startStr: string, endStr: string }, y: (x: Event[]) => void, z: (x: Error) => void) => void,
  selectedDate: Date | undefined,
  setSelectedDate: (x: Date | undefined) => void
};

// the calendar interface itself
const CalendarBoard = (props: BoardProps): JSX.Element => {
  // called when events are updated
  const updateEvents = props.updateEvents;
  // currently selected date
  const selectedDate: Date | undefined = props.selectedDate;
  const setSelectedDate: (date: Date | undefined) => void = props.setSelectedDate;
  const aspectRatio = 1.7; // width / height
  // color for the currently selectd number
  const selectedNumberColor = "var(--dark-colour)";
  const session = React.useContext(SessionContext);

  // reformats a day cell
  const reformatDay = (dayElement: HTMLElement) => {
    // resize the date cell
    if (dayElement.clientHeight < dayElement.clientWidth / aspectRatio) {
      dayElement.style.height = dayElement.clientWidth / aspectRatio + "px";
    }

    // create a div to house the "number circle"
    let el: HTMLElement | null = dayElement.querySelector<HTMLElement>(".fc-daygrid-day-top")
    if (el === null) throw ("rendering error");
    let container = document.createElement("div")
    container.classList.add("fc-daygrid-day-number-circle")

    // place the number of the current day inside the container div
    document.createElement("li")
    const curDate = el.querySelector<HTMLElement>(".fc-daygrid-day-number")
    if (curDate != null) container.appendChild<HTMLElement>(curDate)

    // reset the top, and append the container
    el.innerHTML = ""
    el.appendChild(container)

    // make the container a square
    container.style.width = container.clientHeight + "px";
  }

  // event parsed for the fullcalendar api
  interface FullCalendarEvent {
    title: string, start: string, end: string, color: string, textColor: string
  }

  // highlights the number for today
  const highlightSelectedNumber = () => {
    // unselect every cell
    document.querySelectorAll(".fc-daygrid-day").forEach(el => {
      const circle = el.querySelector<HTMLElement>(".fc-daygrid-day-number-circle");
      if (circle != null) circle.style.background = ""
      el.querySelector<HTMLElement>(".fc-daygrid-day-number")?.removeAttribute("selected")
    })

    if (selectedDate !== undefined) {
      // get the selected element
      let selectedEl = document.querySelector<HTMLElement>("[data-date='" + new Date(selectedDate.getTime() - (new Date()).getTimezoneOffset() * 60000).toISOString().split("T")[0] + "']")
      if (selectedEl != null) {
        let topEl = selectedEl.querySelector<HTMLElement>(".fc-daygrid-day-top")
        if (topEl == null) throw ("reformat error")
        if (topEl.children.length !== 1 || !topEl.children[0].classList.contains(".fc-daygrid-day-number-circle")) {
          // something weird is going on so we must fix it
          reformatDay(selectedEl)
        }

        // change the background color of the circle
        const circle = topEl.querySelector<HTMLElement>(".fc-daygrid-day-number-circle");
        if (circle != null) circle.style.backgroundColor = selectedNumberColor;
        topEl.querySelector(".fc-daygrid-day-number")?.setAttribute("selected", "true")
      }
    }
  }

  React.useEffect(() => {
    highlightSelectedNumber();
  }, [selectedDate]);

  var calendar =
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{ right: "today prev,next" }}
      views={{
        dayGridMonth: {
          dayCellDidMount: (dayRenderInfo) => {
            reformatDay(dayRenderInfo.el);
          },
          aspectRatio: 1.7
        }
      }}
      selectable={true}
      selectAllow={(selectInfo) => {
        return selectInfo.end.getTime() - selectInfo.start.getTime() <= (24 * 60 * 60 * 1000);
      }}
      select={(info) => {
        setSelectedDate(new Date(info.start.setHours(0, 0, 0, 0)))
      }}
      unselect={() => {
        setSelectedDate(undefined)
      }}
      events={(fetchInfo, successCallback, failureCallback) => {
        updateEvents(fetchInfo, (event_list: Event[]) => { successCallback(parseEvents(event_list)) }, failureCallback);
      }}
      height={"auto"}
      selectLongPressDelay={0}
    />

  return (<>
    <div id="calendar">
      {calendar}
    </div>
  </>);
}

// UI for the list of cards at the bottom
const Cards = (props: { eventsToday: Event[], date: Date | undefined }): JSX.Element => {
  // list of events for today
  const eventsToday = props.eventsToday;
  // current date
  const date = props.date;

  // a list of cards
  const cards = date == undefined ? [] : eventsToday.map((event: Event) => <Card key={event.id} curEvent={event} date={date} />);
  if (cards.length === 0) {
    return (<></>);
  } else {
    return <>{cards}</>;
  }
}

// a singular card
const Card = (props: { curEvent: Event, date: Date }): JSX.Element => {
  const curEvent = props.curEvent;
  const date = props.date;

  // get the start and end dates for the current event
  let eventStart = new Date(curEvent.start_date);
  let eventEnd = new Date(curEvent.end_date);

  const session = React.useContext(SessionContext);

  // gets the time of the date & formats it
  const timeRepresentation = (date: Date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let minStr: string = minutes < 10 ? '0' + minutes : '' + minutes;
    const strTime = hours + ':' + minStr;
    return [strTime, ampm];
  }

  // formats both the date & time of the date
  const dateTimeRepresentation = (date: Date) => {
    let dateFormat = new Intl.DateTimeFormat().format(date)
    let [time, ampm] = timeRepresentation(date)
    return [dateFormat + " " + time, ampm];
  }

  // if the start date is different from the current date, then we must also add the date information
  let [startTime, startAMPM] = eventStart < date ? dateTimeRepresentation(eventStart) : timeRepresentation(eventStart);
  let [endTime, endAMPM] = eventEnd >= new Date(date.getTime() + 24 * 60 * 60 * 1000) ?
    dateTimeRepresentation(eventEnd) : timeRepresentation(eventEnd);

  const tagEls = curEvent.tags.map(tag => <p key={curEvent.name + "|" + tag.name} className="tag" style={{ backgroundColor: (tag ?? { color: "lightblue" }).color }}>{tag.name}</p>)

  return (
    <table className="dayEvent">
      <tbody>
        <tr>
          <td className="leftPanel" style={{ backgroundColor: (curEvent.tags[0] ?? { color: "lightblue" }).color }}>
            <span className="timeDisplay" id="event_start">{startTime}</span>
            <span className="ampm" id="event_start_ampm">{startAMPM}</span>
            <br />
            <span className="intermediate_to">to</span><br />
            <span className="timeDisplay" id="event_end">{endTime}</span>
            <span className="ampm" id="event_end_ampm">{endAMPM}</span>
          </td>
          <DetailPanel curEvent={curEvent} tagEls={tagEls} />
        </tr>
      </tbody>
    </table>);
}

interface DetailPanelProps {
  curEvent: Event,
  tagEls: JSX.Element[]
};

// subpanel of a card - displays the details of the card
const DetailPanel = (props: DetailPanelProps): JSX.Element => {
  const [toTruncate, setToTruncate] = useState(true);
  const curEvent = props.curEvent;
  const tagEls = props.tagEls;
  const session: Session = React.useContext(SessionContext);

  return (
    <td className="detailPanel">
      <h4 className="event_title">{curEvent.name}</h4>
      <em><a className="eventHost event_host_name">{(curEvent.organization ?? { name: "" }).name}</a></em>
      <hr />
      <p className={"event_description"} style={{transitionDuration: "0.5s", maxHeight: toTruncate ? "100px" : "fit-content"}}
        onMouseEnter={() => setToTruncate(false)} onMouseLeave={() => setToTruncate(true)}>
        {curEvent.description.replace(/(?:\r\n|\r|\n)/g, '<br>')}
      </p>
      <div className="tag-section">{tagEls}</div>
    </td>
  );
}
