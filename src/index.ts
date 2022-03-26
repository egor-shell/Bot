import { chunkLoader } from './controllers/workWithColors.js'
import canvas from 'canvas'
const workWithImage = async (path: string, count?: number) => {
	count = typeof count !== 'undefined' ? count : 5
	const image = await canvas.loadImage(path)
	const paramsImage = { w: image.width, h: image.height }
	const can = canvas.createCanvas(paramsImage.w, paramsImage.h)
	const ctx = can.getContext('2d')
	canvas.loadImage(path).then(async (image) => {
		ctx.drawImage(image, 0, 0, paramsImage.w, paramsImage.h)
		const rgba = ctx.getImageData(0, 0, paramsImage.w, paramsImage.h).data
		const color: any[] = []
		for (let i = 0; i < rgba.length; i += 4) {
			const pixel = {
				r: rgba[i],
				g: rgba[i + 1],
				b: rgba[i + 2],
				t: rgba[i + 3]
			}
			if (pixel.t && pixel.t > 0) {
				color.push(pixel)
			}
		}
		const trueColors = chunkLoader(color, count!)
		console.log(await trueColors)
	})
}
workWithImage('https://images.steamcdn.io/topskin/cases/azimov.png')
