import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import {
  createSitemapEntries,
  INDEXABLE_PROJECT_SLUGS,
  isIndexableProjectSlug,
} from '../src/lib/sitemap-utils.ts';
import {
  shouldApplyCanonicalRedirect,
  buildCanonicalRedirectUrl,
  getCanonicalSiteOrigin,
  getSiteOrigin,
  shouldRedirectToCanonicalOrigin,
  SITE_HOME_URL,
  SITE_URL,
} from '../src/lib/site.ts';

function readProjectContent() {
  const directory = path.join(process.cwd(), 'content', 'projects');
  return readdirSync(directory)
    .filter((filename) => filename.endsWith('.json'))
    .map((filename) => JSON.parse(readFileSync(path.join(directory, filename), 'utf8')))
    .sort((a, b) => a.order - b.order);
}

test('the configured fallback uses the preferred HTTPS www origin', () => {
  assert.equal(getCanonicalSiteOrigin(undefined).origin, 'https://www.ochiengpaul.com');
  assert.equal(getCanonicalSiteOrigin('invalid host value').origin, 'https://www.ochiengpaul.com');
  assert.equal(getCanonicalSiteOrigin('ftp://www.ochiengpaul.com').origin, 'https://www.ochiengpaul.com');
  assert.equal(getCanonicalSiteOrigin('http://www.ochiengpaul.com').origin, 'https://www.ochiengpaul.com');
  assert.equal(getCanonicalSiteOrigin('http://localhost:3000').origin, 'http://localhost:3000');
  assert.equal(getSiteOrigin('www.ochiengpaul.com')?.origin, 'https://www.ochiengpaul.com');
  assert.equal(getSiteOrigin('https://www.ochiengpaul.com/path')?.origin, 'https://www.ochiengpaul.com');
  assert.equal(getSiteOrigin(undefined), null);

  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    assert.equal(SITE_URL, 'https://www.ochiengpaul.com');
    assert.equal(SITE_HOME_URL, 'https://www.ochiengpaul.com');
  }
});

test('canonical redirects converge on HTTPS www and discard the local server port', () => {
  assert.equal(
    shouldRedirectToCanonicalOrigin('ochiengpaul.com', 'https', 'www.ochiengpaul.com', 'https'),
    true,
  );
  assert.equal(
    shouldRedirectToCanonicalOrigin('www.ochiengpaul.com', 'http', 'www.ochiengpaul.com', 'https'),
    true,
  );
  assert.equal(
    shouldRedirectToCanonicalOrigin('www.ochiengpaul.com', 'https', 'www.ochiengpaul.com', 'https'),
    false,
  );
  assert.equal(shouldApplyCanonicalRedirect('production', undefined, false), true);
  assert.equal(shouldApplyCanonicalRedirect('production', 'preview', false), false);
  assert.equal(shouldApplyCanonicalRedirect('production', 'production', true), false);
  assert.equal(shouldApplyCanonicalRedirect('development', undefined, false), false);
  const fallbackOrigin = getCanonicalSiteOrigin(undefined);
  assert.equal(
    shouldRedirectToCanonicalOrigin(
      'ochiengpaul.com',
      'https',
      fallbackOrigin.host,
      fallbackOrigin.protocol.replace(':', ''),
    ),
    true,
  );

  const redirected = buildCanonicalRedirectUrl(
    new URL('http://127.0.0.1:3000/work?a=1'),
    'https',
    'www.ochiengpaul.com',
    '',
  );
  assert.equal(redirected.toString(), 'https://www.ochiengpaul.com/work?a=1');

  const customPort = buildCanonicalRedirectUrl(
    new URL('http://127.0.0.1:3000/work'),
    'https',
    'www.ochiengpaul.com:8443',
    '8443',
  );
  assert.equal(customPort.toString(), 'https://www.ochiengpaul.com:8443/work');
});

test('the sitemap contains only unique, absolute URLs for the index allow-list', () => {
  const sourceSlugs = readProjectContent().map((project) => project.slug);
  const entries = createSitemapEntries('https://www.ochiengpaul.com/', [
    ...sourceSlugs,
    sourceSlugs[0],
  ]);
  const urls = entries.map(({ url }) => url);

  assert.equal(new Set(urls).size, urls.length);
  assert.deepEqual(urls.slice(0, 6), [
    'https://www.ochiengpaul.com',
    'https://www.ochiengpaul.com/work',
    'https://www.ochiengpaul.com/about',
    'https://www.ochiengpaul.com/now',
    'https://www.ochiengpaul.com/contact',
    'https://www.ochiengpaul.com/engineering',
  ]);
  assert.deepEqual(
    urls.slice(6).map((url) => url.split('/').at(-1)),
    [...INDEXABLE_PROJECT_SLUGS].sort((a, b) =>
      sourceSlugs.indexOf(a) - sourceSlugs.indexOf(b),
    ),
  );
  assert.ok(urls.every((url) => new URL(url).origin === 'https://www.ochiengpaul.com'));
  assert.ok(urls.every((url) => !url.includes('?') && !url.includes('#')));
  assert.ok(!urls.includes('https://www.ochiengpaul.com/privacy'));
  assert.ok(!urls.includes('https://www.ochiengpaul.com/terms'));
  assert.ok(!urls.some((url) => url.includes('/work/saving-food')));
  assert.ok(!urls.some((url) => url.includes('/work/sentsafrica')));
  assert.ok(!urls.some((url) => url.includes('/work/tic-tack-toe')));
});

test('every indexable case study has the content fields rendered by the case-study page', () => {
  const projects = readProjectContent();
  const projectsBySlug = new Map(projects.map((project) => [project.slug, project]));

  assert.equal(
    projectsBySlug.get('airqo-npm-packages').liveUrl,
    'https://www.npmjs.com/package/@airqo-packages/network-coverage',
  );

  for (const slug of INDEXABLE_PROJECT_SLUGS) {
    const project = projectsBySlug.get(slug);
    assert.ok(project, `missing project content for ${slug}`);
    assert.ok(isIndexableProjectSlug(slug));
    assert.ok(project.stack.length > 0, `${slug} has no technology stack`);

    for (const field of [
      'description',
      'problem',
      'role',
      'approach',
      'hardestDecision',
      'outcome',
      'whatIdChange',
    ]) {
      assert.ok(project[field].trim().length >= 80, `${slug} has a thin ${field} section`);
    }
  }

  for (const slug of ['saving-food', 'sentsafrica', 'tic-tack-toe']) {
    assert.equal(isIndexableProjectSlug(slug), false);
  }
});
