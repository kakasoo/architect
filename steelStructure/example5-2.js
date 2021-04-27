const log = (text) => console.log(text);

// 103P.
// 이 문제는 불규칙 배치에 대한 순단면적을 구하는 문제입니다.
const example = (
    s = 60, // 가로축의 구멍 간격
    i1 = (interval1 = 60), // mm, 세로 축의 구멍 간격
    i2 = (interval2 = 100), // mm, 세로 축의 구멍 간격
    h = (height = 280), // 전체 높이
    t = (thickness = 10), // 두께, mm
    d = (diameter = 24), // 구멍의 직경 mm
    n1 = 2, // 구멍의 개수
    n2 = 3 // 구멍의 개수
) => {
    const S2tDiv4g = (s, g) => (s ** 2 / (4 * g)) * t;
    log(`예제 5-2. 불규칙 배치인 경우의 전체 면적, 순 단면적 구하기.\n`);
    log(`문제에서 주어지는 조건은 h, t, d, n, i (간격) 입니다.`);
    log(`직선 상으로 쪼개지는 경우.`);
    const Ag = height * thickness; // 전체 단면적 mm^2
    const An1 = Ag - n1 * d * thickness;
    log(`An1 : ${An1}mm^2\n`);

    log(`A-1-2-3-B인 경우.`);
    const An2 = Ag - n2 * d * thickness + S2tDiv4g(s, i1) + S2tDiv4g(s, i2);
    log(`An2 : ${An2}mm^2\n`);

    log(`An1와 구멍 개수가 같은 A-1-2-C, D-2-3-B는 고려할 필요가 없다.`);
    // log(`A-1-2-C인 경우.`);
    // log(`D-2-3-B인 경우.`);
    log(`따라서 An은 An1, An2 중 작은 값입니다. : ${Math.min(An1, An2)}mm^2`);
    const An = Math.min(An1, An2);

    log(`주어진 조건에서 알 수 있는 것은 면적입니다.`);
    log(`Ag : ${Ag}mm^2, An : ${An}mm^2`);
};

example();
