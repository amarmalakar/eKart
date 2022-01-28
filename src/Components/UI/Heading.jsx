// CSS
const h1 = {fontSize: '3rem'}
const h2 = {fontSize: '2.6rem'}
const h3 = {fontSize: '2rem'}
const h4 = {fontSize: '1.6rem', fontWeight: '300'}
const lh = {lineHeight: '2'}

const Heading = ({ children, label, className }) => {
    let headingType = '';
    if (!label || label === 1) {
        headingType = h1
    }  else if (label === 2) {
        headingType = h2;
    } else if (label === 3) {
        headingType = h3;
    } else if (label === 4) {
        headingType = h4;
    }

    return (
        <div style={{ ...headingType, ...lh }} className={`${className}`}>
            {children}
        </div>
    )
}

export default Heading
