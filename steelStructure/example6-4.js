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
    Ly = 3000,
    Ix = 4.72 * 10 ** 7, // mm^4
    Lx = 3000, // mm, 부재의 길이

    Ag = 63.53 * 10 ** 2,

    rx = 86.2, // mm, 단면2차반경 테이블 참고
    ry = 50.2, // mm
    r = 13, // rounded. 위의 r과 다른 개념.

    DL = 500, // 고정하중
    LL = 400, // 활화중
    LrL = 0, // 지붕의 활화중
    WL = 0, // 풍하중
    SL = 0, // 적설하중
    EL = 0, // 지진하중
    RL = 0, // 빗물하중
    FL = 0, // 수압
    HL = 0, // 토압
    TL = 0 // 초기변형에 의한 하중
) => {
    log(`1) 조립 압축재의 폭두께비 산정`);
    const b = B / 2;
    const rf = b / t2; // 플랜지의 폭두께비
    log(`플랜지 : B / 2 = ${b}mm, 두께비는 t2 = ${t2}으로 나눠서 ${rf}`);

    let h;
    let rw;
    if (용접여부) {
        h = H - 2 * t2;
        rw = h / t1; // 웹의 폭두께비
        log(`웹 : H - 2 x t2 = ${h}mm, 계산 결과 ${rw}\n`);
    } else {
        h = H - 2 * t2 - 2 * r;
        rw = h / t1;
        log(`웹 : H - 2 x t2 - 2r = ${h}mm, 계산 결과 ${rw}\n`);
    }

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
    log(`Fcr = Pcr / Ag => ${Pcr / Ag} = ${Pcr} / ${Ag} : ${Pcr / Ag}N/mm^2\n`);

    log(`******** 여기는 다시 폭 두께비로 돌아갈 필요가 있습니다. ********`);
    log(`4) 설계압축 강도 산정`);

    log(`4 - 1) 설계압축 강도를 구하기 위해 약축에 대해 Fcr을 구해야 한다.`);
    // 보통은 Y축만 보면 된다. 하지만 지지점이 추가되면 둘을 비교해서 큰 걸 고른다.
    // 더 세장한 걸 기준으로 설계해야 하기 때문.
    const slendernessY = (K * Ly) / ry;
    log(`y에 대한 KL/r : ${K} * ${Ly} / ${ry} = ${slendernessY}`);
    const slendernessX = (K * Lx) / rx;
    log(`x에 대한 KL/r : ${K} * ${Lx} / ${rx} = ${slendernessX}`);
    const slenderness = Math.max(slendernessX, slendernessY);
    log(`둘 중 큰 값은 : ${slenderness}\n`);

    let Fcr;
    const Fe = (3.14 ** 2 * 210000) / slenderness ** 2; // 탄성휨좌굴강도
    if (slenderness < 4.71 * Math.sqrt(210000 / Fy)) {
        log(`Fcr이 4.71 * Math.sqrt(E / Fy)보다 작습니다. 따라서,`);
        log(`Fe = PI^2 * E / (KL/r)y^2 => Fe = ${Fe}N/mm^2`);
        Fcr = 0.658 ** (Fy / Fe) * Fy;
    } else {
        Fcr = 0.877 * Fe;
    }
    log(`Fcr은 따라서, 식 6.20(P138)를 고려해 ${Fcr}N/mm^2이 된다.`);

    log(`설계압축 강도의 저항계수 PI_c는 0.9로 계산한다.`);
    const Pn = Ag * Fcr;
    log(`0.9 Ag * Fcr(설계값) = ${(0.9 * Pn) / 1000}KN\n`);

    log(`5) 안정성 검토`);
    log(`책 139P의 마지막처럼 가장 큰 소요압축강도를 47P에서 구하여,`);
    log(`소요압축강도보다 설계 강도가 크면 안전하다고 생각해도 좋다.`);

    const case1 = 1.4 * (DL + FL);
    const case2 =
        1.2 * (DL + FL + TL) + 1.6 * (LL + HL) + 0.5 * Math.max(LrL, SL, RL);
    const case3 = 1.2 * DL + 1.6 * Math.max(LrL, SL, RL) + Math.max(LL, RL);
    const case4 = 1.2 * DL + 1.3 * WL + LL + 0.5 * Math.max(LrL, SL, RL);
    const case5 = 1.2 * DL + EL + LL + 0.2 * SL;
    const case6 = 0.9 * DL + 1.3 * WL + 1.6 * HL;
    const case7 = 0.9 * DL + EL + 1.6 * HL;
    const maxValue = Math.max(case1, case2, case3, case4, case5, case6, case7);

    log(`case1 : ${case1}KN`);
    log(`case2 : ${case2}KN`);
    log(`case3 : ${case3}KN`);
    log(`case4 : ${case4}KN`);
    log(`case5 : ${case5}KN`);
    log(`case6 : ${case6}KN`);
    log(`case7 : ${case7}KN`);
    log(`max : ${maxValue}KN`);

    if (maxValue < (0.9 * Pn) / 1000) {
        log(`${maxValue}KN가 ${(0.9 * Pn) / 1000}KN 보다 작다.`);
        log(`소요압축강도가 설계압축강도보다 작으므로 안전하다.`);
    } else {
        log(`안전하지 못하다.`);
    }
};

example();
