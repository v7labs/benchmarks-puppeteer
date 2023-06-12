/**
 * Measure annotation creation performance with pre-defined number of annotations.
 * 
 * Steps:
 * 1. Open workview page with 3002 annotation items
 * 2. Create 10 bounding box annotations
 */

const puppeteer = require('puppeteer')
const { requestInterceptor } = require('@/requestInterceptor');
const { measurePerformance } = require('@/helpers/measurePerformance');

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

const MAX_TASKS_DURATION = 6
const OLD_MAX_TASKS_DURATION = 65

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

describe('LAYER_V2 on', () => {
  beforeEach(async () => {
    page.on('request', requestInterceptor({
      features: require('@fixtures/api/teams/1/features.json')
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
  })

  describe('bounding box tool', () => {
    it('Measure BBox annotation creation with LAYER_V2 on', async () => {
      const res = await measurePerformance(page, async () => {
        await createBBoxAnnotations(page)
      })

      console.info('LAYER_V2', res)

      expect(res.total)
        .toBeLessThan(MAX_TASKS_DURATION);
    })
  })
})

describe('LAYER_V2 off', () => {
  beforeEach(async () => {
    page.on('request', requestInterceptor({
      features: require('@fixtures/api/teams/1/features.json')
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
  })

  describe('bounding box tool', () => {
    it('Measure BBox annotation creation with LAYER_V2 off', async () => {
      const res = await measurePerformance(page, async () => {
        await createBBoxAnnotations(page)
      })

      console.info('non-LAYER_V2', res)

      expect(res.total)
        .toBeLessThan(OLD_MAX_TASKS_DURATION);
    })
  })
})