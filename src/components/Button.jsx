function Button({name,onClick,className}) {
    return(
        <>
            <button 
                className={`${className} general`}
                onClick={onClick}
            >
                {name}
            </button>
        </>
    )
}
export default Button