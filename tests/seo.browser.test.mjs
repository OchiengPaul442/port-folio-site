import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import { chromium, request } from 'playwright';

const baseUrl = process.env.TEST_BASE_URL ?? 'http://127.0.0.1:3000';
let browser;
let api;

before(async () => {
  browser = await chromium.launch();
  api = await request.newContext({ timeout: 30_000 });
});

after(async () => {
  await api?.dispose();
  await browser?.close();
});

async function getMeta(page, selector, attribute = 'content') {
  return page.locator(selector).first().getAttribute(attribute);
}

test('homepage serves crawlable identity, canonical and Person JSON-LD without JavaScript', async () => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  const response = await page.goto(baseUrl);
  assert.equal(response.status(), 200);
  const html = await response.text();

  assert.equal(await page.title(), 'Paul Ochieng | Software Engineer in Kampala, Uganda');
  assert.equal(
    await getMeta(page, 'link[rel="canonical"]', 'href'),
    'https://www.ochiengpaul.com',
  );
  assert.match(await getMeta(page, 'meta[name="description"]'), /React, Next\.js, and TypeScript/);
  assert.equal(await getMeta(page, 'meta[property="og:locale"]'), 'en_UG');
  assert.equal(await page.locator('meta[name="keywords"]').count(), 0);
  assert.equal(await page.locator('link[hreflang]').count(), 0);
  assert.equal(await page.locator('main').count(), 1);
  assert.equal(await page.locator('h1').count(), 1);
  assert.equal(await page.locator('html').getAttribute('lang'), 'en-UG');
  assert.match(await page.locator('h1').innerText(), /Paul\s+Ochieng/i);

  const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
  const graph = jsonLd.flatMap((value) => {
    const parsed = JSON.parse(value);
    return parsed['@graph'] ?? [parsed];
  });
  const people = graph.filter((item) => item['@type'] === 'Person');
  assert.equal(people.length, 1);
  assert.equal(people[0].name, 'Paul Ochieng Levi');
  assert.equal(people[0].alternateName, 'Paul Ochieng');
  assert.ok(people[0].knowsAbout.includes('React'));
  assert.ok(people[0].knowsAbout.includes('Next.js'));
  assert.ok(people[0].knowsAbout.includes('TypeScript'));
  assert.ok(people[0].knowsAbout.includes('API Development'));
  assert.ok(people[0].knowsAbout.includes('Applied AI'));
  assert.doesNotMatch(html, /style="[^"]*opacity:0/);
  await context.close();
});

test('case-study HTML and metadata are available before client-side JavaScript', async () => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  const response = await page.goto(`${baseUrl}/work/aeris-aq`);
  assert.equal(response.status(), 200);
  assert.equal(await page.title(), 'AERIS-AQ Case Study | Paul Ochieng');
  assert.equal(
    await getMeta(page, 'link[rel="canonical"]', 'href'),
    'https://www.ochiengpaul.com/work/aeris-aq',
  );
  assert.equal(await page.locator('h1').count(), 1);
  for (const heading of ['What it is', 'The Problem', 'My Role', 'Approach', 'Hardest Decision', 'Status', 'Stack']) {
    assert.equal(await page.getByRole('heading', { name: heading }).count(), 1, `${heading} missing`);
  }
  assert.match(await page.locator('main').innerText(), /FastAPI|LangGraph|React|Next\.js/);
  await context.close();
});

test('the work archive exposes server-rendered, named links to sitemap case studies', async () => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  const response = await page.goto(`${baseUrl}/work`);
  assert.equal(response.status(), 200);

  const links = await page.locator('main a[href^="/work/"]').evaluateAll((anchors) =>
    anchors.map((anchor) => ({
      href: anchor.getAttribute('href'),
      name: anchor.getAttribute('aria-label') || anchor.textContent?.trim(),
    })),
  );
  const linkPaths = new Set(links.map((link) => link.href));
  const sitemapResponse = await api.get(`${baseUrl}/sitemap.xml`);
  const sitemapXml = await sitemapResponse.text();
  const projectPaths = [...sitemapXml.matchAll(/<loc>https:\/\/www\.ochiengpaul\.com(\/work\/[^<]+)<\/loc>/g)]
    .map((match) => match[1]);

  assert.ok(projectPaths.length > 10);
  for (const projectPath of projectPaths) {
    assert.ok(linkPaths.has(projectPath), `${projectPath} has no ordinary internal link`);
  }
  assert.ok(links.every((link) => link.name?.length > 0));
  assert.equal(await page.locator('main img:not([alt])').count(), 0);
  await context.close();
});

test('robots and sitemap responses agree on absolute canonical index URLs', async () => {
  const robots = await api.get(`${baseUrl}/robots.txt`);
  assert.equal(robots.status(), 200);
  assert.match(robots.headers()['content-type'], /text\/plain/);
  assert.match(await robots.text(), /Sitemap:\s+https:\/\/www\.ochiengpaul\.com\/sitemap\.xml/);

  const sitemap = await api.get(`${baseUrl}/sitemap.xml`);
  assert.equal(sitemap.status(), 200);
  assert.match(sitemap.headers()['content-type'], /xml/);
  const xml = await sitemap.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  assert.ok(urls.length > 10);
  assert.equal(new Set(urls).size, urls.length);
  assert.ok(urls.every((url) => new URL(url).origin === 'https://www.ochiengpaul.com'));
  assert.ok(urls.includes('https://www.ochiengpaul.com'));
  assert.ok(urls.includes('https://www.ochiengpaul.com/work/aeris-aq'));
  assert.ok(!urls.some((url) => /\/(privacy|terms)$/.test(url)));
  assert.ok(!urls.some((url) => /\/work\/(saving-food|sentsafrica|tic-tack-toe)$/.test(url)));
  assert.doesNotMatch(xml, /<lastmod>/);

  for (const url of urls) {
    const path = new URL(url).pathname;
    const response = await api.get(`${baseUrl}${path}`);
    assert.equal(response.status(), 200, `${path} did not return HTTP 200`);
    const html = await response.text();
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
    assert.ok(canonical, `${path} has no canonical link`);
    assert.equal(canonical[1], url, `${path} canonical differs from sitemap`);
    assert.doesNotMatch(html, /<meta name="robots" content="[^"]*noindex/i);
  }
});

test('production proxy redirects forwarded apex and HTTP requests with a permanent 308', async () => {
  const apexResponse = await api.get(`${baseUrl}/about?from=proxy-test`, {
    headers: {
      'x-forwarded-host': 'ochiengpaul.com',
      'x-forwarded-proto': 'https',
    },
    maxRedirects: 0,
  });
  assert.equal(apexResponse.status(), 308);
  assert.equal(
    apexResponse.headers().location,
    'https://www.ochiengpaul.com/about?from=proxy-test',
  );

  const httpResponse = await api.get(`${baseUrl}/about?from=proxy-test`, {
    headers: {
      'x-forwarded-host': 'www.ochiengpaul.com',
      'x-forwarded-proto': 'http',
    },
    maxRedirects: 0,
  });
  assert.equal(httpResponse.status(), 308);
  assert.equal(
    httpResponse.headers().location,
    'https://www.ochiengpaul.com/about?from=proxy-test',
  );
});

test('secondary project records remain available but explicitly noindex', async () => {
  for (const slug of ['saving-food', 'sentsafrica', 'tic-tack-toe']) {
    const response = await api.get(`${baseUrl}/work/${slug}`);
    assert.equal(response.status(), 200);
    const html = await response.text();
    assert.match(html, /<meta name="robots" content="noindex, follow"/i);
    assert.match(html, new RegExp(`rel="canonical" href="https://www\\.ochiengpaul\\.com/work/${slug}"`));
  }
});

test('the production page keeps a named main landmark and keyboard skip link', async () => {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.route('**/api/github/contributions**', (route) => route.abort('blockedbyclient'));
  await page.goto(baseUrl);
  assert.equal(await page.getByRole('main').count(), 1);
  assert.equal(await page.getByRole('heading', { level: 1 }).count(), 1);
  await page.keyboard.press('Tab');
  assert.match(await page.evaluate(() => document.activeElement?.textContent?.trim() ?? ''), /Skip to main content/);
  assert.deepEqual(pageErrors, []);
  await page.close();
});

test('unknown case-study slugs return HTTP 404', async () => {
  const response = await api.get(`${baseUrl}/work/not-a-real-project`);
  assert.equal(response.status(), 404);
});

