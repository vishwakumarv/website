type RawWriteupModule = Record<string, string>;

export type WriteupMetadata = {
  title: string;
  date: string;
  category: string;
  tags: string[];
  cover?: string;
  excerpt: string;
};

export type WriteupCategorySlug = "ctf" | "hackthebox" | "tryhackme" | string;

export type Writeup = WriteupMetadata & {
  slug: string;
  body: string;
  readingMinutes: number;
};

function getCategoryFromPath(path: string): WriteupCategorySlug {
  const match = path.match(/writeups\/([^\/]+)\//i);
  if (!match) return "general";

  const folder = match[1].toLowerCase();
  if (folder === "ctf") return "ctf";
  if (folder === "hackthebox" || folder === "htb") return "hackthebox";
  if (folder === "tryhackme" || folder === "thm") return "tryhackme";

  return folder;
}

function parseYamlValue(value: string) {
  const raw = value.trim();

  if (raw === "" || raw === "null") return undefined;
  if (raw === "true") return true;
  if (raw === "false") return false;

  if (raw.startsWith("[") && raw.endsWith("]")) {
    return raw
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ""))
      .filter(Boolean);
  }

  return raw.replace(/^['"]|['"]$/g, "");
}

function parseFrontmatter(content: string) {
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!frontmatterMatch) {
    return { attributes: {}, body: content.trim() };
  }

  const rawFrontmatter = frontmatterMatch[1];
  const body = content.slice(frontmatterMatch[0].length).trim();
  const attributes: Record<string, unknown> = {};
  let currentKey = "";

  for (const line of rawFrontmatter.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const arrayItemMatch = trimmed.match(/^[-]\s+(.*)$/);
    if (arrayItemMatch && currentKey) {
      const value = parseYamlValue(arrayItemMatch[1]);
      const existing = attributes[currentKey];
      if (Array.isArray(existing)) {
        existing.push(value);
      } else {
        attributes[currentKey] = [value];
      }
      continue;
    }

    const keyValueMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!keyValueMatch) continue;

    const [, key, rawValue] = keyValueMatch;
    if (rawValue === "") {
      currentKey = key;
      attributes[key] = [];
      continue;
    }

    currentKey = "";
    attributes[key] = parseYamlValue(rawValue);
  }

  return {
    attributes,
    body,
  };
}

function generateExcerpt(body: string) {
  const firstParagraph = body
    .split(/\n\s*\n/)
    .find((paragraph) => paragraph.trim().length > 0)
    ?.replace(/\n+/g, " ")
    .trim();

  if (!firstParagraph) return "No excerpt available.";

  if (firstParagraph.length <= 180) {
    return firstParagraph;
  }

  return `${firstParagraph.slice(0, 177).trim()}...`;
}

function normalizeTags(tags: unknown): string[] {
  if (Array.isArray(tags)) {
    return tags.filter(Boolean).map((tag) => String(tag).trim());
  }

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeCategory(category: unknown): WriteupCategorySlug {
  if (!category) return "general";

  const raw = String(category).trim();
  const normalized = raw.toLowerCase().replace(/\s+/g, "");

  if (normalized === "ctf") return "ctf";
  if (normalized === "hackthebox" || normalized === "htb" || normalized === "hacktheboxwriteup" || normalized === "hack the box") return "htb";
  if (normalized === "tryhackme" || normalized === "thm" || normalized === "try hack me") return "thm";

  return raw.toLowerCase().replace(/\s+/g, "-");
}

function parseWriteupModule(path: string, content: string): Writeup {
  const slug = path.split("/").pop()?.replace(/\.md$/, "") ?? "";
  const { attributes, body } = parseFrontmatter(content);

  const title = attributes.title ? String(attributes.title) : slug.replace(/-|_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  const dateString = attributes.date ? String(attributes.date) : new Date().toISOString();
  const date = new Date(dateString);
  const formattedDate = Number(date) ? date.toISOString() : new Date().toISOString();

  const folderCategory = getCategoryFromPath(path);
  const category =
    folderCategory !== "general"
      ? folderCategory
      : normalizeCategory(attributes.category ?? attributes.categories);
  const tags = normalizeTags(attributes.tags);
  const cover = attributes.cover ? String(attributes.cover) : undefined;
  const excerpt = attributes.excerpt ? String(attributes.excerpt) : generateExcerpt(body);
  const wordCount = body.split(/\s+/).filter(Boolean).length;
  const readingMinutes = Math.max(1, Math.round(wordCount / 200));

  return {
    slug,
    title,
    date: formattedDate,
    category,
    tags,
    cover,
    excerpt,
    body,
    readingMinutes,
  };
}

const rawWriteups = import.meta.glob("../writeups/**/*.md", {
  eager: true,
  as: "raw",
}) as RawWriteupModule;

export const writeups: Writeup[] = Object.entries(rawWriteups)
  .map(([path, content]) => parseWriteupModule(path, content))
  .sort((a, b) => b.date.localeCompare(a.date));

export const writeupCategories = [
  "All",
  ...Array.from(new Set(writeups.map((post) => post.category))).sort((a, b) => a.localeCompare(b)),
];

export const writeupBySlug = Object.fromEntries(
  writeups.map((post) => [post.slug.toLowerCase(), post])
);

export const writeupByCategoryAndSlug = Object.fromEntries(
  writeups.map((post) => [`${post.category}/${post.slug.toLowerCase()}`, post])
);

/** Remove the leading markdown H1 when the article header already shows the title. */
export function stripLeadingMarkdownTitle(body: string): string {
  return body.replace(/^#\s+.+\r?\n+/, "");
}
