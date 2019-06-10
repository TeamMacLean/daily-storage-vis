import Header from './Header'

const layoutStyle = {};

export default function Layout(props) {
    return (
        <div style={layoutStyle}>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"/>
            <Header/>
            <section className="section">
                {props.children}
            </section>
        </div>
    )
}
