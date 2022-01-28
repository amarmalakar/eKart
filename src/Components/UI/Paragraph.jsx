const paragraph = {
    fontSize: '1.8rem',
    lineHeight: '1.5'
}

const Paragraph = (props) => {
    return (
        <p style={paragraph} className={`${props.className}`}>
            {props.children}
        </p>
    )
}

export default Paragraph