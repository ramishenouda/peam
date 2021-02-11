import './home-style.css'

interface Props {
    name: string;
}

function Home(props: Props): JSX.Element {
    return (
        <>
        <div id="home">
            PEAM
        </div>
        </>
    )
}

export default Home;
