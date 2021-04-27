const blockDesign = require("./example5-6");

// H 형강 150 * 75 * 5 * 7은 bf 150, h 75, 기둥의 두께 5, 플랜지 두께 7을 의미한다.

const log = (text) => console.log(text);
const MAX_VALUE = 987654321;

// 인장재 설계 문제를 집대성하겠습니다.
// 총단면항복강도 : 총단면 * Fy * 0.9 (인장저항계수 PI_t)

const example = (
    shape = "H", // H || T || L (or ㄱ)
    n = 3, // 파스너의 개수
    ny = 4, // 파단 시에는 어느 축인지를 봐야 한다. 파스너의 개수와 일치하지 않는다!
    Fy = 275,
    Fu = 410,
    Ag = 6353,
    d = 22,
    t = 12,
    h = 200, // 단면적의 height가 아니라 높이, 즉 다리 길이 + 플랜지 두께 * 2
    bf = 200, // 플랜지의 길이
    x = 220, // 파스너 x축 전체 간격 (블록전단을 구하기 위해 필요)
    y = 50, // 전단블록 y축 길이 (블록전단을 구하기 위해 필요)
    x1 = 0,
    x2 = 0,
    block = 4
) => {
    log(`예제 5-7. 인장재의 설계.`);
    log(`1) 총 단면의 항복 강도를 구합니다.`);
    const Pn = Fy * Ag;
    const PI_Png = 0.9 * Pn;
    log(`PI * Pn = Fy * Ag * 0.9 : ${PI_Png}N, ${PI_Png / 1000}KN.\n`);

    log(`2) 유효 순단면적의 파단 강도를 구합니다.`);
    const An = Ag - ny * d * t;
    log(`순단면적 An = ${An}mm^2 입니다.`);

    let U; // 전단지연계수 U
    if (shape === "H" || shape === "T") {
        // H, T형강일 때 파스너의 개수가 4개 이상, 3개 이상일 때의 U 값들.
        if (n >= 4) {
            U = 0.7;
        } else if (n >= 3) {
            if (bf >= (2 * h) / 3) {
                U = 0.9;
            } else {
                U = 0.85;
            }
        }
    } else if (shape === "ㄱ" || shape === "L") {
        // 도심을 이용해서 구할 수 있다. 1 - X/L
        if (n >= 4) {
            // Math.max()
        } else if (n >= 3) {
            // Math.max()
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
};

// example();
example("H", 3, 4, 275, 410, 6355, 22, 12, 200, 200, 220, 50, 4);
