const log = (text) => console.log(text);
const MAX_VALUE = 987654321;

// 104P.
// 이 문제 역시 불규칙 단면에 대한 순단면적입니다.
// 구멍의 개수는 3개 뿐이며, ㄱ자 형강입니다.
// 또한 접힌 단면이 있습니다. i1은 두 간격의 합에 두께를 뺀 것입니다.
const example = (
    s = 30, // 가로축의 구멍 간격
    i1 = (interval1 = 90), // mm, 세로 축의 구멍 간격
    h = (height = 170), // 전체 높이
    t = (thickness = 10), // 두께, mm
    d = (diameter = 22), // 구멍의 직경 mm
    n1 = 2 // 구멍의 개수
) => {
    const S2tDiv4g = (s, g) => (s ** 2 / (4 * g)) * t;
    log(`예제 5-3. 불규칙 배치인 경우의 전체 면적, 순 단면적 구하기.\n`);
    log(`직선 상으로 쪼개지는 경우가 없습니다.`);
    const Ag = height * thickness; // 전체 단면적 mm^2
    const An1 = MAX_VALUE;
    // log(`An1 : ${An1}mm^2\n`);

    log(`엇갈리게 파단되는 경우.`);
    const An2 = Ag - n1 * d * thickness + S2tDiv4g(s, i1);
    log(`An2 : ${An2}mm^2\n`);

    log(`따라서 An은 An1, An2 중 작은 값입니다. : ${Math.min(An1, An2)}mm^2`);
    const An = Math.min(An1, An2);

    log(`주어진 조건에서 알 수 있는 것은 면적입니다.`);
    log(`Ag : ${Ag}mm^2, An : ${An}mm^2`);
};

example();
