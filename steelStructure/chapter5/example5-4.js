const log = (text) => console.log(text);
const MAX_VALUE = 987654321;

// 107P.
// 이 문제는 유효 순단면적이 등장합니다.
// 만약 이 문제에서 파스너가 3개 이상이면 0.6과 비교해야 합니다.
const example = (
    Ag = 3477, // 전체 단면적이 주어진 경우
    d = 27, // 직경
    Cx = 41.4, // x축 도심 거리
    Cy = 41.4, // y축 도심 거리
    t = (thickness = 12),
    n = 1,
    h = (height = 150),
    l = (length = 200),
    i = 55
) => {
    log(`예제 5-4. 인장 등변강, 유효순단면적 구하기.\n`);
    log(`이 문제는 전체 단면적과 도심 거리가 주어졌습니다.`);

    log(`순단면적 An은 Ag - ndt로 구합니다.`);
    const An = Ag - n * d * thickness;
    log(`An : ${An}mm^2\n`);

    log(`주어진 조건에서 알 수 있는 것은 면적입니다.`);
    log(`Ag : ${Ag}mm^2, An : ${An}mm^2`);

    // 여기서부터 유효 순단면적을 구하기 위해 전단 지연 계수가 필요합니다.
    const x1 = Cx;
    const x2 = h - i - Cy;
    log(`도심까지의 거리 x1, x2 : ${x1}mm, ${x2}mm 중 큰 값을 구합니다.`);
    const U = 1 - Math.max(x1, x2) / l;
    log(`전단지연계수 U : ${U} 입니다.\n`); // 파스너가 3개 이상이면 0.6과 비교해야합니다. (106P 참고.)
    log(`유효 순단면적 Ae = U x An : ${U * An}mm^2`);
};

example();
