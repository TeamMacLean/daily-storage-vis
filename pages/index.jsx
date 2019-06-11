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
                </tr>
                <tr>
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


                        {/*if there are quotas*/}
                        {/*<ul style={{marginLeft: 40 + 'px'}}>*/}
                        {/*{container.quotas.map(quota => (*/}
                        {/*<tr key={quota.id}>*/}
                        {/*<li key={quota.id}>*/}
                        {/*<Link prefetch href={`/show?id=${quota.id}`}>*/}
                        {/*<a>{quota.shortPath}{UsageGraph(quota)}</a>*/}
                        {/*</Link>*/}
                        {/*</li>*/}
                        {/*</tr>*/}
                        {/*))}*/}
                        {/*</ul>*/}
                        {/*</div>*/}
                    </tr>
                ))}
                </tbody>
            </table>


        </div>
    </Layout>
);

Index.handleChange = function () {
    console.log('handeling change');
};


Index.getInitialProps = async function ({req, res}) {
    const data = await getData();
    return ProcessData(data)
};

export default Index