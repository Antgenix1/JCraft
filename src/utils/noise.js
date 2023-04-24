export function noise(x, y) {
    const floorX = Math.floor(x)
    const floorY = Math.floor(y)

    const fade = (t) => {
        return t * t * t * (t * (t * 6 - 15) + 10)
    }

    const lerp = (a, b, t) => {
        return a + t * (b - a)
    }

    const smoothstep = (min, max, value) => {
        const x = Math.max(0, Math.min(1, (value - min) / (max - min)))
        return x * x * (3 - 2 * x)
    }

    const grad = (hash, x, y) => {
        const gradients = [[1,1], [-1,1], [1,-1], [-1,-1], [1,0], [-1,0], [0,1], [0,-1]]
        const [gradX, gradY] = gradients[hash % 8]
        return gradX * (x - floorX) + gradY * (y - floorY)
    }

    const p = [[0,0], [1,0], [0,1], [1,1]]

    const dot2D = (vec1, vec2) => {
        return vec1[0] * vec2[0] + vec1[1] * vec2[1]
    }

    const fadeCurve = (t) => {
        return t * t * t * (t * (t * 6 - 15) + 10)
    }

    const interpolate = (x0y0, x1y0, x0y1, x1y1, u, v) => {
        const lerpX0 = lerp(x0y0, x1y0, fadeCurve(u))
        const lerpX1 = lerp(x0y1, x1y1, fadeCurve(u))
        return lerp(lerpX0, lerpX1, fadeCurve(v))
    }

    let corners = []
    for (let i = 0; i < 4; i++) {
        const [px, py] = p[i]
        const hash = Math.floor(Math.abs(Math.sin(px + 37 * Math.sin(py + 73 * Math.sin(x + y)))))

        corners.push([grad(hash, px, py), px - x, py - y])
    }

    let values = []
    for (let i = 0; i < 2; i++) {
        const [a, b, t] = corners[i]
        const [c, d, s] = corners[i+2]
        values.push(interpolate(a, b, c, d, t, s))
    }

    return interpolate(values[0], values[1], 0, 0, smoothstep(-1, 1, x % 1), smoothstep(-1, 1, y % 1))
}
