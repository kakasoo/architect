const blockDesign = require("./example5-6");

// const blockDesign = (
//     x = 220, // x는 문제에서 직접 구하셔야 합니다.
//     y = 50, // y는 문제에서 직접 구하셔야 합니다.
//     t = (thickness = 12),
//     d = (diameter = 22),
//     n = 3,
//     Fy = 275,
//     Fu = 410,
//     block = 4 // 총 4면이 접하고 있으므로 곱하기 4를 해줘야 한다.
// ) => {
//     log(`블록 전단파단 구하기.\n`);
//     log(`전단저항 총단면적을 구합니다.`);
//     const Agv = x * t;
//     log(`Agv = x * thickness : ${Agv}mm^2\n`);

//     log(`인장저항 총단면적을 구합니다.`);
//     const Agt = y * t;
//     log(`Agt = y * thickness : ${Agt}mm^2\n`);

//     log(`이제 전단저항과 인정저항의 순단면적을 구합니다.`);
//     const Anv = Agv - d * (n - 0.5) * t;
//     const Ant = Agt - d * (1 - 0.5) * t; // 이게 1이라는 보장은 없을 수도 있습니다.

//     log(`Anv = ${Anv}mm^2, Ant = ${Ant}mm^2 입니다.`);

//     const Ubs = 1.0; // 인장응력이 불균형할 경우에는 0.5
//     const R1 = 0.6 * Fu * Anv + Ubs * Fu * Ant; // 순단면적과 인장 강도에 대한 공칭 강도 ( 전단 )
//     const R2 = 0.6 * Fy * Agv + Ubs * Fu * Ant; // 항복 강도와 전체 단면적에 대한 공칭 강도 ( 항복 )
//     const Rn = Math.min(R1, R2);
//     log(`R1과 R2 에 큰 값이 기준이 됩니다. : ${Rn}N\n`);
//     log(`ϕRn = 0.75 x Rn : ${0.75 * Rn}N, ${(0.75 * Rn) / 1000}KN`);

//     if (block > 1) {
//         log(`플랜지 면 반쪽이 ${(0.75 * Rn) / 1000}KN이므로,`);
//         log(
//             `거기에 block 수 ${block} 을 곱하면 ${
//                 ((0.75 * Rn) / 1000) * block
//             }KN`
//         );
//     }

//     return Rn * 0.75 * block;
// };

// H 형강 150 * 75 * 5 * 7은 bf 150, h 75, 기둥의 두께 5, 플랜지 두께 7을 의미한다.

const log = (text) => console.log(text);
const MAX_VALUE = 987654321;

// 인장재 설계 문제를 집대성하겠습니다.
// 총단면항복강도 : 총단면 * Fy * 0.9 (인장저항계수 PI_t)
example();

function example(
    shape = "ㄱ", // H || T || L (or ㄱ) 값 중에서 선택
    n = 3, // 파스너의 개수
    ny = 1, // 파단 시에는 어느 축인지를 봐야 한다. 파스너의 개수와 일치하지 않는다!
    Fy = 275,
    Fu = 410,
    Ag = 2976,
    d = 22, // 직경
    t = 12, // 두께

    h = 0, // H형강일 경우 필요, 단면적의 height가 아니라 높이, 즉 다리 길이 + 플랜지 두께 * 2
    bf = 0, // H형강일 경우 필요, 플랜지의 길이

    x = 205, // 전단블록 x축 길이 (블록전단을 구하기 위해 필요)
    y = 60, // 전단블록 y축 길이 (블록전단을 구하기 위해 필요)

    x1 = 33.6, // 도심1 ㄱ, L 형강에서만 필요, 도심은 직접 구하자.
    x2 = 36.4, // 도심2 ㄱ, L 형강에서만 필요, 도심은 직접 구하자.
    l = 160, // 파스너 전체 간격, L 형강에서만 필요. 도심과 이걸 이용해야 전단지연계수를 구할 수 있다.

    block = 2 // 실제 접하고 있는 단면의 수
) {
    log(`1) 총 단면의 항복 강도를 구합니다.`);
    const Pn = Fy * Ag * block; // 총단면도 block 수만큼
    const PI_Png = 0.9 * Pn;
    log(`PI * Pn = Fy * Ag * 0.9 : ${PI_Png}N, ${PI_Png / 1000}KN.\n`);

    log(`2) 유효 순단면적의 파단 강도를 구합니다.`);
    const An = (Ag - ny * d * t) * block;
    log(`순단면적 An = ${An}mm^2 입니다.`);

    let U = 0; // 전단지연계수 U, 도심이 0이면 그냥 1이 된다. 주의깊게 볼 부분.
    if (shape === "H" || shape === "T") {
        if (n >= 4) {
            U = Math.max(U, 0.7);
        } else if (n >= 3) {
            if (bf >= (2 * h) / 3) {
                U = Math.max(U, 0.9);
            } else {
                U = Math.max(U, 0.85);
            }
        }
    } else if (shape === "ㄱ" || shape === "L") {
        // 도심을 이용해서 구할 수 있다. 1 - X/L
        U = 1 - Math.max(x1, x2) / l;
        if (n >= 4) {
            U = Math.max(U, 0.8);
        } else if (n >= 2) {
            U = Math.max(U, 0.6);
        }
    }

    log(`전단지연계수 U는 ${U} 입니다.`);
    const Ae = U * An;
    log(`유효단면적 Ae = U x An, 즉 Ae = ${Ae}mm^2`);
    const PI_t = 0.75;
    const Pne = Fu * Ae;
    const PI_Pne = PI_t * Pne;
    log(`PI * Pn = ${PI_Pne}N, ${PI_Pne / 1000}KN\n`);

    log(`3) 블록전단은 example5-6을 이용합니다.`);
    const PI_Rn = blockDesign(x, y, t, d, n, Fy, Fu, block);

    console.log();
    log(`4) 총단면항복강도, 유효순단면적파단강도, 블록전단파단 중 min은?`);
    log(`Answer : ${Math.min(PI_Png, PI_Pne, PI_Rn) / 1000}KN`);
}
