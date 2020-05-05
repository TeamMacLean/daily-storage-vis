import moment from 'moment';
import fetch from 'isomorphic-unfetch'
import config from '../config'
import absoluteUrl from './absoluteUrl'


export default async function (date, req) {
    var hosts = req ? req.headers.host : window.location.hostname
    console.log('hosts', hosts)
    const {protocol, host} = absoluteUrl(req, `localhost:${config.port}`);
    const apiURL = `${protocol}//${host}`;



    if (!date) {
        date = moment();
    }

    const year = date.get('year').toString();
    const month = date.format("MM").toString();
    const day = date.format('dd').toString();

    const dateFull = `${year}/${month}/${day}`;

    const url = `${apiURL}/proxy/${dateFull}`;

    const res = await fetch(url);

    return res.json();

}
