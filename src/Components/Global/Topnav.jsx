import Heading from '../UI/Heading'

const TopNav = () => {
    return (
        <nav className="top--navbar">
            <Heading label={2} className="bold pColor">eKart</Heading>

            <ul>
                <li><a href="https://twitter.com/theamar_malakar" target="_blank" rel="noreferrer"><i className="bi bi-twitter"></i></a></li>
                <li><a href="https://www.linkedin.com/in/amar-malakar/" target="_blank" rel="noreferrer"><i className="bi bi-linkedin"></i></a></li>
                <li><a href="https://github.com/amarmalakar" target="_blank" rel="noreferrer"><i className="bi bi-github"></i></a></li>
            </ul>
        </nav>
    )
}

export default TopNav
