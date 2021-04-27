const log = (text) => console.log(text);

// H * B * t1 * t2의 모양일 때의 용접 H형강. 높이, 가로, 기둥 두께, 플랜지 두께
const example = (
    H = 200, // 기둥의 길이
    B = 200, // 플랜지 길이
    t1 = 8, // 기둥의 두께
    t2 = 12, // 플랜지 두께
    용접여부 = false,

    K = 1, // 유효좌굴길이 계수 126P 표 6.2 참고
    // 보통은 y축이 약축이기 때문에 Iy, Ly만 고려한다.
    Iy = 1.6 * 10 ** 7,
    Ly = 4500,
    Ix = 4.72 * 10 ** 7, // mm^4
    Lx = 9000, // mm, 부재의 길이

    A = 63.53 * 10 ** 2
) => {
    log(`1) 조립 압축재의 폭두께비 산정`);
    const b = B / 2;
    const rf = b / t2; // 플랜지의 폭두께비
    const h = H - 2 * t2;
    const rw = h / t1; // 웹의 폭두께비
    log(`플랜지 : B / 2 = ${b}mm, 두께비는 t2 = ${t2}으로 나눠서 ${rf}`);
    log(`웹 : H - 2 x t2 = ${h}mm, 두께비는 t1 = ${t1}으로 나눠서 ${rw}\n`);

    log(`2) 폭두께비 제한값 산정`);
    let Fy;
    if (16 < t1 && t1 <= 40 && 16 < t2 && t2 <= 40) {
        log(`폭 두께가 모두 16mm 초과 40mm 이하이므로 Fy는 345MPa.`);
        Fy = 345;
    } else {
        // Fy가 355인 것은, 두께가 16 이하라서 그러하다.
        Fy = 355;
    }

    // 람다 대신에 L을 쓰도록 하겠음. 실제 표기는 예제 6.1을 참고할 것. 플랜지, 웹 둘다 람다r로 표현.
    let Lrf;
    if (용접여부) {
        // 용접인 경우1
        k = 4 / Math.sqrt((B - 2 * t2) / t1); // 용접인 경우
        log(`용접인 경우의 k 값은 ${k}`); // 130P 참고.
        if (0.76 < k) {
            k = 0.76;
            log(`0.76보다 크므로 k 값은 ${k}`); // 130P 참고.
        } else if (k < 0.35) {
            k = 0.35;
            log(`0.35보다 작으므로 k 값은 ${k}`); // 130P 참고.
        }
        Lrf = 0.64 * Math.sqrt((k * 210000) / Fy);
        log(`Lrf 값은 따라서, ${Lrf}이다.`);
    } else {
        log(`압연인 경우의 공식을 이용해 Lrf을 구한다.`);
        Lrf = 0.56 * Math.sqrt(210000 / Fy); // 용접이 아닌, 압연일 경우.
        log(`Lrf 값은 따라서, ${Lrf}이다.`);
    }
    let Lrw = 1.49 * Math.sqrt(210000 / Fy);
    log(`Lrw 값은 ${Lrw}이 된다.`);

    log(`플랜지 폭두께비 ${rf}, 단면한계 : ${Lrf} => ${rf < Lrf}`);
    log(`웹 폭두께비 ${rw}, 단면한계 : ${Lrw} => ${rw < Lrw}\n`);
    if (rf > Lrf || rw > Lrw) {
        log(`****** 문제가 있을 수 있으므로 검토 바랍니다. ******`);
    }
    // 단면한계보다 두께비가 크면 세장단면이라는 뜻이 된다.

    log(`3) 탄성좌굴하중 구하기 (예제 6.2)`);
    const Pcrx = (3.14 ** 2 * 210000 * Ix) / (K * Lx) ** 2; // Pcrx = PIx^2 * EIx / (KL)^2
    log(`Pcrx = ${Pcrx}N, ${Pcrx / 1000}KN`);

    const Pcry = (3.14 ** 2 * 210000 * Iy) / (K * Ly) ** 2; // Pcry = PIx^2 * EIx / (KL)^2
    log(`Pcry = ${Pcry}N, ${Pcry / 1000}KN`);

    const Pcr = Math.min(Pcrx, Pcry);
    log(`Pcrx, Pcry 중 작은 값은 : ${Pcr / 1000}KN\n`);

    log(`탄성좌굴강도 Fcr은 Pcr을 단면적으로 나눈 값이다.`);
    log(`Fcr = Pcr / A => ${Pcr / A} = ${Pcr} / ${A} : ${Pcr / A}N/mm^2\n`);
};

example();
