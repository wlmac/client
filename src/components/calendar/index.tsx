import React, {useState} from "react";
import "@fullcalendar/react/dist/vdom";
import FullCalendar, { Interaction }  from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { Session, SessionContext } from "../../util/core/session";
import Routes from "../../util/core/misc/routes";
import { loggedIn } from "../../util/core/AuthService";

export const Calendar = (): JSX.Element => {
  const [events, setEvents] = useState([]);
  const [eventFetch, setEventFetch] = useState(undefined);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [eventsOnDay, setEventsOnDay] = useState([]);
  const session: Session = React.useContext(SessionContext);

  const updateEvents = (fetchInfo, successCallback, failureCallback) => {
    let key: string = JSON.stringify(fetchInfo);
    if (eventFetch !== key){
      const url = Routes.OBJECT + "/events?start=" + fetchInfo.startStr + "&format=json&end=" + fetchInfo.endStr
      console.log(url);
      session.getAPI(url).then((response) => {
          if (response.status !== 200) {
              failureCallback("Returned status " + status)
          } else {
              events[key] = response.data
              console.log(response);
              setEventFetch(key);
              setEvents(events[key])
              successCallback(events[key])
              if (selectedDate != null) {
                  calendar.select(selectedDate)
              }
          }
      })
    } else {
      successCallback(events);
    }
  }
  const newDateSelected = (day) => {
    setSelectedDate(day);

    if(day === undefined) setEventsOnDay([]);
    else {
      let today = day;
      let eventsToday = []
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

      <div class="container">
        <CalendarBoard updateEvents={updateEvents} selectedDate={selectedDate}
        setSelectedDate={newDateSelected} eventsOnDay={eventsOnDay}/>

        <div id="details">
          <div class="container">
              <a href="url_to_calendar">URL to iCalendar (use this to add to Google Calendar, not yet implemented sry :/)</a>
              <h3 id="detailsCurrentDay">{dateStr}</h3>
              <p id="detailsCurrentWeek"></p>
              <hr />
              <p class="no-event-inform">No events on this day</p>
              <div id="eventDetails">
                <Cards eventsToday={eventsOnDay} date={selectedDate} />
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

const CalendarBoard = (props): JSX.Element => {
  const updateEvents = props.updateEvents;
  const eventsOnDay = props.eventsOnDay;
  const selectedDate = props.selectedDate;
  const setSelectedDate = props.setSelectedDate;
  const aspectRatio = 1.7; // width / height

  const selectedNumberColor = "var(--dark-colour)";

  // reformats a day cell
  const reformatDay = (dayElement) => {
    if(dayElement.clientHeight < dayElement.clientWidth / aspectRatio){
      dayElement.style.height = dayElement.clientWidth / aspectRatio + "px";
    }

    let el = dayElement.querySelector(".fc-daygrid-day-top")
    let container = document.createElement("div")
    container.classList.add("fc-daygrid-day-number-circle")

    // place the number of the current day inside the container div
    container.appendChild(el.querySelector(".fc-daygrid-day-number"))

    // reset the top, and append the container
    el.innerHTML = ""
    el.appendChild(container)

    // make the container a square
    container.style.width = container.clientHeight + "px";
  }
  // convert the events into smth that fullCalendar uses
  const parseEvents = (toParse) => {
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
      return parsed
  }

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  // highlights the number for today
  const highlightSelectedNumber = () => {
      // unselect every cell
      document.querySelectorAll(".fc-daygrid-day").forEach(el => {
          el.querySelector(".fc-daygrid-day-number-circle").style.backgroundColor = ""
          el.querySelector(".fc-daygrid-day-number").removeAttribute("selected")
      })

      if (selectedDate !== undefined) {
          // get the selected element
          let selectedEl = document.querySelector("[data-date='" + selectedDate.toISOString().split("T")[0] + "']")
          if (selectedEl != null) {
              let topEl = selectedEl.querySelector(".fc-daygrid-day-top")
              if (topEl.children.length !== 1 || !topEl.children[0].classList.contains(".fc-daygrid-day-number-circle")) {
                  // something weird is going on so we must fix it
                  reformatDay(selectedEl)
              }

              // change the background color of the circle
              topEl.querySelector(".fc-daygrid-day-number-circle").style.backgroundColor = selectedNumberColor;
              topEl.querySelector(".fc-daygrid-day-number").setAttribute("selected", true)
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
        updateEvents(fetchInfo, (event_list) => {successCallback(parseEvents(event_list))}, failureCallback);
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

const Cards = (props): JSX.Element => {
  const eventsToday = props.eventsToday;
  const date = props.date;

  const cards = eventsToday.map(event => <Card curEvent={event} date={date} />);
  if(cards.length === 0){
    return (<></>);
  } else {
    return <>{cards}</>;
  }
}

const Card = (props): JSX.Element => {
  const curEvent = props.curEvent;
  const date = props.date;

  // get the start and end dates for the current event
  let eventStart = new Date(curEvent.start_date);
  let eventEnd = new Date(curEvent.end_date);

  // gets the time of the date & formats it
  const timeRepresentation = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes;
    return [strTime, ampm];
  }

  // formats both the date & time of the date
  const dateTimeRepresentation = (date) => {
    let dateFormat = new Intl.DateTimeFormat().format(date)
    let [time, ampm] = timeRepresentation(date)
    return [dateFormat + " " + time, ampm];
  }

  // if the start date is different from the current date, then we must also add the date information
  let [startTime, startAMPM] = eventStart < date ? dateTimeRepresentation(eventStart) : timeRepresentation(eventStart);
  let [endTime, endAMPM] = eventEnd >= new Date(date.getTime() + 24 * 60 * 60 * 1000) ?
      dateTimeRepresentation(eventEnd) : timeRepresentation(eventEnd);

  const tagEls = curEvent.tags.map(tag => <p class="tag" style={{backgroundColor: tag.color}}>tag.name</p>)

  return (
    <table class="dayEvent">
      <tr>
          <td class="leftPanel" style={{backgroundColor: (curEvent.tags.length > 0 ? curEvent.tags[0].color : "lightblue")}}>
              <span class="timeDisplay" id="event_start">{startTime}</span>
              <span class="ampm" id="event_start_ampm">{startAMPM}</span>
              <br />
              <span class="intermediate_to">to</span><br />
              <span class="timeDisplay" id="event_end">{endTime}</span>
              <span class="ampm" id="event_end_ampm">{endAMPM}</span>
          </td>
          <DetailPanel curEvent={curEvent} tagEls={tagEls}/>
      </tr>
      </table>);
}

const DetailPanel = (props): JSX.Element => {
  const [toTruncate, setToTruncate] = useState(true);
  const curEvent = props.curEvent;
  const tagEls = props.tagEls;

  return (
      <td class="detailPanel">
        <h4 class="event_title">{curEvent.name}</h4>
        <em><a class="eventHost event_host_name">{curEvent.organization.name}</a></em>
        <hr />
        <p class={"event_description " + (toTruncate ? "truncate-100" : "")}
            onClick={() => setToTruncate(!toTruncate)}>
          {curEvent.description.replace(/(?:\r\n|\r|\n)/g, '<br>')}
        </p>
        <div class="tag-section">{tagEls}</div>
      </td>
  );
}
