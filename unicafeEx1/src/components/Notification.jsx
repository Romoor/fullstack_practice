const Notification = ({ message, isError }) => {
    if (message === null) {
        return null
    }
    const msgClass = isError ? "error" : "notif"
    return (
        <div className={msgClass}>
            {message}
        </div>
    )
}

export default Notification