export const getStorLocal = (item:string) => {
    if (typeof localStorage !== 'undefined') {
        return JSON.parse(localStorage.getItem(item)??'[]');
    }
    return null;
}
export const setStorLocal = (item:string, value:any) => {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem(item, JSON.stringify(value));
    }
}