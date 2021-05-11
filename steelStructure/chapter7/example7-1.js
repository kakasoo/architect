// 예제 7-1 항복모멘트, 소성모멘트, 형상 계수

const example = (
    Fy = 275, // N/mm^2, 항복 강도
    Fu = 410, // N/mm^2, 극한 강도

    Sx = 1910 * 10 ** 3, // mm^3, 탄성단면계수 (부표 1.1, 330p)
    Zx = 2180 * 10 ** 3 // mm^3, 소성단면계수 (부표 1.1, 330p)
) => {
    const My = Fy * Sx; // 강축 x에 대한 항복 모멘트
    const Mp = Fy * Zx; // 강축 x에 대한 소성 모멘트
    console.log("강축 x에 대한 항복 모멘트 My : ", My / 10 ** 6, "kN * m");
    console.log("강축 x에 대한 항복 모멘트 Mp : ", Mp / 10 ** 6, "kN * m");

    console.log("형상계수 (Mp / My) : ", Mp / My);
};
example();
