import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  const { url } = request;

  const urlParams = new URL(url).searchParams;

  const version = urlParams.get('version');
  const arch = urlParams.get('arch');
  const target = urlParams.get('target');

  console.log('version:', version);
  console.log('arch:', arch);
  console.log('target:', target);

  const latest_release = await getLatestRelease();

  // If there any error fetching the latest release, return 204
  // to prevent the user from downloading the same version again
  if (!latest_release) {
    return new Response(null, {
      status: 204
    });
  }

  const latest_version = getVersionNumberFromString(latest_release.tag_name);
  const current_version = getVersionNumberFromString(version!);

  // If the latest version is equal to the current version,
  // return 204 to prevent the user from downloading the same version again

  if (latest_version <= current_version) {
    return new Response(null, {
      status: 204
    });
  }

  // If the latest version is greater than the current version,
  // return the latest version to the user

  const release_response: ReleaseResponse = {
    version: latest_release.tag_name,
    notes: latest_release.body
      .replace('See the assets to download this version and install.', '')
      .replace(/\r\n/g, '\n'),
    pub_date: latest_release.published_at,
    signature: '',
    url: ''
  };

  for (const asset of latest_release.assets) {
    if (asset.name.endsWith('.sig')) {
      const signature_response = await fetch(asset.browser_download_url);
      const signature = await signature_response.text();

      release_response.signature = signature;
    } else {
      release_response.url = asset.browser_download_url;
    }
  }

  return new Response(JSON.stringify(release_response), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

async function getLatestRelease() {
  const response = await fetch(
    'https://api.github.com/repos/Kazte/path-of-levelling/releases/latest'
  );
  const data = await response.json();
  return data;
}

function getVersionNumberFromString(version: string) {
  return version.replace('v', '').split('.').map(Number).join('');
}

interface ReleaseResponse {
  version: string;
  notes: string;
  pub_date: string;
  signature: string;
  url: string;
}
