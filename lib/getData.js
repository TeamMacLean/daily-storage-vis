import moment from 'moment';
import fetch from 'isomorphic-unfetch'
import config from '../config'


export default async function (date) {

    if (!date) {
        date = moment();
    }

    const year = date.get('year').toString();
    const month = date.format("MM").toString();
    const day = date.get('date').toString();

    const dateFull = `${year}/${month}/${day}`;

    const url = `${config.url}:${config.port}/proxy/${dateFull}`;

    const res = await fetch(url);

    return res.json();

}