import {Base64} from "./base64";
import CONFIG from "../config";
import moment from 'moment';
import fetch from 'isomorphic-unfetch'


export default async function (date) {
    function btoa(string) {
        return Base64.encode(string)
    }

    //TODO check for auth
    if (!date) {
        date = moment();
    }

    const year = date.get('year').toString();
    const month = date.format("MM").toString();
    const day = date.get('date').toString();

    const dateFull = `${year}/${month}/${day}`;

    let headers = {
        'Authorization': 'Basic ' + btoa(CONFIG.auth.username + ":" + CONFIG.auth.password),
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json"
    };


    const res = await fetch(`http://unified-monitor.nbi.ac.uk/Reports/TSL/storage/daily-json/${dateFull}/TSL_PrimaryData_Usage.json`, {
        method: 'GET',
        headers: headers,
        credentials: 'include',
        mode: 'cors',
    });

    if (res.status === 200) {
        return res.json();
    } else {
        return Promise.resolve({})
    }


}