import {Session} from "../core/session";

// used to extract all objects from a paginated api
export const getPaginatedAPI = (session: Session, url: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        // the list of objects
        let objs: any[] = [];

        // recursive method for pagination
        const addData = (response: any) => {
            if(response.status === 200){
                // add the current page
                objs = objs.concat(response.data.results);

                // if there is another page, add it
                if(response.data.next !== null){
                    session.getAPI(response.data.next, false).then(addData)
                } else {
                    resolve(objs);
                }
            } else {
                reject(`Response returned ${response.status}`);
            }
        }

        // call the method
        session.getAPI(url, false).then(addData);
    })
}