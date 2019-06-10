
import moment from 'moment';
import fetch from 'isomorphic-unfetch'


export default async function (date) {

    if (!date) {
        date = moment();
    }

    const year = date.get('year').toString();
    const month = date.format("MM").toString();
    const day = date.get('date').toString();

    const dateFull = `${year}/${month}/${day}`;

    const url = `http://127.0.0.1:3000/proxy/${dateFull}`;


    const res = await fetch(url);

    return res.json();

}