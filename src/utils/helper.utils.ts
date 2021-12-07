export const placeholderOption = 'None';

export const hex2rgba = (hex: any, alpha = 1): string => {
    const [r, g, b] = hex.match(/\w\w/g).map((x: any) => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
};
  