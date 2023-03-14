import React, {useState} from "react";
import "@fullcalendar/react/dist/vdom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { Session, SessionContext } from "../../util/core/session";
import Routes from "../../util/core/misc/routes";

import Organization from "../../util/core/interfaces/organization";

interface EventData{
  name: string, 
  organization: Organization, 
  description: string,
  id: number,
  tags: {color: string}[],
  start_date: string,
  end_date: string,
  is_public: boolean,
  term: number
}

export const Calendar = (): JSX.Element => {
  const [events, setEvents] : [EventData[], (x: EventData[]) => void] = useState<EventData[]>([]);
  const [eventFetch, setEventFetch]: [string, (x: string) => void] = useState<string>("");
  const [selectedDate, setSelectedDate] : [Date | undefined, (x: Date | undefined) => void] = useState<Date | undefined>(new Date(0));
  const [eventsOnDay, setEventsOnDay] : [EventData[], (x: EventData[]) => void] = useState<EventData[]>([]);
  const session: Session = React.useContext(SessionContext);

  const updateEvents = (fetchInfo: {startStr: string, endStr: string}, successCallback: (x: EventData[]) => void, failureCallback: (x: Error) => void) => {
    let key: string = JSON.stringify(fetchInfo);
    if (eventFetch !== key){
      const url = Routes.BASEURL + "/api/events?start=" + fetchInfo.startStr + "&format=json&end=" + fetchInfo.endStr
      console.log(url);
      session.getAPI(url, false).then((response) => {
          if (response.status !== 200) {
              failureCallback(new Error("Returned status " + response.status))
          } else {
              setEventFetch(key);
              setEvents(response.data)
              successCallback(events)
          }
      })
    } else {
      successCallback(events);
    }
  }
  const newDateSelected = (day: Date | undefined) => {
    setSelectedDate(day);

    if(day === undefined) setEventsOnDay([]);
    else {
      let today = day;
      let eventsToday: EventData[] = []
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

  let dateStr = "";
  if(selectedDate !== undefined){
    dateStr = selectedDate.toLocaleDateString(undefined, {
          day: "numeric",
          year: "numeric",
          weekday: "long",
          month: "long"
      })
  }

  return (
    <>
      <link rel="stylesheet" href="static/css/fullcalendar.min.css" type="text/css"/>
      <link rel="stylesheet" href="static/css/calendar/view.css" type="text/css"/>

      <div className="container">
        <CalendarBoard updateEvents={updateEvents} selectedDate={selectedDate}
        setSelectedDate={newDateSelected} eventsOnDay={eventsOnDay}/>

        <div id="details">
          <div className="container">
              <a href="url_to_calendar">URL to iCalendar (use this to add to Google Calendar, not yet implemented sry :/)</a>
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

interface BoardProps{
  updateEvents: (x: {startStr: string, endStr: string}, y: (x: EventData[]) => void, z: (x: Error) => void) => void,
  eventsOnDay: EventData[],
  selectedDate: Date | undefined,
  setSelectedDate: (x: Date | undefined) => void
};
const CalendarBoard = (props: BoardProps): JSX.Element => {
  const updateEvents = props.updateEvents;
  const eventsOnDay = props.eventsOnDay;
  const selectedDate : Date | undefined = props.selectedDate;
  const setSelectedDate : (date: Date | undefined) => void = props.setSelectedDate;
  const aspectRatio = 1.7; // width / height

  const selectedNumberColor = "var(--dark-colour)";

  // reformats a day cell
  const reformatDay = (dayElement: HTMLElement) => {
    if(dayElement.clientHeight < dayElement.clientWidth / aspectRatio){
      dayElement.style.height = dayElement.clientWidth / aspectRatio + "px";
    }

    let el: HTMLElement | null = dayElement.querySelector<HTMLElement>(".fc-daygrid-day-top")
    if(el === null) throw("rendering error");
    let container = document.createElement("div")
    container.classList.add("fc-daygrid-day-number-circle")

    // place the number of the current day inside the container div
    document.createElement("li")
    const curDate = el.querySelector<HTMLElement>(".fc-daygrid-day-number")
    if(curDate != null) container.appendChild<HTMLElement>(curDate)

    // reset the top, and append the container
    el.innerHTML = ""
    el.appendChild(container)

    // make the container a square
    container.style.width = container.clientHeight + "px";
  }

  interface FullCalendarEvent {
    title: string, start: string, end: string, color: string, textColor: string
  }
  // convert the events into smth that fullCalendar uses
  const parseEvents = (toParse: EventData[]): FullCalendarEvent[] => {
      const parsed = [];
      for (let curEvent of toParse) {
          parsed.push({
              title: curEvent.name,
              start: curEvent.start_date, // get rid of the "time" element
              end: curEvent.end_date,
              color: curEvent.tags.length > 0 ? curEvent.tags[0].color : "lightblue",
              textColor: "#434343",
          })
      }
      return parsed;
  }

  // highlights the number for today
  const highlightSelectedNumber = () => {
      // unselect every cell
      document.querySelectorAll(".fc-daygrid-day").forEach(el => {
          const circle = el.querySelector<HTMLElement>(".fc-daygrid-day-number-circle");
          if(circle != null) circle.style.background = ""
          el.querySelector<HTMLElement>(".fc-daygrid-day-number")?.removeAttribute("selected")
      })

      if (selectedDate !== undefined) {
          // get the selected element
          let selectedEl = document.querySelector<HTMLElement>("[data-date='" + selectedDate.toISOString().split("T")[0] + "']")
          if (selectedEl != null) {
              let topEl = selectedEl.querySelector<HTMLElement>(".fc-daygrid-day-top")
              if(topEl == null) throw("reformat error")
              if (topEl.children.length !== 1 || !topEl.children[0].classList.contains(".fc-daygrid-day-number-circle")) {
                  // something weird is going on so we must fix it
                  reformatDay(selectedEl)
              }

              // change the background color of the circle
              const circle = topEl.querySelector<HTMLElement>(".fc-daygrid-day-number-circle");
              if(circle != null) circle.style.backgroundColor = selectedNumberColor;
              topEl.querySelector(".fc-daygrid-day-number")?.setAttribute("selected", "true")
          }
      }
  }

  highlightSelectedNumber();

  var calendar =
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{right: "today prev,next"}}
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
      events = {(fetchInfo, successCallback, failureCallback) => {
        updateEvents(fetchInfo, (event_list: EventData[]) => {successCallback(parseEvents(event_list))}, failureCallback);
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

const Cards = (props: {eventsToday: EventData[],date: Date | undefined}): JSX.Element => {
  const eventsToday = props.eventsToday;
  const date = props.date;

  const cards = date == undefined ? [] : eventsToday.map((event: EventData) => <Card curEvent={event} date={date} />);
  if(cards.length === 0){
    return (<></>);
  } else {
    return <>{cards}</>;
  }
}

const Card = (props: {curEvent: EventData, date: Date}): JSX.Element => {
  const curEvent = props.curEvent;
  const date = props.date;

  // get the start and end dates for the current event
  let eventStart = new Date(curEvent.start_date);
  let eventEnd = new Date(curEvent.end_date);

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

  const tagEls = curEvent.tags.map(tag => <p className="tag" style={{backgroundColor: tag.color}}>tag.name</p>)

  return (
    <table className="dayEvent">
      <tr>
          <td className="leftPanel" style={{backgroundColor: (curEvent.tags.length > 0 ? curEvent.tags[0].color : "lightblue")}}>
              <span className="timeDisplay" id="event_start">{startTime}</span>
              <span className="ampm" id="event_start_ampm">{startAMPM}</span>
              <br />
              <span className="intermediate_to">to</span><br />
              <span className="timeDisplay" id="event_end">{endTime}</span>
              <span className="ampm" id="event_end_ampm">{endAMPM}</span>
          </td>
          <DetailPanel curEvent={curEvent} tagEls={tagEls}/>
      </tr>
      </table>);
}

interface DetailPanelProps {
  curEvent: EventData, 
  tagEls: JSX.Element[]
};

const DetailPanel = (props: DetailPanelProps): JSX.Element => {
  console.log(props);
  const [toTruncate, setToTruncate] = useState(true);
  const curEvent = props.curEvent;
  const tagEls = props.tagEls;

  return (
      <td className="detailPanel">
        <h4 className="event_title">{curEvent.name}</h4>
        <em><a className="eventHost event_host_name">{curEvent.organization.name}</a></em>
        <hr />
        <p className={"event_description " + (toTruncate ? "truncate-100" : "")}
            onClick={() => setToTruncate(!toTruncate)}>
          {curEvent.description.replace(/(?:\r\n|\r|\n)/g, '<br>')}
        </p>
        <div className="tag-section">{tagEls}</div>
      </td>
  );
}
