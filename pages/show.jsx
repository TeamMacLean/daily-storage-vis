import Layout from '../components/Layout.jsx'
import getData from "../lib/getData";
import moment from 'moment';

function formatBytes(a, b) {
    if (0 == a) return "0 Bytes";
    var c = 1024, d = b || 2, e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
}


const Show = (props) => (
    <Layout>
        <div className="container">
            <h1 className="title">{props.dateFull}</h1>
            <h1 className="title is-4">{props.quota.fullPath}</h1>


            <h2 className="heading">thresholds</h2>
            <p>advisory: {formatBytes(props.quota.thresholds.advisory)}</p>
            <p>advisory_exceeded: {props.quota.thresholds.advisory_exceeded}</p>
            <p>advisory_last_exceeded: {props.quota.thresholds.advisory_last_exceeded}</p>
            <p>hard: {formatBytes(props.quota.thresholds.hard)}</p>
            <p>hard_exceeded: {props.quota.thresholds.hard_exceeded}</p>
            <p>hard_last_exceeded: {props.quota.thresholds.hard_last_exceeded}</p>
            <p>soft: {props.quota.thresholds.soft}</p>
            <p>soft_exceeded: {props.quota.thresholds.soft_exceeded}</p>
            <p>soft_grace: {props.quota.thresholds.soft_grace}</p>
            <p>soft_last_exceeded: {props.quota.thresholds.soft_last_exceeded}</p>

            <br/>
            <h2 className="heading">usage</h2>
            <p>logical: {formatBytes(props.quota.usage.logical)}</p>
            <p>physical: {formatBytes(props.quota.usage.physical)}</p>

        </div>
    </Layout>
);


Show.getInitialProps = async function ({req, res, query}) {

    let data = await getData();

    if (!data || !data.quotas) {
        res.writeHead(404, {
            Location: req.url
        });
        res.end()
    }

    let quota;
    if (query.id) {

        data.quotas.map(quotaItem => {
            if (quotaItem.id === query.id) {
                quota = quotaItem
            }
        });

        if (quota) {
            quota.fullPath = quota.path;
            if (quota.persona) {
                quota.fullPath = `${quota.path}/${quota.persona.name.split('\\').pop()}`
            }
        }

        const dateFull = moment().format('YYYY/MM/DD');
        return {quota: quota, dateFull: dateFull,}

    } else {
        if (res) res.statusCode = 404;
        return {}
    }

};

export default Show