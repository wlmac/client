import React, {useState} from 'react';
import "@fullcalendar/react/dist/vdom";
import FullCalendar, { DayCellMountArg, EventInput } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Routes from "../../../util/core/misc/routes";
import Event from '../../../util/core/interfaces/event';
import { getPaginatedAPI } from "../../../util/query/apiQuerying";
import { Session, SessionContext } from "../../../util/core/session";
import { getDate, parseEvents } from '../../calendar';
import './mini-calendar.css';

// mini week-long calendar
const MiniCalendar = () => {
    const session: Session = React.useContext(SessionContext);
    const aspectRatio = 1.7
    // order border style
    const outerBorder = "solid 4px #DDDDDD"
    const innerBorder = "solid 1px #999999"
    const minCellHeight = 100
    // current day
    const curDay = new Date().getDay()

    // update the events for the current month
    const updateEvents = (fetchInfo: { startStr: string, endStr: string }, successCallback: (x: Event[]) => void, failureCallback: (x: Error) => void) => {
        // query events for this time period
        const url = `${Routes.BASEURL}/api/v3/obj/event?start=${getDate(fetchInfo.startStr)}&end=${getDate(fetchInfo.endStr)}`

        // gets all urls of a paginated url
        getPaginatedAPI((url: string) => session.request("get", url), url).then((response) => {
            // set the current raw events (organization needs to be queried later)
            successCallback(response);
        }, (rejection) => {
            failureCallback(new Error(rejection))
        })
    }

      // reformats a day cell
    const reformatDay = (mountArg: DayCellMountArg) => {
        const dayEl = mountArg.el
        const innerEl = mountArg.el.querySelector<HTMLElement>('.fc-daygrid-day-frame')
        const elHeight = Math.max(minCellHeight, dayEl.clientWidth / aspectRatio) + 'px';
        // resize the date cell
        if (dayEl.clientHeight < dayEl.clientWidth / aspectRatio) {
            dayEl.style.height = elHeight
        }

        // get rid of table borders
        dayEl.style.border = 'none'
        dayEl.classList.add('inherit-cell')

        // inner borders
        if(mountArg.date.getDay() != (curDay+6)%7) dayEl.style.borderRight = innerBorder

        if(innerEl){
            // round the borders and set inner element height
            if(mountArg.date.getDay() == curDay) {
                innerEl.style.borderLeft = outerBorder
                innerEl.style.borderBottomLeftRadius = '10px'
            }
            if(mountArg.date.getDay() == (curDay+6)%7) {
                innerEl.style.borderRight = outerBorder
                innerEl.style.borderBottomRightRadius = '10px'
            }
            innerEl.style.borderBottom = outerBorder
            innerEl.style.height = elHeight
            innerEl.style.padding = '3px'
          }
    }

    // calendar
    let calendar = <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridWeek"
        headerToolbar={{ right: "" }}
        views={{
            dayGridWeek: {
                dayCellDidMount: (dayRenderInfo) => {
                    reformatDay(dayRenderInfo);
                },
                aspectRatio: 1.7,
                dayHeaderContent: (arg) => {
                    // get current day
                    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
                    const date = arg.date;
                    const curDay = days[date.getDay()]
                    const largeHeader = window.innerWidth > 1000

                    // current date
                    const dayNum = date.getDate()
                    const largeStyling = {
                        padding: '2px 10px',
                        fontSize: '1.2em'
                    }
                    const smallStyling = {
                        padding: '2px 0',
                        fontSize: '1em'
                    }
                    
                    return <div style={{display: 'flex', justifyContent: 'space-between', ...(largeHeader ? largeStyling : smallStyling)}}>
                        <div><span>{curDay}</span></div>
                        {(largeHeader && <div><span style={{marginRight: '0'}}>{dayNum}</span></div>)}
                    </div>
                },
                dayHeaderDidMount: (mountArg) => {
                    // remove the padding (so that it takes up the entire heading)
                    const pad = mountArg.el.querySelector<HTMLElement>('.fc-col-header-cell-cushion')
                    const con = mountArg.el.querySelector<HTMLElement>('.fc-scrollgrid-sync-inner') // container for calendar
                    if(pad){
                        pad.style.width = '100%'
                        pad.classList.add('inherit-cell')
                        pad.style.color = 'var(--highlight-colour)'
                    }

                    // remove border
                    mountArg.el.style.border = 'none'
                    if(con){
                        con.style.height = '3em'
                        // round borders
                        con.style.backgroundColor = "var(--dark-colour)"
                        if(mountArg.date.getDay() == curDay){
                            con.style.borderTopLeftRadius = "10px"
                            con.style.borderLeft = outerBorder
                        }
                        if(mountArg.date.getDay() == (curDay+6)%7){
                            con.style.borderTopRightRadius = "10px"
                            con.style.borderRight = outerBorder
                        }
                        con.style.borderTop = outerBorder
                        con.style.display = 'flex'
                        con.style.alignItems = 'center'
                    }
                    // inner borders
                    if(mountArg.date.getDay() != (curDay+6) % 7) mountArg.el.style.borderRight = innerBorder;
                },
                viewDidMount: (mountArg) => {
                    mountArg.el.querySelectorAll<HTMLElement>('tr, table, [role=presentation]').forEach((el) => el.style.border = 'none')
                },
                eventDidMount: (mountArg) => {
                    mountArg.el.style.boxShadow = "1px 3px 3px lightgray"
                    mountArg.el.style.marginBottom = '5px'
                }
            }
        }}
        eventDisplay = 'block'
        firstDay={curDay}
        selectable={false}
        events={(fetchInfo, successCallback, failureCallback) => {
            updateEvents(fetchInfo, (event_list: Event[]) => { successCallback(parseEvents(event_list)) }, failureCallback);
        }}
        height={"auto"}
    />

    return <div style={{padding: '10px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '2px 4px 6px 2px rgba(0, 0, 0, 0.2)'}}>
        {calendar}
    </div>
}

export default MiniCalendar;