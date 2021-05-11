// 예제 7-12, 7장 휨재 안정성 검사

const root = Math.sqrt;
const log = console.log;

const example = (
    용접여부 = true,

    H = 600, // H * B * t1 * t2의 H형강
    B = 200, // H * B * t1 * t2의 H형강
    t1 = 11, // H * B * t1 * t2의 H형강, tw
    t2 = 17, // H * B * t1 * t2의 H형강, tf
    Fy = 345, // 웹 두께 t2, 플랜지 두께 t1이 모두 16mm 이하이므로 275N/mm^2, 초과하면 265N/mm^2

    r = 22, // rounded, 필릿부 반경

    Lb = 3 * 1000, // 횡좌굴을 구하기 위해 사용한다. 예제 7-4, 7-5 참고
    ry = 41.2, // mm, y축 단면 2차 반경
    Zx = 2980 * 10 ** 3, // H형강의 소성단면계수

    Sx = 2590 * 10 ** 3, // mm^3
    J = 906 * 10 ** 3, // mm^4
    rts = 50.7, // 테이블 확인 바람. rts는 주어지는 값, 주어지지 않을 경우에는 Iy * h0 / (2 * Sx) 로 구한다.

    Cb = 1.06, // 모르겠으면 그냥 1을 넣어도 되는 값

    N = undefined, // mm, 국부항복강도를 구해야 할 때 사용한다. 예제 7-9 참고.
    반력 = 200, // kN, 국부항복강도를 구해야 할 때 사용한다. 예제 7-9 참고.
    반력_재단_사이_거리 = undefined // 반력과 재단 사이 거리는 188P 그림 7.27과 같이 확인한다. 예제 7-10 참고.
) => {
    const λf = (플랜지_폭두께비 = B / 2 / t2); // λ
    const λpf = (플랜지_조밀_단면한계 = 0.38 * root(210000 / Fy)); // λp
    let λrf;
    if (용접여부) {
        log("용접 단면의 플랜지 비조밀 단면한계를 구한다.");
        const FL = 0.7 * Fy;
        const kc = 4 / root(H / t1);
        λrf = 플랜지_비조밀_단면한계 = 0.95 * root((kc * 210000) / FL);
    } else {
        log("압연 단면의 플랜지 비조밀 단면한계를 구한다.");
        λrf = 플랜지_비조밀_단면한계 = 1.0 * root(210000 / Fy);
    }
    log("플랜지 폭 두께비 : ", λf);
    log("플랜지 조밀 단면 한계 : ", λpf); // 이것보다 작으면 조밀 단면이다.
    log("플랜지 비조밀 단면 한계 : ", λrf); // 이것보다 크면 세장판단면이며, 두 값 사이의 값이면 비조밀단면이다.
    log();

    const λw = (웨브_폭두께비 = (H - 2 * (t2 + r)) / t1); // λ
    const λpw = (웨브_조밀_단면한계 = 3.76 * root(210000 / Fy)); // λp
    const λrw = (웨브_비조밀_단면한계 = 5.7 * root(210000 / Fy));
    log("웨브 폭 두께비 : ", λw);
    log("웨브 조밀 단면 한계 : ", λpw); // 이것보다 작으면 조밀 단면이다.
    log("웨브 비조밀 단면 한계 : ", λrw); // 이것보다 크면 세장판단면이며, 두 값 사이의 값이면 비조밀단면이다.

    if (λw < λpw && λf < λpf) {
        log();
        log("둘 다 조밀 단면이기 때문에 국부 좌굴이 없다.");
        log("따라서 횡비틀림좌굴강도에 의해 공칭휨강도가 결정된다.");

        // 보는 슬래브에 의해 압축 플랜지가 전 길이에 대해 횡방향으로 지지되어 있으므로 Lb = 0
        // const Lb = 0; Lb는 주어지는 값을 사용한다.

        const Lp = 1.76 * ry * root(210000 / Fy); // 완전 소성 휨 성능에 대한 한계 비지지 길이

        // rts는 주어지는 값, 주어지지 않을 경우에는 Iy * h0 / (2 * Sx) 로 구한다.
        const Lr = Math.PI * rts * root(210000 / (0.7 * Fy));
        log(`Lb = ${Lb}mm, 또는 ${Lb / 1000}m`);
        log(`LP = ${Lp}mm, 또는 ${Lp / 1000}m`);
        log(`Lr = ${Lr}mm, 또는 ${Lr / 1000}m`);
        log();
        // Lb가 Lp보다 작으면 소성설계구간, 휨비틀림좌굴강도는 소성 모멘트가 된다. 175P 그림 참고
        if (Lb < Lp) {
            // Zone 1
            log(`Lb가 Lp보다 작으므로 Zone1에 해당한다.`);
            const Mn = (Mp = Fy * Zx);
            log(`횡좌굴강도는 Mn = Mp = ${Mn / 1000000}kN*m`);
        } else if (Lb < Lr) {
            // Zone 2
            log(`Lb가 Lp보다는 크고 Lr보다 작으므로 Zone2에 해당한다.`);
            const Mp = Fy * Zx; // 소성모멘트
            log(`소성모멘트 Mp = ${Mp / 1000000}kN*m`);

            const Mr = 0.7 * Fy * Sx;
            log(`탄성한계횡자굴모멘트 Mr = ${Mr / 1000000}kN*m`);

            const Mn = Cb * Mp - (Mp - Mr) * ((Lb - Lp) / (Lr - Lp));
            log(`횡좌굴강도는 Mn = ${Mn / 1000000}kN*m`);

            // const Mmax = ((38.4 * 12) / 2) * 6;
            // console.log(Mmax);
        } else {
            // 이 경우를 고려한 예제가 없어서 작성하지 않는다.
        }
    } else if (λpf < λf && λf <= λrf) {
        // 국부좌굴강도 181P, 웨브가 조밀 단면이라고 해도 플랜지가 조밀 단면이 아니라면
        log();
        log("웨브가 조밀 단면이라고 해도 플랜지가 아닌 경우.");

        const Mp = Fy * Zx;
        log(`소성모멘트 Mp = ${Mp / 1000000}kN*m`);
        const Mr = 0.7 * Fy * Sx;
        log(`탄성한계 횡 좌굴 모멘트 Mr = ${Mr / 1000000}kN*m`);

        const Mn = Mp - (Mp - Mr) * ((λf - λpf) / (λrf - λpf));
        log(`국부좌굴강도는 Mn = ${Mn / 1000000}kN*m`);
    } else if (λf > λrf) {
        log("세장판 단면 플랜지의 경우.");
    }

    log("------------------------------------------------------------");
    log("공칭전단강도를 구할 때에는 웨브의 폭두께비만 검토한다.");
    log("웨브 폭 두께비 : ", λw);
    if (λw < 2.24 * root(210000 / Fy)) {
        log(
            `λw < 2.24 * root(210000/ Fy (= ${
                2.24 * root(210000 / Fy)
            }) 이므로 Cv = 1.0`
        );
        const Cv = 1;
        const Aw = H * t1; // d * tw라고도 할 수 있다.
        const Vn = 0.6 * Fy * Aw * Cv;
        log(`공칭전단강도 Vn = ${Vn / 1000}kN`);
        log(`전단력도를 그려서 Vmax보다 φv * Vn이 작은지 확인한다.`);
        log(`만약 Vmax가 φv * Vn보다 작다면 안전한 것이다.`);

        // const Vmax = (38.4 * 12) / 2;
        // console.log(Vmax);
    }

    if (N === undefined) {
        log("------------------------------------------------------------");
        log(
            "집중하중에 의한 국부항복 (국부적인 압축응력, 인장응력, 반력에 의한)"
        );

        log();
        log(
            "웨브의 국부 항복 강도 구하기 (N 값을 파라미터에 주었는지 확인한다.)"
        );
        const k = t2 + r; // tw + r
        if (N / 2 < H) {
            log(`부재의 춤 H (= d) 이하의 거리에 작용점이 있을 경우.`); // P186 참고
            const φl = 1.0; // 강도저항계수
            // const N = 90; // 제대로 대입되었는지 확인해보자.
            const Rn = (2.5 * k + N) * t1 * Fy;
            log(
                `공칭강도 Rn = ${Rn / 1000}kN이고 강도저항계수 φl는 ${φl}이다.`
            );
            if (φl * Rn > 반력) {
                log(`φl * Rn이 반력 ${반력}kN보다 크므로, 안전하다.`);
            }
        } else if (N / 2 > H) {
            log(`부재의 춤 H (= d)보다 작용점 거리가 클 경우.`); // P186 참고
            const φl = 1.0; // 강도저항계수
            // const N = 90; // 제대로 대입되었는지 확인해보자.
            const Rn = (5 * k + N) * t1 * Fy;
            log(
                `공칭강도 Rn = ${Rn / 1000}kN이고 강도저항계수 φl는 ${φl}이다.`
            );
            if (φl * Rn > 반력) {
                log(`φl * Rn이 반력 ${반력}kN보다 크므로, 안전하다.`);
            }
        }

        log();
        log("웨브의 크립플링강도 구하기");
        if (반력_재단_사이_거리 >= H / 2) {
        } else if (반력_재단_사이_거리 < H / 2) {
            if (N / H < 0.2) {
                log(`N/d가 0.2보다 작으므로 식 (7.37에 해당.)`);
                const φl = 0.75;
                Rn =
                    0.4 *
                    t1 ** 2 *
                    (1 + 3 * (N / H) * (t1 / t2) ** 1.5) *
                    root((210000 * Fy * t2) / t1);
                log(`Rn = ${Rn / 1000}kN`);
                log(`φl Rn = ${φl} * ${Rn / 1000} = ${(φl * Rn) / 1000}kN`);
                log(
                    `${(φl * Rn) / 1000}이 반력 = ${반력}kN보다 크면 안전하다.`
                ); // 웨브의 크립플링에 대하여
            }
        }
    }
};
example();
