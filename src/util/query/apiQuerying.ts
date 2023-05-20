import {Session} from "../core/session";

// used to extract all objects from a paginated api
export const getPaginatedAPI = (getAPI: (url: string) => Promise<any>, url: string): Promise<any[]> => {
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
                    getAPI(response.data.next).then(addData)
                } else {
                    resolve(objs);
                }
            } else {
                reject(`Response returned ${response.status}`);
            }
        }

        // call the method
        getAPI(url).then(addData);
    })
}