export const formatDate = (isoStringDate) => {
    return new Date(isoStringDate).toLocaleDateString('en-US', {
        day: 'numeric', month: 'short', year: 'numeric'
    })
};

export const formatTime = (isoStringDate) => {
    return new Date(isoStringDate).toLocaleDateString('en-US', { 
        hour: '2-digit', minute: '2-digit'
    }).slice(12)
};