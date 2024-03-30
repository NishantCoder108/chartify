export const hideConsole = () => {
    console.log = () => {};
    console.error = function () {};
};
