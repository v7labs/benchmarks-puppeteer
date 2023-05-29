const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

const MOCK_ITEM_ID = 'mock_item'
const MOCK_DATASET = '1'
const MOCK_ITEM_PATH_PREFIX = '%2F'

const requestInterceptor = (interceptedRequest) => {
  if (interceptedRequest.isInterceptResolutionHandled()) {
    return
  }

  if (
    interceptedRequest.url().includes('/m.stripe.com/') ||
    interceptedRequest.url().includes('/js.stripe.com/') ||
    interceptedRequest.url().includes('/ai/running_sessions')
  ) {
    interceptedRequest.abort()
    return
  }

    if (/\/api\/users\/token_info/.test(interceptedRequest.url())) {
      interceptedRequest.respond({
        body: JSON.stringify(require('./fixtures/api/users/token_info.json'))
      })
      return
    }
    if (/\/api\/annotation_types/.test(interceptedRequest.url())) {
      interceptedRequest.respond({
        body: JSON.stringify(require('./fixtures/api/annotation_types.json'))
      })
    }
    if (/\/api\/teams\/.*\/features/.test(interceptedRequest.url())) {
      interceptedRequest.respond({
        body: JSON.stringify(require('./fixtures/api/teams/1/features.json'))
      })
    }
    if (/\/api\/features/.test(interceptedRequest.url())) {
      interceptedRequest.respond({
        body: JSON.stringify(require('./fixtures/api/teams/1/features.json'))
      })
    }
    if (/\/api\/teams\/.*\/annotation_classes\?include_tags=true/.test(interceptedRequest.url())) {
      interceptedRequest.respond({
        body: JSON.stringify(
          require('./fixtures/api/teams/v7/annotation_classes_include_tags.json')
        )
      })
    }
    if (/\/api\/datasets\/.*/.test(interceptedRequest.url())) {
      interceptedRequest.respond({
        body: JSON.stringify(require('./fixtures/api/datasets/1.json'))
      })
      return
    }
    if (/\/api\/teams\/.*\/memberships/.test(interceptedRequest.url())) {
      interceptedRequest.respond({
        body: JSON.stringify(require('./fixtures/api/teams/v7/memberships.json'))
      })
      return
    }
    if (/\/api\/v2\/teams\/.*\/workflows/.test(interceptedRequest.url())) {
      interceptedRequest.respond({
        body: JSON.stringify(require('./fixtures/api/v2/teams/v7/workflows.json'))
      })
    }
    if (/\/ai\/running_sessions\?/.test(interceptedRequest.url())) {
      interceptedRequest.respond({
        body: JSON.stringify(require('./fixtures/ai/running_sessions.json'))
      })
    }
    if (/\/api\/v2\/teams\/.*\/items\/folders/.test(interceptedRequest.url())) {
      interceptedRequest.respond({
        body: JSON.stringify(require('./fixtures/api/v2/teams/v7/items/folders.json'))
      })
    }
    if (/\/api\/v2\/teams\/.*\/items\?.*/.test(interceptedRequest.url())) {
      interceptedRequest.respond({
        body: JSON.stringify(require('./fixtures/api/v2/teams/v7/items.json'))
      })
    }
    // eslint-disable-next-line
    if (/\/api\/v2\/teams\/v7\/items\/ids\?sort%5Bpriority%5D=desc&not_statuses=archived%2Cerror%2Cprocessing%2Cuploading&dataset_ids=1/.test(interceptedRequest.url())) {
      interceptedRequest.respond({
        body: JSON.stringify(require('./fixtures/api/v2/teams/v7/items/ids.json'))
      })
    }
    if (/\/api\/v2\/teams\/.*\/items\/.*\/slots\/.*\/sections/.test(interceptedRequest.url())) {
      interceptedRequest.respond({
        body: JSON.stringify(
          require('./fixtures/api/v2/teams/v7/items/mock_item/slots/1/sections.json')
        )
      })
    }
    if (/\/api\/v2\/teams\/.*\/items\/.*\/comment_threads/.test(interceptedRequest.url())) {
      interceptedRequest.respond({
        body: JSON.stringify(
          require('./fixtures/api/v2/teams/v7/items/mock_item/comment_threads.json')
        )
      })
    }
    if (/\/api\/customers\/.*/.test(interceptedRequest.url())) {
      interceptedRequest.respond({
        body: JSON.stringify(require('./fixtures/api/customers/1.json'))
      })
    }
    if (/\/api\/teams\/.*\/attributes/.test(interceptedRequest.url())) {
      interceptedRequest.respond({
        body: JSON.stringify(require('./fixtures/api/teams/v7/attributes.json'))
      })
    }
    if (/\/api\/v2\/teams\/.*\/items\/status_counts.*/.test(interceptedRequest.url())) {
      interceptedRequest.respond({
        body: JSON.stringify(require('./fixtures/api/v2/teams/v7/items/status_counts.json'))
      })
    }
    if (/\/api\/v2\/teams\/.*\/items\/class_counts.*/.test(interceptedRequest.url())) {
      interceptedRequest.respond({
        body: JSON.stringify(require('./fixtures/api/v2/teams/v7/items/class_counts.json'))
      })
    }
    if (/\/api\/v2\/teams\/.*\/items\/.*\/time_summary/.test(interceptedRequest.url())) {
      interceptedRequest.respond({
        body: JSON.stringify(require('./fixtures/api/v2/teams/v7/items/time_summary.json'))
      })
    }
    if (/\/api\/v2\/teams\/.*\/items\/general_counts/.test(interceptedRequest.url())) {
      interceptedRequest.respond({
        body: JSON.stringify(require('./fixtures/api/v2/teams/v7/items/general_counts.json'))
      })
    }
    if (/\/api\/refresh/.test(interceptedRequest.url())) {
      interceptedRequest.respond({
        body: JSON.stringify(require('./fixtures/api/refresh.json'))
      })
    }
    if (/.+\.amazonaws\.com/.test(interceptedRequest.url())) {
      interceptedRequest.respond({
        status: 200,
        contentType: 'image/jpeg',
        body: fs.readFileSync(path.join(__dirname, './fixtures/images/sample.png'))
      })
    }
    if (/\/api\/v2\/teams\/.*\/items\/.*\/annotations/.test(interceptedRequest.url())) {
      interceptedRequest.respond({
        body: JSON.stringify(require('./fixtures/api/v2/teams/v7/items/annotations.json'))
      })
    }

  if (/\/api\/teams\/.*\/wind_auth/.test(interceptedRequest.url())) {
    interceptedRequest.respond({
      body: JSON.stringify(require('./fixtures/api/teams/1/wind_auth.json'))
    })
  }

  if (/\/api\/v2\/teams\/.*\/items\/.*\/commands/.test(interceptedRequest.url())) {
    interceptedRequest.respond({
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ 'success': true })
    })
  }

  if (interceptedRequest.isInterceptResolutionHandled()) {
    return
  }

  interceptedRequest.continue()
}

it('test', async () => {
  const browser = await puppeteer.launch({
    args: [
      '--disable-web-security'
    ],
    headless: 'new'
  })

  const page = await browser.newPage()
  await page.setRequestInterception(true)
  page.on('request', requestInterceptor)

  const devtoolsProtocolClient = await page.target().createCDPSession();
  await devtoolsProtocolClient.send('Overlay.setShowFPSCounter', { show: true });

  // eslint-disable-next-line
  await page.goto(`http://localhost:8080`)

  await page.evaluate(() => {
    localStorage.clear()
    localStorage.setItem('token', 'mock-token-value')
    localStorage.setItem('refresh_token', 'mock-token-value')
  })

  page.on('console', msg => console.log(msg.type(), msg.text(), msg.location()))

  // Drag and drop this JSON file to the DevTools Performance panel!
  // await page.tracing.start({ path: 'profile.json' })

  // eslint-disable-next-line
  await page.goto(
    `http://localhost:8080/workview?item_path_prefix=${MOCK_ITEM_PATH_PREFIX}&dataset=${MOCK_DATASET}&item=${MOCK_ITEM_ID}`,
    { waitUntil: 'domcontentloaded' }
  )

  await page.waitForNetworkIdle()
  await page.waitForTimeout(6000)

  // await page.tracing.stop()

  const metrics = await page.metrics()

  // await page.screenshot({ path: 'screenshot.png' })

  await browser.close()

  console.log(metrics)
}, 60_000)
