export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getAgentOrigin() {
  const configuredUrl = process.env.PORTFOLIO_AGENT_URL;
  if (!configuredUrl) throw new Error('PORTFOLIO_AGENT_URL is not configured.');

  const url = new URL(configuredUrl);
  if (url.protocol !== 'https:') throw new Error('PORTFOLIO_AGENT_URL must use HTTPS.');
  return url.origin;
}

function getUpstreamUrl(request: Request, path: string[]) {
  const incoming = new URL(request.url);
  const upstream = new URL(`${getAgentOrigin()}/api/v1/${path.join('/')}`);
  upstream.search = incoming.search;
  return upstream;
}

function copyResponseHeaders(upstream: Response) {
  const headers = new Headers();
  for (const name of ['content-type', 'cache-control', 'retry-after', 'x-ratelimit-limit', 'x-ratelimit-remaining', 'x-ratelimit-reset', 'x-request-id']) {
    const value = upstream.headers.get(name);
    if (value) headers.set(name, value);
  }

  const setCookies = upstream.headers.getSetCookie?.() ?? [];
  for (const cookie of setCookies) {
    const localCookie = process.env.NODE_ENV !== 'production';
    headers.append('set-cookie', cookie.replace(/;\s*Domain=[^;]+/gi, '').replace(localCookie ? /;\s*Secure/gi : /$^/, ''));
  }

  return headers;
}

async function proxy(request: Request, path: string[]) {
  const response = await fetch(getUpstreamUrl(request, path), {
    method: request.method,
    headers: {
      Accept: request.headers.get('accept') ?? '*/*',
      ...(request.headers.get('content-type') ? { 'Content-Type': request.headers.get('content-type') as string } : {}),
      ...(request.headers.get('cookie') ? { Cookie: request.headers.get('cookie') as string } : {}),
    },
    body: request.method === 'GET' ? undefined : await request.arrayBuffer(),
    cache: 'no-store',
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: copyResponseHeaders(response),
  });
}

export async function GET(request: Request, context: { params: Promise<{ path: string[] }> }) {
  return proxy(request, (await context.params).path);
}

export async function POST(request: Request, context: { params: Promise<{ path: string[] }> }) {
  return proxy(request, (await context.params).path);
}
