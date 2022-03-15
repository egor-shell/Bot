import puppeteer from 'puppeteer'

// Work with Admin Cab
// Refacor, need single module & connect with main server
const doSomePuppetterThings = async () => {
	const localStorage = {
		'Meteor.loginToken': 'hDpENj3ywQh307ICUV_KxDyAglq4d4rzH5_kr1aBayX',
		'Meteor.loginTokenExpires':
			'Sun Jun 05 2022 20:35:38 GMT+0600 (Омск, стандартное время)',
		'Meteor.userId': 'oHD3vrLjGWKrZdRRv'
	}
	const url = 'https://adminka.topskin.one/'
	const browser = await puppeteer.launch({
		headless: true
	})
	setTSData(browser, url, localStorage)
	const page = await browser.newPage()
	await page.goto(url)
	if (page.url() !== url) {
		setGoogleData(browser)
		await page.goto(url)
	}
	await page.waitForTimeout(1000)
	const bodyHTML = await page.evaluate(() => document.body.innerHTML)
	console.log(bodyHTML)
	await browser.close()
}

const setGoogleData = async (browser: puppeteer.Browser) => {
	const page = await browser.newPage()
	await page.setRequestInterception(true)
	page.on('request', (r) => {
		r.respond({
			status: 200,
			contentType: 'text/plain',
			body: 'tweak me.'
		})
	})
	await page.goto('https://accounts.google.com/')
	const cookies = [
		{
			name: 'SID',
			value:
				'IAi7u7StltaxNvYpCF5I3fPoDHl0IFAZrpfVPINXju7gH6OTjHCMZO0DFCjkDcm9TwqjgQ.'
		},
		{
			name: '__Secure-1PSID',
			value:
				'IAi7u7StltaxNvYpCF5I3fPoDHl0IFAZrpfVPINXju7gH6OTp4imLEvErSCBnQCBUVbucQ.'
		},
		{
			name: '__Secure-3PSID',
			value:
				'IAi7u7StltaxNvYpCF5I3fPoDHl0IFAZrpfVPINXju7gH6OT-q3ptKNF_ZvjdDWskJFmhA.'
		},
		{
			name: 'HSID',
			value: 'Aq2FMJw1WObjn_4W5'
		},
		{
			name: 'SSID',
			value: 'AMQqOfu-FbubkeknO'
		},
		{
			name: 'APISID',
			value: 'GUIs5WVYNzc696F0/AXTYnCw2FleX9lWbg'
		},
		{
			name: 'SAPISID',
			value: 'fG6jqtxI7K3DO7Eu/A8DTzS-WF15-jgWcF'
		},
		{
			name: '__Secure-1PAPISID',
			value: 'fG6jqtxI7K3DO7Eu/A8DTzS-WF15-jgWcF'
		},
		{
			name: '__Secure-3PAPISID',
			value: 'fG6jqtxI7K3DO7Eu/A8DTzS-WF15-jgWcF'
		},
		{
			name: 'NID',
			value:
				'511=TEsRsBdC5ZIzYD5oPG9sVWB1g8zsIYH_LWVH4CbPWgM0hN448qlERwqzVvTOmj20NQ-v6mumPFwMh3gAKJSkIV9AdHH-Z4drOqu_v7HZJ8XX3iV8SdZcWC9QjysTon5z1XudN2mjelI_s6Gth08o0tSLhsfBqkuSQFj4jjSfQ-LEidvm'
		},
		{
			name: 'SIDCC',
			value:
				'AJi4QfFaVn5uXz-_VXfh80vrQgSWmslQzJwqrAxVgh3plCbkIGLbJELV3HsBH_jZeGRujq9uJQ'
		},
		{
			name: '__Secure-3PSIDCC',
			value:
				'AJi4QfFZOKGrRrtsUqnk3nmbHVu95uNluwGkQ5ySln1tx0CGvSDPOpkNSW9JuovPyAFd7Yr5Bw'
		}
	]
	await page.setCookie(...cookies)
	await page.close()
}
const setTSData = async (
	browser: puppeteer.Browser,
	url: string,
	values: any
) => {
	const page = await browser.newPage()
	// Set cookie on TS
	await page.setRequestInterception(true)
	page.on('request', (r) => {
		r.respond({
			status: 200,
			contentType: 'text/plain',
			body: 'tweak me.'
		})
	})
	await page.goto(url)
	const cookies = [
		{
			name: '_ym_isad',
			value: '1'
		},
		{
			name: '_gid',
			value: 'GA1.2.339766743.1646636911'
		},
		{
			name: '_fbp',
			value: 'fb.1.1640610822950.677425412'
		},
		{
			name: '_ga',
			value: 'GA1.2.1962080999.1640610823'
		},
		{
			name: 'CF_Authorization',
			value:
				'eyJhbGciOiJSUzI1NiIsImtpZCI6IjA2YmMzNzU0MTM4N2ZhZjNiMzg0YjJiNDQ1ZDAzNjVmZWI5YzViYTc1MGQ3ODFjZWNjZmVhNjhkNzQyNWUyODkifQ.eyJhdWQiOlsiZGE2ZjQ3N2Q1MGNlODZlMjA0NWEzYWNlYTY5MDNhYWI5NGFmZjdhMTM3ZDBiYjVkNTA4MzIwYjVjOWFiMDI5YSJdLCJlbWFpbCI6InNoZWxsQGNzZ28uY29tIiwiZXhwIjoxNjQ5NDc4NzU3LCJpYXQiOjE2NDY4NTA3NTcsIm5iZiI6MTY0Njg1MDc1NywiaXNzIjoiaHR0cHM6Ly9hZG1pbmthLmNsb3VkZmxhcmVhY2Nlc3MuY29tIiwidHlwZSI6ImFwcCIsImlkZW50aXR5X25vbmNlIjoibmx0Z2poQWpNNjhHWkNCZyIsInN1YiI6IjAwY2E4N2FhLTAwYjAtNDg2ZS04ODA4LWZlMmM3MDZlMWQ2OSIsImNvdW50cnkiOiJSVSJ9.ogkAI4rYmAd7MHwJXElCsjq8fWC9g_Y4bXgXfw-__NLHQqlQr5PUIMUUYXEUr3VBVr5wYq2pb1qR9H2CmyKCtragRow413pfE-GirVe9NB99rZdS1zQP7L3W70k2DfwjIQgYKYtriBDZwFWf1IeVwemDW-wqZUX7Tu8ozw-cFVsQd62P-UpN70KoIxFlGU8kVFpKVVZaCmgm7WlYCkQ1tgJYS-4Wy-64X3Ke65SaXJjVoo4MdOAopV3g2cj1hhRJ0Fgu_Tj_o1hRosE57YyAm30xuBtMlpVj_ZbPURea2zkMIzNlplSmkKCTjlc3lhGQRUo4efsVHYHaJup3VOX6NQ'
		},
		{
			name: '_ym_d',
			value: '1640610823'
		},
		{
			name: '_ym_uid',
			value: '16406108231038715906'
		}
	]
	await page.setCookie(...cookies)
	await page.evaluate((values) => {
		localStorage.clear()
		for (const key in values) {
			localStorage.setItem(key, values[key])
		}
	}, values)
	await page.close()
}

doSomePuppetterThings()
