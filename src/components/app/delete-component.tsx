import * as React from "react";

export const DeletionNotification = (props: {onRestore: ()=>void}): JSX.Element => {
    return <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "10px"}} className="deleted-notif">
        <span>WARNING: Account will soon be deleted</span>
        <button className="btn btn-primary" onClick={props.onRestore}>Restore</button>
    </div>
}