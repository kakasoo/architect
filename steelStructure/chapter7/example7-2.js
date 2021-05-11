// 예제 7-2 국부좌굴에 의한 단면의 구분

const root = Math.sqrt;

const example = (
    H = 500, // H * B * t1 * t2의 H형강
    B = 200, // H * B * t1 * t2의 H형강
    t1 = 10, // H * B * t1 * t2의 H형강
    t2 = 16, // H * B * t1 * t2의 H형강
    Fy = 275, // 웹 두께 t2, 플랜지 두께 t1이 모두 16mm 이하이므로 275N/mm^2

    r = 20 // rounded, 필릿부 반경
) => {
    const λw = (플랜지_폭두께비 = B / 2 / 16); // λ
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

    // 결론 부는 주석 참고
};
example();
