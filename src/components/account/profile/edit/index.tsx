import * as React from "react";
import { default as axios } from "axios";

import { Session, SessionContext, User } from "../../../../util/core/session";
import { Link, NavLink, NavigateFunction, useNavigate } from "react-router-dom";
import Organization from "../../../../util/core/interfaces/organization";
import { loggedIn } from "../../../../util/core/AuthService";

import { useForm, SubmitHandler } from "react-hook-form";
import Routes from "../../../../util/core/misc/routes";

type Inputs = {
    bio: string;
    timezone: string;
    first_name: string;
    last_name: string;
    graduating_year: string;
};

export const ProfileEdit = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();

    const session: Session = React.useContext(SessionContext);
    const [showDelete, setShowDelete] = React.useState<boolean>(false);
    let user: User = session.user;

    // Form
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<Inputs>();

    React.useEffect(() => {
        // console.log(user)
        if ("username" in user) {
            // console.log("User:", { ...session.user, graduating_year: session.user.graduating_year?.toString() });
            reset({ ...session.user, graduating_year: session.user.graduating_year?.toString() });
        }
    }, [session.user]);

    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data);
        const dataToSubmit = {
          bio: data.bio,
          first_name: data.first_name,
          last_name: data.last_name,
          graduating_year: data.graduating_year,
        };
        session.request('patch', `${Routes.POST.USER_UPDATE}/${user.id}`, dataToSubmit).then((res) => {
            session.refreshUser();
            nav(`/user/${user.username}`);
        });
    }

    const deleteUser = () => {
        session.request('post', `${Routes.USER}/me/delete`).then((res) => {
            if(res.status === 200){
                session.refreshUser();
                nav(`/user/${user.username}`)
            }
        })
    }

    // console.log(watch("graduating_year")) // watch input value by passing the name of it
    // console.log(user.timezone);

    return (
        <>
            <link rel="stylesheet" href="/resources/static/css/profile/update.css" />
            <link rel="stylesheet" href="/resources/static/css/base.css" />

            <div className="header">
                <img className="circle responsive-img profile-picture" src={user.gravatar_url} alt={`${user.username}'s profile picture`} />
                <div className="name-info">
                    <h5 className="full-name">{`${user.first_name} ${user.last_name}`}</h5>
                    <h6 className="username">{user.username}</h6>
                </div>
            </div>
            <hr />
            <div className="body">
                <div className="avatar">
                    <a href="https://gravatar.com/" target="_blank">Edit profile photo</a><br />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field bio">
                        <div className="label"><label htmlFor="id_bio">Bio:</label></div>
                        <span><textarea {...register("bio")} name="bio" cols={40} rows={10} id="id_bio"></textarea></span>
                    </div>

                    <div className="field">
                        <div className="label"><label htmlFor="id_first_name">First name:</label></div>
                        <span><input {...register("first_name")} type="text" name="first_name" value={`${user?.first_name}`} maxLength={150} id="id_first_name" /><div data-lastpass-icon-root="true" style={{ position: "relative", height: "0px", width: "0px", float: "left" }}><template><svg width="24" height="24" viewBox="0 0 24 24" fill="none" data-lastpass-icon="true" style={{ position: "absolute", cursor: "pointer", height: "22px", maxHeight: "22px", width: "22px", maxWidth: "22px", top: "11.5px", left: "154px", zIndex: "auto", color: "rgb(215, 64, 58)" }}><rect x="0.680176" y="0.763062" width="22.6392" height="22.4737" rx="4" fill="currentColor"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M19.7935 7.9516C19.7935 7.64414 20.0427 7.3949 20.3502 7.3949C20.6576 7.3949 20.9069 7.64414 20.9069 7.9516V16.0487C20.9069 16.3562 20.6576 16.6054 20.3502 16.6054C20.0427 16.6054 19.7935 16.3562 19.7935 16.0487V7.9516Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M4.76288 13.6577C5.68525 13.6577 6.43298 12.9154 6.43298 11.9998C6.43298 11.0842 5.68525 10.3419 4.76288 10.3419C3.8405 10.3419 3.09277 11.0842 3.09277 11.9998C3.09277 12.9154 3.8405 13.6577 4.76288 13.6577Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M10.3298 13.6577C11.2521 13.6577 11.9999 12.9154 11.9999 11.9998C11.9999 11.0842 11.2521 10.3419 10.3298 10.3419C9.4074 10.3419 8.65967 11.0842 8.65967 11.9998C8.65967 12.9154 9.4074 13.6577 10.3298 13.6577Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15.8964 13.6577C16.8188 13.6577 17.5665 12.9154 17.5665 11.9998C17.5665 11.0842 16.8188 10.3419 15.8964 10.3419C14.974 10.3419 14.2263 11.0842 14.2263 11.9998C14.2263 12.9154 14.974 13.6577 15.8964 13.6577Z" fill="white"></path></svg></template></div></span>
                    </div>


                    <div className="field">
                        <div className="label"><label htmlFor="id_last_name">Last name:</label></div>
                        <span><input {...register("last_name")} type="text" name="last_name" value={`${user?.last_name}`} maxLength={150} id="id_last_name" /><div data-lastpass-icon-root="true" style={{ position: "relative", height: "0px", width: "0px", float: "left" }}><template><svg width="24" height="24" viewBox="0 0 24 24" fill="none" data-lastpass-icon="true" style={{ position: "absolute", cursor: "pointer", height: "22px", maxHeight: "22px", width: "22px", maxWidth: "22px", top: "11.5px", left: "154px", zIndex: "auto", color: "rgb(215, 64, 58)" }}><rect x="0.680176" y="0.763062" width="22.6392" height="22.4737" rx="4" fill="currentColor"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M19.7935 7.9516C19.7935 7.64414 20.0427 7.3949 20.3502 7.3949C20.6576 7.3949 20.9069 7.64414 20.9069 7.9516V16.0487C20.9069 16.3562 20.6576 16.6054 20.3502 16.6054C20.0427 16.6054 19.7935 16.3562 19.7935 16.0487V7.9516Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M4.76288 13.6577C5.68525 13.6577 6.43298 12.9154 6.43298 11.9998C6.43298 11.0842 5.68525 10.3419 4.76288 10.3419C3.8405 10.3419 3.09277 11.0842 3.09277 11.9998C3.09277 12.9154 3.8405 13.6577 4.76288 13.6577Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M10.3298 13.6577C11.2521 13.6577 11.9999 12.9154 11.9999 11.9998C11.9999 11.0842 11.2521 10.3419 10.3298 10.3419C9.4074 10.3419 8.65967 11.0842 8.65967 11.9998C8.65967 12.9154 9.4074 13.6577 10.3298 13.6577Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15.8964 13.6577C16.8188 13.6577 17.5665 12.9154 17.5665 11.9998C17.5665 11.0842 16.8188 10.3419 15.8964 10.3419C14.974 10.3419 14.2263 11.0842 14.2263 11.9998C14.2263 12.9154 14.974 13.6577 15.8964 13.6577Z" fill="white"></path></svg></template></div></span>
                    </div>


                    <div className="field">
                        <div className="label"><label htmlFor="id_graduating_year">Graduating year:</label></div>
                        <span><select {...register("graduating_year")} className="browser-default" id="id_graduating_year">
                            <option value="">Does not apply</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                        </select></span>
                    </div>

                    {/* <!-- <div className="field"> -->
            <!--     <div className="label">Password</div> -->
            <!--     <span> -->
            <!--         <a href=/accounts/password/change/>Change</a> -->
            <!--     </span> -->
            <!-- </div> --> */}
                    <div style={{ display: "flex", alignItems: "center", "gap": "3px" }}>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <NavLink to={`/user/${user.username}`} className="btn btn-primary" role="button" aria-pressed="true">Cancel</NavLink>
                    </div>
                </form>
                <br />
                {!session.user.is_deleted && <div className="delete-container">
                    <h2 className="delete-title">Danger Zone</h2>
                    <button className="delete btn-small btn-primary" style={{width: "100%"}} onClick={() => setShowDelete(true)}>Delete User</button>
                </div>}

                <div className="delete-confirmation" style={{display: "flex", flexDirection: "column", justifyContent: "center", visibility: showDelete ? "visible" : "hidden", opacity: showDelete ? "100%" : "0%"}} >
                    <div className="delete-box" style={{display: "flex", flexDirection: "column"}}>
                        <h3>Are you sure you want to delete this user?</h3>
                        <span style={{display: "flex", flexDirection: "row", justifyContent: "right"}}>
                            <button className="delete btn-small btn-primary" onClick={deleteUser}>YES</button>
                            <button className="btn btn-small btn-primary" onClick={() => setShowDelete(false)}>No</button>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
