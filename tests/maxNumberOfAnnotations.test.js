const puppeteer = require('puppeteer')
const { requestInterceptor } = require('@/requestInterceptor');
const { measurePerformance } = require('@/helpers/measurePerformance');

jest.setTimeout(999_999_999)

const MOCK_ITEM_ID = 'mock_item'
const MOCK_DATASET = '1'
const MOCK_ITEM_PATH_PREFIX = '%2F'

const MAX_TASK_DURATION = 5

const MAX_NUMBER_OF_ANNOTATIONS = 20_000

const EXPECTED_NUMBER_OF_ANNOTATIONS = 5_000
const OLD_EXPECTED_NUMBER_OF_ANNOTATIONS = 2_000

async function getMaxNumberOfAnnotations(page) {
  const el = await page.waitForSelector('[data-test="bounding_box_tool"]')
  await el.click()

  const classSelectEl = await page.waitForSelector('.tool-class')
  await classSelectEl.click()

  const toolClassItem = await page.waitForSelector('.tool-class-selection-list .tool-class-item')
  await toolClassItem.click()

  const maxHeight = 500
  const maxWidth = 400

  let numberOfAnnotations = 0
  let measure = null

  let cell = -1 
  while (
    (
      measure === null ||
      measure.total < MAX_TASK_DURATION
    ) && 
    numberOfAnnotations < MAX_NUMBER_OF_ANNOTATIONS
  ) {
    if (((numberOfAnnotations * 1.2) * 5) % maxHeight <= 5) {
      cell++
    }

    const x = 400 + ((cell * 1.2) * 5) % maxWidth
    const y = 100 + ((numberOfAnnotations * 1.2) * 5) % maxHeight

    measure = await measurePerformance(page, async () => {
      await page.mouse.move(500, 500);
      await page.mouse.wheel({deltaY: -50});
      await page.mouse.wheel({deltaY: -100});
      await page.mouse.wheel({deltaY: -150});
      await page.mouse.wheel({deltaY: -200});
      await page.mouse.wheel({deltaY: -250});
      const btnEl = await page.waitForSelector('button[data-test="zoom-to-fit"')
      btnEl.click()
      await page.waitForTimeout(1000)

      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x + 5, y + 5);
      await page.mouse.up();
    })

    numberOfAnnotations++

    console.log(measure)

    await page.waitForTimeout(10)
  }

  return numberOfAnnotations
}

let browser
let page

beforeEach(async () => {
  browser = await puppeteer.launch({
    args: [
      '--disable-web-security'
    ],
    slowMo: 5,
    headless: false
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
      annotations: [],
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
      const num = await getMaxNumberOfAnnotations(page)

      console.info('LAYER_V2 on', num)

      expect(num).toBeGreaterThan(EXPECTED_NUMBER_OF_ANNOTATIONS)
    })
  })
})

describe('LAYER_V2 off', () => {
  beforeEach(async () => {
    page.on('request', requestInterceptor({
      annotations: [],
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
      const num = await getMaxNumberOfAnnotations(page)

      console.info('LAYER_V2 off', num)

      expect(num).toBeGreaterThan(OLD_EXPECTED_NUMBER_OF_ANNOTATIONS)
    })
  })
})
