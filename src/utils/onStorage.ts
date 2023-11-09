export const onStorage = (key: string, data: any = undefined) => {
    if (data) {
        return localStorage.setItem(key, JSON.stringify(data));
    }

    return JSON.parse(localStorage.getItem(key) ?? 'null');
}
