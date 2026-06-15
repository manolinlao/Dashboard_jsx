# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React component for displaying a resizable grid of components. The grid supports up to 2 columns and allows items to span multiple columns/rows.

## Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

### Core Component: ResizableGrid

**Location**: `src/components/ResizableGrid.jsx`

Accepts an array of items with this structure:
```javascript
{
  id: string|number,        // Unique identifier
  component: React.Component, // Any React component
  colSpan: 1|2,             // Columns to occupy (default: 1)
  rowSpan: 1|2              // Rows to occupy (default: 1)
}
```

**Props**:
- `items`: Array of grid items
- `maxHeight`: Maximum grid height in pixels (default: 600)

### Grid Behavior

- Base layout: 2 columns, auto rows (min 250px)
- Vertical scroll appears when content exceeds `maxHeight`
- Each item has resize controls (top-right corner)
- Toggle buttons expand/collapse width (1↔2 cols) and height (1↔2 rows)
- Responsive: collapses to 1 column on mobile (<768px)

### Tech Stack

- React 18.3
- Vite 5.4 (dev server & build tool)
- CSS Grid for layout
- No external UI libraries

## File Structure

```
src/
  components/
    ResizableGrid.jsx    # Main grid component
    ResizableGrid.css    # Grid styles
  App.jsx                # Example usage with sample components
  App.css                # Example component styles
  main.jsx               # React entry point
  index.css              # Global styles
```

## Environment Setup

Parent directory contains `settings_claude.cmd` for custom API configuration. Run from parent before starting development if needed.
