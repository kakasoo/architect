// 102P.
// 이 문제는 전체 단면적, 순단면적을 구하는 문제입니다.
const example = (
    h = (height = 160), // 높이, mm
    t = (thickness = 6), // 두께, mm
    d = (diameter = 22), // 구멍의 직경 mm, 59p 표 4.5 참고
    n = 2 // 구멍의 개수
) => {
    console.log(`예제 5-1. 정렬 배치인 경우의 전체 면적, 순 단면적 구하기.`);
    console.log(`문제에서 주어지는 조건은 h, t, d, n입니다.`);

    const Ag = height * thickness; // 전체 단면적 mm^2
    const An = Ag - n * d * thickness;

    console.log(`주어진 조건에서 알 수 있는 것은 면적입니다.`);
    console.log(`Ag : ${Ag}mm^2, An : ${An}mm^2`);
};

example();
