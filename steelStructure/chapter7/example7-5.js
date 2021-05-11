// 예제 7-4, 횡 비틀림 좌굴 강도
// 압연 H형강의 항복 강도는 플랜지의 항복 강도로 설계한다.

const root = Math.sqrt;

const example = (
    H = 600, // H * B * t1 * t2의 H형강
    B = 200, // H * B * t1 * t2의 H형강
    t1 = 11, // H * B * t1 * t2의 H형강
    t2 = 17, // H * B * t1 * t2의 H형강
    Fy = 265, // 웹 두께 t2, 플랜지 두께 t1이 모두 16mm 이하이므로 275N/mm^2, 초과하면 265N/mm^2

    r = 22, // rounded, 필릿부 반경
    Lb = 2.4 * 1000,
    ry = 41.2, // mm, y축 단면 2차 반경
    Zx = 2.98 * 10 ** 6, // H형강의 소성단면계수

    Sx = 2.59 * 10 ** 6, // mm^3
    J = 906 * 10 ** 3, // mm^4
    rts = 50.7, // rts는 주어지는 값, 주어지지 않을 경우에는 Iy * h0 / (2 * Sx) 로 구한다.

    Cb = 1 // 모르겠으면 그냥 1을 넣어도 되는 값
) => {
    const λw = (플랜지_폭두께비 = B / 2 / t2); // λ
    const λpw = (플랜지_조밀_단면한계 = 0.38 * root(210000 / Fy)); // λp
    const λrw = (플랜지_비조밀_단면한계 = 1.0 * root(210000 / Fy));
    console.log("플랜지 폭 두께비 : ", λw);
    console.log("플랜지 조밀 단면 한계 : ", λpw); // 이것보다 작으면 조밀 단면이다.
    console.log("플랜지 비조밀 단면 한계 : ", λrw); // 이것보다 크면 세장판단면이며, 두 값 사이의 값이면 비조밀단면이다.
    console.log();

    const λf = (웨브_폭두께비 = (H - 2 * (t2 + r)) / t1); // λ
    const λpf = (웨브_조밀_단면한계 = 3.76 * root(210000 / Fy)); // λp
    const λrf = (웨브_비조밀_단면한계 = 5.7 * root(210000 / Fy));
    console.log("웨브 폭 두께비 : ", λf);
    console.log("웨브 조밀 단면 한계 : ", λpf); // 이것보다 작으면 조밀 단면이다.
    console.log("웨브 비조밀 단면 한계 : ", λrf); // 이것보다 크면 세장판단면이며, 두 값 사이의 값이면 비조밀단면이다.

    if (λw < λpw && λf < λpf) {
        console.log();
        console.log("둘 다 조밀 단면이기 때문에 국부 좌굴이 없다.");
        console.log("따라서 횡비틀림좌굴강도에 의해 공칭휨강도가 결정된다.");

        // 보는 슬래브에 의해 압축 플랜지가 전 길이에 대해 횡방향으로 지지되어 있으므로 Lb = 0
        // const Lb = 0; Lb는 주어지는 값을 사용한다.

        const Lp = 1.76 * ry * root(210000 / Fy); // 완전 소성 휨 성능에 대한 한계 비지지 길이

        // rts는 주어지는 값, 주어지지 않을 경우에는 Iy * h0 / (2 * Sx) 로 구한다.
        const Lr = Math.PI * rts * root(210000 / (0.7 * Fy));
        console.log(`Lb = ${Lb}mm, 또는 ${Lb / 1000}m`);
        console.log(`LP = ${Lp}mm, 또는 ${Lp / 1000}m`);
        console.log(`Lr = ${Lr}mm, 또는 ${Lr / 1000}m`);
        console.log();
        // Lb가 Lp보다 작으면 소성설계구간, 휨비틀림좌굴강도는 소성 모멘트가 된다. 175P 그림 참고
        if (Lb < Lp) {
            // Zone 1
            console.log(`Lb가 Lp보다 작으므로 Zone1에 해당한다.`);
            const Mn = (Mp = Fy * Zx);
            console.log(`횡좌굴강도는 Mn = Mp = ${Mn / 1000000}kN*m`);
        } else if (Lb < Lr) {
            // Zone 2
            console.log(`Lb가 Lp보다는 크고 Lr보다 작으므로 Zone1에 해당한다.`);
            const Mp = Fy * Zx; // 소성모멘트
            console.log(`소성모멘트 Mp = ${Mp / 1000000}kN*m`);

            const Mr = 0.7 * Fy * Sx;
            console.log(`탄성한계횡자굴모멘트 Mr = ${Mr / 1000000}kN*m`);

            const Mn = Cb * Mp - (Mp - Mr) * ((Lb - Lp) / (Lr - Lp));
            console.log(`횡좌굴강도는 Mn = ${Mn / 1000000}kN*m`);
        } else {
        }
    }
};
example();
