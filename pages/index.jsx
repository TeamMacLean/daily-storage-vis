import Layout from '../components/Layout.jsx'
import Link from 'next/link'
import ProcessData from '../lib/processData'
import UsageGraph from '../components/UsageGraph'
import getData from '../lib/getData';


const Index = (props) => (
    <Layout>
        <div className="container">

            <h1 className="title has-text-centered">{props.dateFull}</h1>

            <h1 className="title">Quotas</h1>

            <table className="table is-fullwidth">
                <thead>
                <tr>
                    <th>
                        Path
                    </th>
                    <th>
                        Usage
                    </th>
                </tr>
                </thead>
                <tbody>
                {props.containers.map(container => (
                    <tr key={container.id}>
                        {/*<div key={container.id}>*/}
                        <th>
                            <Link prefetch href={`/show?id=${container.id}`}>
                                <a>{container.path}</a>
                            </Link>
                        </th>
                        <th>
                            {UsageGraph(container)}
                        </th>

                    </tr>
                ))}
                </tbody>
            </table>


        </div>
    </Layout>
);


Index.getInitialProps = async function ({req, res}) {
    const data = await getData(null, req);
    return ProcessData(data)
};

export default Index