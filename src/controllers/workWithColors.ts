interface RGBA {
	r: number
	g: number
	b: number
	t: number
}
export const chunkLoader = async (rgba: RGBA[], count: number) => {
	const colorArr = []
	if (!rgba) {
		throw new Error('Data not found')
	}
	for (const pixel of rgba) {
		colorArr.push(hexToHSL(pixel))
	}
	return namedColor(colorArr, count)
}
function hexToHSL(rgba: RGBA) {
	let { r, g, b } = rgba
	r /= 255
	g /= 255
	b /= 255
	const l = Math.max(r, g, b)
	const s = l - Math.min(r, g, b)
	const h = s
		? l === r
			? (g - b) / s
			: l === g
			? 2 + (b - r) / s
			: 4 + (r - g) / s
		: 0
	return [
		Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h),
		Math.round(
			100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)
		),
		Math.round((100 * (2 * l - s)) / 2)
	]
}

const refColors = [
	{ H: 0, S: 100, L: 50, name: 'Red' },
	{ H: 30, S: 100, L: 50, name: 'Orange' },
	{ H: 45, S: 100, L: 50, name: 'Yellow' },
	{ H: 90, S: 100, L: 50, name: 'Green' },
	{ H: 200, S: 100, L: 50, name: 'Blue' },
	{ H: 280, S: 100, L: 50, name: 'Purple' },
	{ H: 300, S: 100, L: 50, name: 'Pink' },
	{ H: 330, S: 100, L: 50, name: 'Red' }
]
function namedColor(colors: Array<number[]>, count: number) {
	const colorNames: any = {}
	if (!colors) {
		throw new Error('ERROR WITH COLOR')
	}
	for (const color of colors) {
		let indCol = refColors.find((col) => col.H >= color[0]!)
		if (color[2]! <= 10) {
			indCol = { H: Infinity, S: 0, L: 0, name: 'Black' }
		} else if (color[1]! < 10) {
			indCol = { H: Infinity, S: 10, L: 50, name: 'Gray' }
		} else if (color[1]! <= 60 && color[2]! >= 75) {
			indCol = { H: Infinity, S: 10, L: 50, name: 'White' }
		}
		if (!indCol) indCol = refColors[refColors.length - 1]
		colorNames[indCol!.name] = (colorNames[indCol!.name] || 0) + 1
	}
	const sort = Object.keys(colorNames).sort((a, b) => {
		return colorNames[b] - colorNames[a]
	})
	return sort.slice(0, count)
}
