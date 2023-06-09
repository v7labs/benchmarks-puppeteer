const puppeteer = require('puppeteer')
const { requestInterceptor } = require('./requestInterceptor');
const { measurePerformance } = require('./helpers/measurePerformance');

const MOCK_ITEM_ID = 'mock_item'
const MOCK_DATASET = '1'
const MOCK_ITEM_PATH_PREFIX = '%2F'

async function createBBoxAnnotations(page) {
  const el = await page.waitForSelector('[data-test="bounding_box_tool"]')
  await el.click()

  const classSelectEl = await page.waitForSelector('.tool-class')
  await classSelectEl.click()

  const toolClassItem = await page.waitForSelector('.tool-class-selection-list .tool-class-item')
  await toolClassItem.click()

  for (let i = 0; i <= 10; i++) {
    const y = 300 + (i * 10)

    await page.mouse.move(500, y);
    await page.mouse.down();
    await page.mouse.move(800, y + 50);
    await page.mouse.up();

    await page.waitForTimeout(1)
  }
}

const MAX_TASKS_DURATION = 10

let browser
let page

beforeEach(async () => {
  browser = await puppeteer.launch({
    args: [
      '--disable-web-security'
    ],
    headless: 'new'
  })
  page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 714 });
  await page.setRequestInterception(true)
})

afterEach(async () => {
  await browser.close()
})

it('Measure BBox annotation creation with LAYER_V2 on', async () => {
  page.on('request', requestInterceptor({
    features: require('./fixtures/api/teams/1/features.json')
      .map(feature => {
        if (feature.name === 'LAYER_V2') { feature.enabled = true; }

        return feature
      })
  }))

  await page.goto(`http://localhost:8080`)

  await page.evaluate(() => {
    localStorage.clear()
    localStorage.setItem('token', 'mock-token-value')
    localStorage.setItem('refresh_token', 'mock-token-value')
  })

  await page.goto(
    `http://localhost:8080/workview?item_path_prefix=${MOCK_ITEM_PATH_PREFIX}&dataset=${MOCK_DATASET}&item=${MOCK_ITEM_ID}`,
    { waitUntil: 'domcontentloaded' }
  )

  await page.waitForNetworkIdle()

  const modalEl = await page.waitForSelector('.modal__close-button')
  modalEl.click()

  const res = await measurePerformance(page, async () => {
    await createBBoxAnnotations(page)
  })

  expect(res.total)
    .toBeLessThan(MAX_TASKS_DURATION);
}, 90_000)

it('Measure BBox annotation creation with LAYER_V2 off', async () => {
  page.on('request', requestInterceptor({
    features: require('./fixtures/api/teams/1/features.json')
      .map(feature => {
        if (feature.name === 'LAYER_V2') { feature.enabled = false; }

        return feature
      })
  }))

  await page.goto(`http://localhost:8080`)

  await page.evaluate(() => {
    localStorage.clear()
    localStorage.setItem('token', 'mock-token-value')
    localStorage.setItem('refresh_token', 'mock-token-value')
  })

  await page.goto(
    `http://localhost:8080/workview?item_path_prefix=${MOCK_ITEM_PATH_PREFIX}&dataset=${MOCK_DATASET}&item=${MOCK_ITEM_ID}`,
    { waitUntil: 'domcontentloaded' }
  )

  await page.waitForNetworkIdle()

  const modalEl = await page.waitForSelector('.modal__close-button')
  modalEl.click()

  const res = await measurePerformance(page, async () => {
    await createBBoxAnnotations(page)
  })

  expect(res.total)
    .toBeLessThan(MAX_TASKS_DURATION);
}, 90_000)