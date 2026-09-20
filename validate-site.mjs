import { readFile } from 'node:fs/promises';

const [html, script, styles, theme, workflow] = await Promise.all([
  readFile('index.html', 'utf8'),
  readFile('script.js', 'utf8'),
  readFile('styles.css', 'utf8'),
  readFile('theme.css', 'utf8'),
  readFile('.github/workflows/deploy-pages.yml', 'utf8'),
]);
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
const internalTargets = hrefs.filter((href) => href.startsWith('#')).map((href) => href.slice(1));

check(html.includes('<meta name="viewport"'), 'viewport metadata is missing');
check(html.includes('DEMO — Technology that moves business forward'), 'technology-company title is missing');
check(html.includes('Independent technology company'), 'technology-company introduction is missing');
check(html.includes('Digital products'), 'digital product capability is missing');
check(html.includes('Software engineering'), 'software engineering capability is missing');
check(html.includes('Cloud &amp; data'), 'cloud and data capability is missing');
check(html.includes('Applied AI'), 'applied AI capability is missing');
check(html.includes('Illustrative work'), 'case-study section is missing');
check(html.includes('illustrative concepts'), 'case studies are not identified as illustrative');
check(html.includes('aria-controls="main-navigation"'), 'mobile menu is not associated with navigation');
check(html.includes('id="contact-form"'), 'contact form is missing');
check(html.includes('aria-label="Contact DEMO technology company"'), 'contact form label is missing');
check(html.includes('mailto:hello@demo.tech'), 'contact email is missing');
check(html.includes('autocomplete="email"'), 'email autocomplete is missing');
check(html.includes('role="status"'), 'form status region is missing');
check(internalTargets.every((target) => ids.has(target)), 'an internal link points to a missing section');
check(script.includes("nav.classList.toggle('is-open'"), 'mobile menu toggle behavior is missing');
check(script.includes("event.key === 'Escape'"), 'mobile menu Escape handling is missing');
check(styles.includes('@media(max-width:760px)'), 'mobile layout styles are missing');
check(styles.includes('prefers-reduced-motion:reduce'), 'reduced-motion support is missing');
check(theme.includes('--accent:#a4f46e'), 'technology-company accent palette is missing');
check(workflow.includes('actions/deploy-pages@v4'), 'GitHub Pages deployment action is missing');
check(workflow.includes('branches: [main]'), 'GitHub Pages workflow is not configured for main');

if (failures.length) {
  console.error(failures.map((failure) => `FAIL: ${failure}`).join('\n'));
  process.exit(1);
}

console.log(`PASS: validated DEMO technology content, ${internalTargets.length} internal links, mobile layout and navigation, contact form, and Pages workflow`);
