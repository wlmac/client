import * as React from "react";

export const Map = (): JSX.Element => {
    return (
        <>
            <link rel="stylesheet" href="/static/css/map.css" />
            <link rel="stylesheet" href="/static/css/mapbox-gl-geocoder.css" />
            <link rel="stylesheet" href="/static/css/mapbox-gl.css" />
            <script src="/static/js/mapbox-gl-geocoder.min.js" />
            <script src="/static/js/mapbox-gl.js" />

            <div className="container">
                <div className="map-container">
                    <div className="heading">
                        {/* <!-- <div style="width: 80%; height: 3px; background-color: #efefef; margin-bottom: 20px;"></div> --> */}
                        <div className="legend">
                            <div className="legend-items">
                                <div className="legend-square" style={{ backgroundColor: "#946987" }}></div>
                                <span>General Spaces</span>
                            </div>
                            <div className="legend-items">
                                <div className="legend-square" style={{ backgroundColor: "#946469" }}></div>
                                <span>Washrooms + Change Rooms</span>
                            </div>
                            <div className="legend-items">
                                <div className="legend-square" style={{ backgroundColor: "#b0a169" }}></div>
                                <span>Offices</span>
                            </div>
                            <div className="legend-items">
                                <div className="legend-square" style={{ backgroundColor: "#68936f" }}></div>
                                <span>Classrooms + Labs</span>
                            </div>
                            <div className="legend-items">
                                <div className="legend-square" style={{ backgroundColor: "#5d97d1" }}></div>
                                <span>Stairways</span>
                            </div>
                            <div className="legend-items">
                                <div className="legend-square" style={{ backgroundColor: "#3774b2" }}></div>
                                <span>Hallways</span>
                            </div>
                            <div className="legend-items">
                                <div className="legend-square" style={{ backgroundColor: "#646d78" }}></div>
                                <span>Miscellaneous</span>
                            </div>
                        </div>

                    </div>
                    <div style={{ margin: 0 }}><a href="https://maclyonsden.com/map#help"><i className="small material-icons icon-blue">help</i></a></div>

                    <div className="switch-container">
                        <div className="switch" id="floor">
                            <label style={{ fontSize: "1rem" }}>
                                Floor One
                                <input type="checkbox" name="checkbox" id="checkbox" />
                                <span className="lever"></span>
                                Floor Two
                            </label>
                        </div>
                    </div>
                    <pre id="coordinates" className="coordinates"></pre>
                    <div className="map mapboxgl-map" id="map"><div className="mapboxgl-canary" style={{ visibility: "hidden" }}></div><div className="mapboxgl-canvas-container mapboxgl-interactive mapboxgl-touch-drag-pan mapboxgl-touch-zoom-rotate"><canvas className="mapboxgl-canvas" tabIndex={0} aria-label="Map" role="region" width="998" height="532" style={{ width: "998px", height: "532px" }}></canvas></div><div className="mapboxgl-control-container"><div className="mapboxgl-ctrl-top-left"></div><div className="mapboxgl-ctrl-top-right"><div className="mapboxgl-ctrl-geocoder mapboxgl-ctrl"><svg className="mapboxgl-ctrl-geocoder--icon mapboxgl-ctrl-geocoder--icon-search" viewBox="0 0 18 18" xmlSpace="preserve" width="18" height="18"><path d="M7.4 2.5c-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9c1 0 1.8-.2 2.5-.8l3.7 3.7c.2.2.4.3.8.3.7 0 1.1-.4 1.1-1.1 0-.3-.1-.5-.3-.8L11.4 10c.4-.8.8-1.6.8-2.5.1-2.8-2.1-5-4.8-5zm0 1.6c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2-3.3-1.3-3.3-3.1 1.4-3.3 3.3-3.3z"></path></svg><input type="text" className="mapboxgl-ctrl-geocoder--input" placeholder="Search School" aria-label="Search School" /><div className="suggestions-wrapper"><ul className="suggestions" style={{ display: "none" }}></ul></div><div className="mapboxgl-ctrl-geocoder--pin-right"><button aria-label="Clear" className="mapboxgl-ctrl-geocoder--button"><svg className="mapboxgl-ctrl-geocoder--icon mapboxgl-ctrl-geocoder--icon-close" viewBox="0 0 18 18" xmlSpace="preserve" width="18" height="18"><path d="M3.8 2.5c-.6 0-1.3.7-1.3 1.3 0 .3.2.7.5.8L7.2 9 3 13.2c-.3.3-.5.7-.5 1 0 .6.7 1.3 1.3 1.3.3 0 .7-.2 1-.5L9 10.8l4.2 4.2c.2.3.7.3 1 .3.6 0 1.3-.7 1.3-1.3 0-.3-.2-.7-.3-1l-4.4-4L15 4.6c.3-.2.5-.5.5-.8 0-.7-.7-1.3-1.3-1.3-.3 0-.7.2-1 .3L9 7.1 4.8 2.8c-.3-.1-.7-.3-1-.3z"></path></svg></button><svg className="mapboxgl-ctrl-geocoder--icon mapboxgl-ctrl-geocoder--icon-loading" viewBox="0 0 18 18" xmlSpace="preserve" width="18" height="18"><path fill="#333" d="M4.4 4.4l.8.8c2.1-2.1 5.5-2.1 7.6 0l.8-.8c-2.5-2.5-6.7-2.5-9.2 0z"></path><path opacity=".1" d="M12.8 12.9c-2.1 2.1-5.5 2.1-7.6 0-2.1-2.1-2.1-5.5 0-7.7l-.8-.8c-2.5 2.5-2.5 6.7 0 9.2s6.6 2.5 9.2 0 2.5-6.6 0-9.2l-.8.8c2.2 2.1 2.2 5.6 0 7.7z"></path></svg></div></div><div className="mapboxgl-ctrl mapboxgl-ctrl-group"><button className="mapboxgl-ctrl-geolocate" type="button" title="Find my location" aria-label="Find my location" aria-pressed="false"><span className="mapboxgl-ctrl-icon" aria-hidden="true"></span></button></div></div><div className="mapboxgl-ctrl-bottom-left"><div className="mapboxgl-ctrl" style={{ display: "block" }}><a className="mapboxgl-ctrl-logo" target="_blank" rel="noopener nofollow" href="https://www.mapbox.com/" aria-label="Mapbox logo"></a></div></div><div className="mapboxgl-ctrl-bottom-right"><div className="mapboxgl-ctrl mapboxgl-ctrl-attrib"><button className="mapboxgl-ctrl-attrib-button" type="button" title="Toggle attribution" aria-label="Toggle attribution"></button><div className="mapboxgl-ctrl-attrib-inner" role="list"><a href="https://www.mapbox.com/about/maps/" target="_blank" title="Mapbox" aria-label="Mapbox" role="listitem">© Mapbox</a> <a href="https://www.openstreetmap.org/about/" target="_blank" title="OpenStreetMap" aria-label="OpenStreetMap" role="listitem">© OpenStreetMap</a> <a className="mapbox-improve-map" href="https://apps.mapbox.com/feedback/?owner=nikisu&amp;id=cktk76xy90rgm17s7q7pg0g55&amp;access_token=pk.eyJ1IjoibmlraXN1IiwiYSI6ImNrc3A3c2FieTAwM3kybnA3anNjY2c3MXMifQ.T_8vAyTc4PMuGUC23vIOhA" target="_blank" title="Map feedback" aria-label="Map feedback" role="listitem" rel="noopener nofollow">Improve this map</a></div></div></div></div></div>

                    <div className="controls" id="help">
                        <div className="mobile-controls">
                            <details>
                                <summary>
                                    <h6><strong> Mobile Controls</strong></h6>
                                </summary>
                                <ul>
                                    <li><strong>Pan screen:</strong>1 finger + drag</li>
                                    <li><strong>Zoom In/Out:</strong>2 fingers + pinch screen</li>
                                    <li><strong>Perspective:</strong>2 fingers + drag</li>
                                </ul>
                            </details>
                        </div>
                        <div className="computer-controls">
                            <details>
                                <summary>
                                    <h6><strong> Computer Controls</strong></h6>
                                </summary>
                                <ul>
                                    <li><strong>Pan screen:</strong>drag screen</li>
                                    <li>
                                        <strong>Zoom In/Out:</strong>double click OR scroll up or down
                                    </li>
                                    <li><strong>Perspective:</strong>Ctrl + drag</li>
                                </ul>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}