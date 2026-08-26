# Portfolio Aziz

Static portfolio (Bootstrap 5) built with [Eleventy](https://www.11ty.dev/).  
Deploy target: **Vercel** (output `_site/`).

## Setup

```bash
npm install
npm run dev      # local preview
npm run build    # write _site/
```

## Add content (local only — you alone)

```bash
npm run add
```

Interactive CLI on your laptop:

1. Choose **project** or **experience**
2. Fill prompts (EN + ID text)
3. Point to a **`.webp`** image (other formats are rejected)
4. Data is written to `src/_data/` + `assets/js/locales/`
5. Run `npm run build`, then `git push` so Vercel updates the live site

Visitors cannot add or edit content. There is no public admin UI.

### Image rule

Only **`.webp`** files are accepted by `npm run add`.

### Manual edit

You can also edit JSON directly:

- Projects → [`src/_data/projects.json`](src/_data/projects.json)
- Experience → [`src/_data/experience.json`](src/_data/experience.json)
- Translations → [`assets/js/locales/en.json`](assets/js/locales/en.json) / [`id.json`](assets/js/locales/id.json)

Do **not** edit `_site/` by hand — it is overwritten on every build.

## Vercel

[`vercel.json`](vercel.json) sets:

- Build: `npm run build`
- Output: `_site`

Connect the GitHub repo; each push rebuilds the site.

## Project structure

```
src/
  index.njk
  _includes/layouts/   base.njk
  _includes/partials/  home, experience, project, …
  _data/
    projects.json
    experience.json
assets/
  css/ js/ img/ audio/
scripts/
  add-content.mjs      # npm run add
```

## Bootstrap

- CSS: local purged `assets/css/bootstrap.purged.css`
- JS: `assets/js/vendor/bootstrap.bundle.min.js`
- Icons / AOS / anime.js: CDN
