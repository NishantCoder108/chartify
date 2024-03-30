export const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// // Usage
// const fillColorHex = "#ff0000"; // Your hex color
// const fillColorWithOpacity = hexToRgba(fillColorHex, 0.54);
// console.log({ fillColorWithOpacity });
