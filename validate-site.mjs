import { readFile } from 'node:fs/promises';

const html = await readFile('index.html', 'utf8');
const script = await readFile('script.js', 'utf8');
const enhancements = await readFile('enhancements.css', 'utf8');
const workflow = await readFile('.github/workflows/deploy-pages.yml', 'utf8');
const failures = [];

const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
const internalTargets = hrefs.filter((href) => href.startsWith('#')).map((href) => href.slice(1));

check(html.includes('<meta name="viewport"'), 'viewport metadata is missing');
check(html.includes('<title>DEMO — Make your next move matter</title>'), 'DEMO marketing page title is missing');
check(html.includes('independent marketing studio'), 'marketing studio description is missing');
check(html.includes('Brand strategy'), 'brand strategy service is missing');
check(html.includes('Creative campaigns'), 'creative campaigns service is missing');
check(html.includes('Digital growth'), 'digital growth service is missing');
check(html.includes('Selected work'), 'selected work section is missing');
check(html.includes('aria-controls="main-navigation"'), 'mobile menu is not associated with navigation');
check(html.includes('id="contact-form"'), 'contact form is missing');
check(html.includes('aria-label="Contact DEMO Marketing Studio"'), 'contact form label is missing');
check(html.includes('mailto:hello@demo.studio'), 'marketing studio contact email is missing');
check(html.includes('autocomplete="email"'), 'email autocomplete is missing');
check(html.includes('role="status"'), 'form status region is missing');
check(internalTargets.every((target) => ids.has(target)), 'an internal link points to a missing section');
check(script.includes("nav.classList.toggle('is-open'"), 'mobile menu toggle behavior is missing');
check(script.includes("event.key === 'Escape'"), 'mobile menu Escape handling is missing');
check(enhancements.includes('prefers-reduced-motion'), 'reduced-motion support is missing');
check(workflow.includes('actions/deploy-pages@v4'), 'GitHub Pages deployment action is missing');
check(workflow.includes('branches: [main]'), 'GitHub Pages workflow is not configured for main');

if (failures.length) {
  console.error(failures.map((failure) => `FAIL: ${failure}`).join('\n'));
  process.exit(1);
}

console.log(`PASS: validated DEMO marketing content, ${internalTargets.length} internal links, mobile navigation, contact form, and Pages workflow`);
