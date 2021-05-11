// 176P의 Cb 값 구하기

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

집중하중_하의_단순보의_Cb값 = (event) => {
    (L = 1), (P = 1), (PL = L * P); // 여기서의 L은 Lb이다.

    if (event === "a") {
        const Ma = (P / 2) * (P / 4); //  PL/8
        const Mb = (P / 2) * (L / 2); // PL/4
        const Mc = Ma;
        const Mmax = Mb;

        printAnswer(Ma, Mb, Mc, Mmax);
    }

    if (event === "b") {
        const Ma = PL / 16;
        const Mb = PL / 8;
        const Mc = (3 * PL) / 16;
        const Mmax = PL / 4;

        printAnswer(Ma, Mb, Mc, Mmax);
    }
};

집중하중_하의_단순보의_Cb값("a");
