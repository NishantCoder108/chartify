/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = <Args extends any[], ReturnValue>(
    func: (...args: Args) => ReturnValue,
    wait: number
): ((...args: Args) => void) => {
    let timeoutId: ReturnType<typeof setTimeout> | null;

    return (...args: Args) => {
        const later = () => {
            timeoutId = null;
            func(...args);
        };

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(later, wait);
    };
};
