export const string_cut = (base, cutter) => {
    const len = cutter.length;
    return base.slice(0, len * -1);
}