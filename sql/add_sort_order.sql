-- ============================================================
-- MIGRATION: Add sort_order column to pages, sections, items
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1️⃣ ADD sort_order COLUMNS
-- Pages: global ordering (scoped to nothing, just top-level)
ALTER TABLE pages ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;

-- Sections: ordering scoped to parent page (page_id)
ALTER TABLE sections ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;

-- Items: ordering scoped to parent section (section column)
ALTER TABLE items ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;


-- 2️⃣ BACKFILL existing rows with sequential positions
-- Pages
WITH numbered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at, id) AS rn
  FROM pages
)
UPDATE pages SET sort_order = numbered.rn
FROM numbered WHERE pages.id = numbered.id;

-- Sections (reset per page)
WITH numbered AS (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY page_id ORDER BY created_at, id) AS rn
  FROM sections
)
UPDATE sections SET sort_order = numbered.rn
FROM numbered WHERE sections.id = numbered.id;

-- Items (reset per section)
WITH numbered AS (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY section ORDER BY created_at, id) AS rn
  FROM items
)
UPDATE items SET sort_order = numbered.rn
FROM numbered WHERE items.id = numbered.id;


-- 3️⃣ COMPOSITE INDEXES for fast sorted queries
CREATE INDEX IF NOT EXISTS idx_pages_sort ON pages (sort_order);
CREATE INDEX IF NOT EXISTS idx_sections_page_sort ON sections (page_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_items_section_sort ON items (section, sort_order);
