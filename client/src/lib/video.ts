// A project's video is either a file uploaded with the project (an address
// starting with /projects/) or a link to YouTube or Vimeo, which is shown in
// that site's own player.

/** Address for an <iframe> player, or null when the video is not such a link. */
export function embedUrl(src: string): string | null {
  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^(www|m)\./, '');
  const parts = url.pathname.split('/').filter(Boolean);

  let youtube: string | undefined;
  if (host === 'youtu.be') youtube = parts[0];
  else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    if (parts[0] === 'watch') youtube = url.searchParams.get('v') ?? undefined;
    else if (['embed', 'shorts', 'live'].includes(parts[0])) youtube = parts[1];
  }
  if (youtube && /^[\w-]{6,}$/.test(youtube)) {
    return `https://www.youtube-nocookie.com/embed/${youtube}`;
  }

  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const id = parts.find((part) => /^\d+$/.test(part));
    if (id) return `https://player.vimeo.com/video/${id}`;
  }
  return null;
}
