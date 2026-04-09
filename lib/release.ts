type Downloads = {
  windows: string;
  mac: string;
  macIntel: string;
  linux: string;
  releases: string;
};

const FALLBACK_DOWNLOADS: Downloads = {
  windows:
    "https://github.com/nullxnothing/daemon/releases/latest/download/DAEMON-setup.exe",
  mac: "https://github.com/nullxnothing/daemon/releases/latest/download/DAEMON-arm64.dmg",
  macIntel:
    "https://github.com/nullxnothing/daemon/releases/latest/download/DAEMON-x64.dmg",
  linux:
    "https://github.com/nullxnothing/daemon/releases/latest/download/DAEMON.AppImage",
  releases: "https://github.com/nullxnothing/daemon/releases/latest",
};

export type ReleaseInfo = {
  version: string;
  downloads: Downloads;
};

type GitHubRelease = {
  tag_name?: string;
  html_url?: string;
  assets?: Array<{
    name?: string;
    browser_download_url?: string;
  }>;
};

function findAssetUrl(
  assets: GitHubRelease["assets"],
  predicate: (name: string) => boolean,
  fallback: string,
) {
  const asset = assets?.find((item) => {
    const name = item.name?.toLowerCase();
    return !!name && predicate(name);
  });
  return asset?.browser_download_url ?? fallback;
}

function normalizeVersion(tagName?: string) {
  if (!tagName) return "latest";
  return tagName.startsWith("v") ? tagName.slice(1) : tagName;
}

export async function getReleaseInfo(): Promise<ReleaseInfo> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/nullxnothing/daemon/releases/latest",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "daemonide.tech",
        },
        cache: "no-store",
      },
    );

    if (!res.ok) throw new Error(`GitHub release fetch failed: ${res.status}`);

    const release = (await res.json()) as GitHubRelease;
    const assets = release.assets ?? [];
    const releasesUrl = release.html_url ?? FALLBACK_DOWNLOADS.releases;

    return {
      version: normalizeVersion(release.tag_name),
      downloads: {
        windows: findAssetUrl(
          assets,
          (name) => name.endsWith("setup.exe"),
          FALLBACK_DOWNLOADS.windows,
        ),
        mac: findAssetUrl(
          assets,
          (name) => name.endsWith("arm64.dmg"),
          FALLBACK_DOWNLOADS.mac,
        ),
        macIntel: findAssetUrl(
          assets,
          (name) => name.endsWith("x64.dmg"),
          FALLBACK_DOWNLOADS.macIntel,
        ),
        linux: findAssetUrl(
          assets,
          (name) => name.endsWith(".appimage"),
          FALLBACK_DOWNLOADS.linux,
        ),
        releases: releasesUrl,
      },
    };
  } catch {
    return {
      version: "latest",
      downloads: FALLBACK_DOWNLOADS,
    };
  }
}
