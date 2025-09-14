import { data } from "react-router-dom";

export const dateFormat = (data) => {
    return new Date(date).toLocaleString('en-US', {
        weekday : 'short',
        month : 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })
}