const getCb = () => {
    const Ma = 7 / 128;
    const Mb = 3 / 32;
    const Mc = 15 / 128;
    const Mmax = 1 / 8;
    const Cb = (12.5 * Mmax) / (2.5 * Mmax + 3 * Ma + 4 * Mb + 3 * Mc);
    console.log(Cb);
};
getCb();
