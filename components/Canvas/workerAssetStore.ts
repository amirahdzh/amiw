// Adapted from tldraw's official sync-cloudflare template
// (templates/sync-cloudflare/client/multiplayerAssetStore.tsx and
// getBookmarkPreview.tsx in github.com/tldraw/tldraw), which serves the
// client from the same origin as the worker and so uses relative `/api/...`
// URLs. Our Nuxt app and the sync-worker/ deploy are on different origins,
// so every URL here is made absolute against the worker's own base URL.
import {
  AssetRecordType,
  getHashForString,
  type TLAsset,
  type TLAssetStore,
  type TLBookmarkAsset,
} from "tldraw";

export function createWorkerAssetStore(workerBaseUrl: string, roomId: string): TLAssetStore {
  return {
    async upload(_asset, file) {
      const objectName = `${crypto.randomUUID()}-${file.name}`.replace(/[^a-zA-Z0-9.]/g, "-");
      // roomId is only needed at upload time, so the worker can enforce a
      // per-room cap (see TldrawDurableObject.ts) — the stored src stays a
      // clean URL with no query string.
      const cleanUrl = `${workerBaseUrl}/api/uploads/${objectName}`;
      const uploadUrl = `${cleanUrl}?roomId=${encodeURIComponent(roomId)}`;

      const response = await fetch(uploadUrl, { method: "POST", body: file });
      if (!response.ok) {
        throw new Error(`Failed to upload asset: ${response.statusText}`);
      }

      return { src: cleanUrl };
    },
    resolve(asset) {
      return asset.props.src;
    },
  };
}

export async function getWorkerBookmarkPreview(
  workerBaseUrl: string,
  url: string,
): Promise<TLAsset> {
  const asset: TLBookmarkAsset = {
    id: AssetRecordType.createId(getHashForString(url)),
    typeName: "asset",
    type: "bookmark",
    meta: {},
    props: { src: url, description: "", image: "", favicon: "", title: "" },
  };

  try {
    const response = await fetch(`${workerBaseUrl}/api/unfurl?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    asset.props.description = data?.description ?? "";
    asset.props.image = data?.image ?? "";
    asset.props.favicon = data?.favicon ?? "";
    asset.props.title = data?.title ?? "";
  } catch (error) {
    console.error(error);
  }

  return asset;
}
