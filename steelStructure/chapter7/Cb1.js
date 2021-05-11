// 175P의 Cb 값 구하기

const getCb = (Ma, Mb, Mc, Mmax) => {
    const Cb = (12.5 * Mmax) / (2.5 * Mmax + 3 * Ma + 4 * Mb + 3 * Mc);
    return Cb;
};

const printAnswer = (Ma, Mb, Mc, Mmax) => {
    console.log("Ma : ", Ma);
    console.log("Mb : ", Mb);
    console.log("Mc : ", Mc);
    console.log("Mmax : ", Mmax);
    console.log("Cb : ", getCb(Ma, Mb, Mc, Mmax));
};

분포하중_하의_단순보의_Cb값 = (event) => {
    (L = 1), (W = 1), (WL = L * W); // 여기서의 L은 Lb이다.

    if (event === "a") {
        const Ma = WL / 8 - (WL / 4) * (1 / 4) * (1 / 2); //  3WL^2 / 32
        const Mb = (WL / 2) * ((1 * L) / 2) * (1 / 2); // WL^2 / 8
        const Mc = Ma;
        const Mmax = (WL * L) / 8; // WL^2 / 8

        printAnswer(Ma, Mb, Mc, Mmax);
    }

    if (event === "b") {
        const Ma = (WL * L) / 8 - ((3 * WL) / 8) * ((3 * L) / 8) * (1 / 2); // 7WL^2 / 128
        const Mb = (WL * L) / 8 - (WL / 4) * (L / 4) * (1 / 2); // 3WL^2 / 32
        const Mc = (WL * L) / 8 - (WL / 8) * (L / 8) * (1 / 2); // 15WL^2 / 128
        const Mmax = (WL * L) / 8;

        printAnswer(Ma, Mb, Mc, Mmax);
    }
};

분포하중_하의_단순보의_Cb값("b");
