import { queryColors } from './controllers/getColor.js'

const color = await queryColors(
	'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_galilar_cu_sandstorm_light_large.008937727e75bf840d2b511d3d8493a12b5ed2ac.png',
	3
)
console.log(color)
