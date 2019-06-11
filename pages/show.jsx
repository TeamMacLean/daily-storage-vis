import Layout from '../components/Layout.jsx'
import getData from "../lib/getData";
import Link from 'next/link'
import ProcessData from "../lib/processData";
import UsageGraph from '../components/UsageGraph'

function formatBytes(a, b) {
    if (0 == a) return "0 Bytes";
    var c = 1024, d = b || 2, e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
}

const Show = (props) => (
    <Layout>
        <div className="container">
            <h1 className="title has-text-centered">{props.dateFull}</h1>
            <h1 className="title is-4">{props.quota.fullPath}</h1>


            <h2 className="heading">thresholds</h2>
            <p>advisory: {formatBytes(props.quota.thresholds.advisory)}</p>
            <p>advisory_exceeded: {props.quota.thresholds.advisory_exceeded.toString()}</p>
            <p>advisory_last_exceeded: {props.quota.thresholds.advisory_last_exceeded}</p>
            <p>hard: {formatBytes(props.quota.thresholds.hard)}</p>
            <p>hard_exceeded: {props.quota.thresholds.hard_exceeded.toString()}</p>
            <p>hard_last_exceeded: {props.quota.thresholds.hard_last_exceeded}</p>
            <p>soft: {props.quota.thresholds.soft || 'unknown'}</p>
            <p>soft_exceeded: {props.quota.thresholds.soft_exceeded || 'unknown'}</p>
            <p>soft_grace: {props.quota.thresholds.soft_grace || 'unknown'}</p>
            <p>soft_last_exceeded: {props.quota.thresholds.soft_last_exceeded || 'unknown'}</p>

            <br/>
            <h2 className="heading">usage</h2>
            <p>logical: {formatBytes(props.quota.usage.logical)}</p>
            <p>physical: {formatBytes(props.quota.usage.physical)}</p>

            <br/>

            {(props.quota.quotas && props.quota.quotas.length > 0 &&
                <>
                    <h2 className="heading">Quotas</h2>
                    <ul>
                        {props.quota.quotas.map(quota => (
                            <li key={quota.id}>
                                <Link prefetch href={`/show?id=${quota.id}`}>
                                    <a>{quota.shortPath}{UsageGraph(quota)}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </>
            )}

        </div>
    </Layout>
);


Show.getInitialProps = async function ({req, res, query}) {


    let quota;
    if (query.id) {
        const data = await getData();
        const processedData = ProcessData(data)

        processedData.containers.map(container => {
            if (container.id === query.id) {
                quota = container
            }
            if(container.quotas){
                container.quotas.map(cq=>{
                    if (cq.id === query.id) {
                        quota = cq
                    }
                })
            }
        });

        console.log('quota', quota);

        if (quota) {
            quota.fullPath = quota.path;
            if (quota.persona) {
                quota.fullPath = `${quota.path}/${quota.persona.name.split('\\').pop()}`
            }

            return {quota: quota, dateFull: processedData.dateFull,}
        }
        if (res) res.statusCode = 404;
        return {}
        //
    } else {
        if (res) res.statusCode = 404;
        return {}
    }

};

export default Show