
# CF-EXT

This project contains the web application for \[CF-EXT]. a modern way to view codeforces.

## Running the App Locally

1. **Clone the repository**

```bash
git clone https://github.com/TanvirMahfuz/CF-EXT.git
cd "CF-EXT"
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. **Open the app in your browser**
   Visit: [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal)

---

## Hosted Website

You can access the live version of the app here:
[https://cf-ext.netlify.app/](https://cf-ext.netlify.app/)

---

## Features

1. Modern UI
2. Contest Timeline
3. Profile Search
4. Sorted Problem by Class

---

## Additional Notes

* Make sure you have **Node.js** installed (v18+ recommended).
* For any environment variables, check `.env.example` and create a `.env` file.

---

## SEO Setup

This project includes basic SEO configuration for Google indexing:

1. **Meta tags** - Added in `index.html` (title, description, keywords, Open Graph, Twitter cards)
2. **robots.txt** - Located at `public/robots.txt` - allows all crawlers
3. **sitemap.xml** - Located at `public/sitemap.xml` - tells Google about your pages
4. **Favicon** - Located at `public/favicon.svg`

### Before Going Live

1. **Generate OG Image** - Create a 1200x630px image at `public/og-image.png` for social sharing previews
2. **Submit to Google Search Console**:
   - Visit [Google Search Console](https://search.google.com/search-console)
   - Add your site (cf-ext.netlify.app)
   - Submit the sitemap at `https://cf-ext.netlify.app/sitemap.xml`
   - Request indexing

3. **Update sitemap.xml** - If you add new routes, update the sitemap with those pages.

