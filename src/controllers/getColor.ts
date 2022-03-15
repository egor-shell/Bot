import getColors from 'get-image-colors'
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
export const queryColors = async (
	link: string,
	count?: number
): Promise<Set<string>> => {
	let reqHue: Set<string> = new Set()
	const colors = await getColors(link, {
		count: count ? count : 5,
		type: 'image/png'
	})
	colors.forEach((color) => {
		for (let i = 1; i < refColors.length; i++) {
			const prevColor = i === 1 ? refColors[0] : refColors[i - 1]
			const curColor = refColors[i]
			const checkColor: {
				H: number
				S: number
				L: number
				name: string | null
			} = {
				H: color.hsl()[0],
				S: Math.round(color.hsl()[1] * 100),
				L: Math.round(color.hsl()[2] * 100),
				name: null
			}
			if (!refColors || !curColor || !prevColor) {
				throw new Error("Color's list is not found")
			}
			if (
				Math.abs(prevColor.H - checkColor.H) <=
				Math.abs(curColor.H - checkColor.H)
			) {
				checkColor.name = prevColor.name
				switch (Math.round(checkColor.L / 50)) {
					case 0:
						if (checkColor.L <= 10) {
							reqHue.add('Black')
							break
						} else if (checkColor.S < 10) {
							reqHue.add('Gray')
							break
						}
						switch (checkColor.name) {
							case 'Yellow':
								checkColor.name = 'Green'
								break
							case 'Pink':
								checkColor.name = 'Purple'
								break
							case 'Orange':
								checkColor.name = 'Red'
								break
							default:
								reqHue.add(checkColor.name)
								break
						}
						reqHue.add(checkColor.name)
						break
					case 1:
						if (checkColor.S <= 10) {
							checkColor.name = 'Gray'
						}
						reqHue.add(checkColor.name)
						break
					case 2:
						if (checkColor.S <= 60 && checkColor.L >= 75) {
							reqHue.add('White')
							break
						}
						switch (checkColor.name) {
							case 'Red':
								checkColor.name = 'Pink'
								break
							case 'Blue':
								checkColor.name = 'Light Blue'
								break
							case 'Purple':
								checkColor.name = 'Pink'
								break
							default:
								reqHue.add(checkColor.name)
								break
						}
						reqHue.add(checkColor.name)
						break
				}
				break
			}
		}
	})
	return reqHue
}
