export const formatDate = (isoStringDate) => {
    return new Date(isoStringDate).toLocaleDateString('en-US', {
        day: 'numeric', month: 'short', year: 'numeric'
    })
};

export const formatDateDay = (isoStringDate) => {
    const returnDate = new Date(isoStringDate).toDateString()
    return returnDate.slice(0, -4)
};

export const formatLongDate = (isoStringDate) => {
    return new Date(isoStringDate).toLocaleDateString('en-US', {
        day: 'numeric' , month: 'long' , year: 'numeric'
    })
};

export const formatTime = (isoStringDate) => {
    return new Date(isoStringDate).toLocaleDateString('en-US', { 
        hour: '2-digit', minute: '2-digit'
    }).slice(12)
};

