import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import type { ProjectText, StoredProject } from '../data/projects';
import { LANGUAGES, type Lang } from '../i18n/translations';
import { imageUrl } from '../lib/api';
import type { NewImage } from '../lib/github';

const MAX_IMAGE_BYTES = 3 * 1024 * 1024;
const EXTENSIONS: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

const emptyText = (): ProjectText => ({
  title: '',
  status: '',
  shortDescription: '',
  fullDescription: '',
});

/** "My Cool Game!" -> "my-cool-game"; used in the project's address. */
const slugify = (title: string) =>
  title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

interface Props {
  /** The project being edited, or null for a new one. */
  initial: StoredProject | null;
  /** Ids already in use, so a new project gets its own. */
  takenIds: string[];
  busy: boolean;
  onSave: (project: StoredProject, newImages: NewImage[], removedImages: string[]) => void;
  onCancel: () => void;
}

export default function ProjectForm({ initial, takenIds, busy, onSave, onCancel }: Props) {
  const [lang, setLang] = useState<Lang>('en');
  const [text, setText] = useState<Record<Lang, ProjectText>>(() => ({
    en: { ...emptyText(), ...initial?.text.en },
    ru: { ...emptyText(), ...initial?.text.ru },
    kk: { ...emptyText(), ...initial?.text.kk },
  }));
  const [technologies, setTechnologies] = useState(initial?.technologies.join(', ') ?? '');
  const [githubLink, setGithubLink] = useState(initial?.githubLink ?? '');
  const [liveDemoLink, setLiveDemoLink] = useState(initial?.liveDemoLink ?? '');
  const [myRole, setMyRole] = useState(initial?.myRole ?? '');
  const [isFeatured, setIsFeatured] = useState(initial?.isFeatured ?? true);
  const [images, setImages] = useState<string[]>(initial?.images ?? []);
  const [newImages, setNewImages] = useState<NewImage[]>([]);
  const [removed, setRemoved] = useState<string[]>([]);
  const [error, setError] = useState('');

  // Images picked in this form are not on the site yet, so their previews
  // come straight from the chosen files.
  const previews = useMemo(
    () => new Map(newImages.map((image) => [image.path, URL.createObjectURL(image.file)])),
    [newImages],
  );
  useEffect(() => () => previews.forEach((url) => URL.revokeObjectURL(url)), [previews]);

  const setField = (field: keyof ProjectText) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setText((prev) => ({ ...prev, [lang]: { ...prev[lang], [field]: event.target.value } }));

  const addFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const files = [...(event.target.files ?? [])];
    event.target.value = '';
    const tooBig = files.find((file) => file.size > MAX_IMAGE_BYTES);
    const wrongType = files.find((file) => !EXTENSIONS[file.type]);
    if (tooBig || wrongType) {
      setError(
        tooBig
          ? `"${tooBig.name}" is larger than 3 MB. Please make it smaller first.`
          : `"${wrongType!.name}" is not a PNG, JPG, WebP or GIF image.`,
      );
      return;
    }
    setError('');
    // A unique name per file, so a new image never replaces an existing one.
    const stamp = Date.now().toString(36);
    const added = files.map((file, i) => ({
      path: `/projects/upload-${stamp}-${i}.${EXTENSIONS[file.type]}`,
      file,
    }));
    setNewImages((prev) => [...prev, ...added]);
    setImages((prev) => [...prev, ...added.map((image) => image.path)]);
  };

  const removeImage = (path: string) => {
    setImages((prev) => prev.filter((p) => p !== path));
    if (previews.has(path)) setNewImages((prev) => prev.filter((image) => image.path !== path));
    else setRemoved((prev) => [...prev, path]);
  };

  const makeCover = (path: string) =>
    setImages((prev) => [path, ...prev.filter((p) => p !== path)]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const en = text.en;
    if (!en.title.trim() || !en.shortDescription.trim()) {
      setLang('en');
      setError('The English title and short description are required.');
      return;
    }

    let id = initial?.id ?? '';
    if (!id) {
      const base = slugify(en.title) || 'project';
      id = base;
      for (let n = 2; takenIds.includes(id); n++) id = `${base}-${n}`;
    }

    // Keep a translation only if something was written in it.
    const translations: Partial<Record<Lang, ProjectText>> = {};
    for (const code of ['ru', 'kk'] as const) {
      if (Object.values(text[code]).some((value) => value.trim())) translations[code] = text[code];
    }

    onSave(
      {
        id,
        technologies: technologies
          .split(',')
          .map((tech) => tech.trim())
          .filter(Boolean),
        images,
        githubLink: githubLink.trim(),
        liveDemoLink: liveDemoLink.trim(),
        ...(myRole.trim() ? { myRole: myRole.trim() } : {}),
        isFeatured,
        text: { en, ...translations },
      },
      newImages,
      removed,
    );
  };

  const current = text[lang];

  return (
    <form className="panel form" onSubmit={submit}>
      <h2>{initial ? `Edit “${initial.text.en.title}”` : 'New project'}</h2>

      <div className="form-langs" role="group" aria-label="Language of the texts below">
        {LANGUAGES.map((l) => (
          <button
            key={l.code}
            type="button"
            className="chip"
            aria-pressed={lang === l.code}
            onClick={() => setLang(l.code)}
          >
            {l.name}
            {l.code === 'en' ? ' (required)' : ''}
          </button>
        ))}
      </div>
      <p className="muted hint">
        Russian and Kazakh are optional: a language left empty shows the English text.
      </p>

      <label className="field">
        <span>Title</span>
        <input value={current.title} onChange={setField('title')} />
      </label>
      <label className="field">
        <span>Status (for example “In development” or “Released”)</span>
        <input value={current.status} onChange={setField('status')} />
      </label>
      <label className="field">
        <span>Short description (shown on the project card)</span>
        <textarea rows={3} value={current.shortDescription} onChange={setField('shortDescription')} />
      </label>
      <label className="field">
        <span>Full description (leave an empty line between paragraphs)</span>
        <textarea rows={8} value={current.fullDescription} onChange={setField('fullDescription')} />
      </label>

      <hr />

      <label className="field">
        <span>Technologies, separated by commas</span>
        <input
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
          placeholder="Unity, C#, Blender"
        />
      </label>
      <label className="field">
        <span>Your role (optional)</span>
        <input value={myRole} onChange={(e) => setMyRole(e.target.value)} />
      </label>
      <label className="field">
        <span>Source code link (optional)</span>
        <input type="url" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} />
      </label>
      <label className="field">
        <span>Live demo or store link (optional)</span>
        <input type="url" value={liveDemoLink} onChange={(e) => setLiveDemoLink(e.target.value)} />
      </label>
      <label className="check">
        <input
          type="checkbox"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
        />
        <span>Show on the home page (featured)</span>
      </label>

      <div className="field">
        <span>Images: the first one is the cover</span>
        {images.length > 0 && (
          <ul className="image-list">
            {images.map((path, i) => (
              <li key={path}>
                <img src={previews.get(path) ?? imageUrl(path)} alt="" />
                <div className="actions">
                  {i > 0 && (
                    <button
                      type="button"
                      className="btn btn-outline btn-small"
                      onClick={() => makeCover(path)}
                    >
                      Make cover
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-danger btn-small"
                    onClick={() => removeImage(path)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" multiple onChange={addFiles} />
      </div>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      <div className="actions">
        <button type="submit" className="btn" disabled={busy}>
          {busy ? 'Publishing…' : 'Publish'}
        </button>
        <button type="button" className="btn btn-outline" onClick={onCancel} disabled={busy}>
          Cancel
        </button>
      </div>
    </form>
  );
}
