# Projects Management Guide

This directory contains all the project data for the StudiovVistara website. Each project is stored in its own folder with a standardized structure.

## Project Directory Structure

```
public/projects/
├── project-name-1/
│   ├── metadata.md          # Project information and description
│   ├── 0.jpg               # Cover image (required)
│   ├── 1.jpg               # Additional images (optional)
│   ├── 2.jpg               # Additional images (optional)
│   └── ...                 # More images as needed
└── project-name-2/
    ├── metadata.md
    ├── 0.jpg
    └── ...
```

## Creating a New Project

1. **Create a new folder** in `public/projects/` with your project's URL-friendly name (e.g., `modern-house-design`)

2. **Add images**:
   - `0.jpg` - This MUST be the cover image (required)
   - `1.jpg`, `2.jpg`, etc. - Additional images (optional)

3. **Create metadata.md** with the following structure:

```markdown
---
id: project-name
name: Project Display Name
category: Residential         # Options: Residential, Housing, Commercial
practices:
  - architecture             # Options: architecture, interior, landscape
  - landscape
location: City, State
date: YYYY-MM-DD             # Project completion date
description: Brief description for gallery display
coverImage: 0.jpg            # Usually 0.jpg
images:
  - 0.jpg                    # List all image files
  - 1.jpg
  - 2.jpg
status: completed            # Options: completed, in-progress, planned
---

# Your Project Title

Write your detailed project description here using Markdown formatting.

## Sections

You can add any sections you want:

- Project Overview
- Design Philosophy
- Key Features
- Specifications
- Awards & Recognition

Use any Markdown formatting like **bold**, *italic*, lists, etc.
```

## Example Project Structure

See the existing projects like `villa-sunrise` for reference.

## Publishing Changes

After making changes to projects:

1. **For development**: Changes will be visible immediately when running `npm run dev`

2. **For production build**: Run `npm run build` which will automatically:
   - Scan all project folders
   - Generate `public/projects.json` from all `metadata.md` files
   - Build the website with updated project data

## Project Categories

- **Residential**: Single-family homes, apartments
- **Housing**: Multi-unit residential developments
- **Commercial**: Offices, retail, institutional buildings

## Practice Areas

- **architecture**: Building design and construction
- **interior**: Interior design and space planning
- **landscape**: Outdoor and landscape design

## Tips

- Keep project folder names URL-friendly (lowercase, hyphens instead of spaces)
- Always include a `0.jpg` cover image
- Use high-quality images (recommended: 1200px+ width)
- Write engaging descriptions that showcase your work
- Update the `date` field when projects are completed
- Use consistent image naming (0.jpg, 1.jpg, 2.jpg, etc.)