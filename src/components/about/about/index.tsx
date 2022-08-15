import * as React from "react";

export const ContentAbout = (): JSX.Element => {
    return (
        <div className="content" id="content-about">
            <h1 className="title">Our Vision</h1>
            <hr />
            <p className="text">
                By definition, a metropolis is a significant cultural center of a country or region
                and a central hub for regional connections and communications.
                Likewise, it is our goal at Project Metropolis to create a centralized website at WLMAC where all students can easily
                access and share information with their peers, making this our own, online metropolis.
            </p>
            <h1 className="title">About the Site</h1>
            <hr />
            <p className="text">
                The Mackenzie Lyon's Den (Project Metropolis) is a student-driven website that showcases the best of Mackenzie's pride;
                a central microcosm and communication hub, rich in representing the diverse facets of student life.
                Welcome to the Lyon's Den, the first stop to find out more about Mackenzie, its school-wide activities, events,
                initiatives, clubs and councils, Student Council offerings, creative student voice and essential resources to enrich
                Mackenzie student life!
            </p>
            <p className="text">
                Our site will continue to roll out new features and updates in the coming months.
                Users can look forward to a notification system, searching system, and a mobile app.
            </p>
        </div>
    )
}