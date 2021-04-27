const log = (text) => console.log(text);
const MAX_VALUE = 987654321;

// 108P.
// 이 문제는 전단블록파단이 등장합니다.
const example = (
    x = 220, // x는 문제에서 직접 구하셔야 합니다.
    y = 50, // y는 문제에서 직접 구하셔야 합니다.
    t = (thickness = 12),
    d = (diameter = 22),
    n = 3,
    Fy = 275,
    Fu = 410,
    block = 4 // 총 4면이 접하고 있으므로 곱하기 4를 해줘야 한다.
) => {
    log(`블록 전단파단 구하기.\n`);
    log(`전단저항 총단면적을 구합니다.`);
    const Agv = x * t;
    log(`Agv = x * thickness : ${Agv}mm^2\n`);

    log(`인장저항 총단면적을 구합니다.`);
    const Agt = y * t;
    log(`Agt = y * thickness : ${Agt}mm^2\n`);

    log(`이제 전단저항과 인정저항의 순단면적을 구합니다.`);
    const Anv = Agv - d * (n - 0.5) * t;
    const Ant = Agt - d * (1 - 0.5) * t; // 이게 1이라는 보장은 없을 수도 있습니다.

    log(`Anv = ${Anv}mm^2, Ant = ${Ant}mm^2 입니다.`);

    const Ubs = 1.0; // 인장응력이 불균형할 경우에는 0.5
    const R1 = 0.6 * Fu * Anv + Ubs * Fu * Ant; // 순단면적과 인장 강도에 대한 공칭 강도 ( 전단 )
    const R2 = 0.6 * Fy * Agv + Ubs * Fu * Ant; // 항복 강도와 전체 단면적에 대한 공칭 강도 ( 항복 )
    const Rn = Math.min(R1, R2);
    log(`R1과 R2 에 큰 값이 기준이 됩니다. : ${Rn}N\n`);
    log(`ϕRn = 0.75 x Rn : ${0.75 * Rn}N, ${(0.75 * Rn) / 1000}KN`);

    if (block > 1) {
        log(`플랜지 면 반쪽이 ${(0.75 * Rn) / 1000}KN이므로,`);
        log(
            `거기에 block 수 ${block} 을 곱하면 ${
                ((0.75 * Rn) / 1000) * block
            }KN`
        );
    }

    return Rn * 0.75 * block;
};

module.exports = example;

// example();
