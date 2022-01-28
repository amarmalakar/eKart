const container =  {
    maxWidth: '1024px',
    margin: 'auto',
    padding: '16px 12px',
}

const Container = (props) => {
    return (
        <div style={{ ...container }} className={`${props.className}`}>
            {props.children}
        </div>
    )
}

export default Container;