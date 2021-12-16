export const placeholderOption = 'None';

export const hex2rgba = (hex: any, alpha = 1): string => {
    const [r, g, b] = hex.match(/\w\w/g).map((x: any) => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
};

export const convertUnixTimeStamp = (timestamp: number | string): Date => {

    if (typeof timestamp === 'string') {
        const t = Number.parseInt(timestamp);
        
        if (isNaN(t)) {
            throw Error("ConvertUnixTimeStamp: Expected a number, but got NaN!");
        }

        return convertUnixTimeStamp(t);    // recursive call with number this time
    }
    else {
        const date = new Date(timestamp);
        return date;
    }

}
  