export const string_cut = (base, cutter) => {
    const len = cutter.length - 1;
    if (len >= 1)
        return base.slice(0, len * -1);
    else
        return base;
}