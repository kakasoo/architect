// 예제 7-2 용접 H형강의 국부좌굴에 의한 단면의 구분
// 용접이라는 키워드가 중요하다. 매직 넘버들이 용접에 맞춰져 있다.

const root = Math.sqrt;

const example = (
    H = 600, // H * B * t1 * t2의 H형강
    B = 300, // H * B * t1 * t2의 H형강
    t1 = 8, // H * B * t1 * t2의 H형강
    t2 = 12, // H * B * t1 * t2의 H형강
    Fy = 275, // 웹 두께 t2, 플랜지 두께 t1이 모두 16mm 이하이므로 275N/mm^2

    r = 0 // rounded, 필릿부 반경, 용접인 경우에 0이 된다.
) => {
    const λf = (플랜지_폭두께비 = B / 2 / t2); // λ
    const λpf = (플랜지_조밀_단면한계 = 0.38 * root(210000 / Fy)); // λp

    const kc = 4 / root(H / t1);
    const FL = 0.7 * Fy;
    const λrf = (플랜지_비조밀_단면한계 = 0.95 * root((kc * 210000) / FL)); // 공식이 변하는 case는 173P 비콤팩트 단면 산정에서 확인한다.
    console.log("플랜지 폭 두께비 : ", λf);
    console.log("플랜지 조밀 단면 한계 : ", λpf); // 이것보다 작으면 조밀 단면이다. 이 경우, 비조밀 단면 한계는 구할 필요도 없다.
    console.log("플랜지 비조밀 단면 한계 : ", λrf); // 이것보다 크면 세장판단면이며, 두 값 사이의 값이면 비조밀단면이다.
    console.log();

    const λw = (웨브_폭두께비 = (H - 2 * (t2 + r)) / t1); // λ
    const λpw = (웨브_조밀_단면한계 = 3.76 * root(210000 / Fy)); // λp
    const λrw = (웨브_비조밀_단면한계 = 5.7 * root(210000 / Fy));
    console.log("웨브 폭 두께비 : ", λw);
    console.log("웨브 조밀 단면 한계 : ", λpw); // 이것보다 작으면 조밀 단면이다. 이 경우, 비조밀 단면 한계는 구할 필요도 없다.
    console.log("웨브 비조밀 단면 한계 : ", λrw); // 이것보다 크면 세장판단면이며, 두 값 사이의 값이면 비조밀단면이다.

    // 결론 부는 주석 참고
};
example();
