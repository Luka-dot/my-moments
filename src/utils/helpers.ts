export const formatDate = (isoStringDate) => {
    return new Date(isoStringDate).toLocaleDateString('en-US', {
        day: 'numeric', month: 'short', year: 'numeric'
    })
};