const Input = (props) => {
    return (
        <div className="input-control">
            <label htmlFor={props.input.id}>{props.label}</label>
            <input {...props.input} />
        </div>
    )
}

export default Input
