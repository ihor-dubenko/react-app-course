export const delayFn = async (delay = 1000) => {
    await new Promise(res => setTimeout(res, delay));
}
