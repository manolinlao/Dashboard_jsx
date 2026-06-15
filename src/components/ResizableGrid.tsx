import React, { useState } from 'react';
import './ResizableGrid.css';

export interface GridItem {
  id: string | number;
  component: React.ReactNode;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
}

export interface ResizableGridProps {
  items?: GridItem[];
  rowHeight?: number;
}

interface GridItemState extends GridItem {
  colSpan: 1 | 2;
  rowSpan: 1 | 2;
}

/**
 * ResizableGrid Component
 *
 * Grid component that displays items in a 2-column layout with resizable cells.
 * Shows exactly 2 rows at a time with vertical scroll for additional content.
 */
const ResizableGrid: React.FC<ResizableGridProps> = ({
  items = [],
  rowHeight = 250
}) => {
  const [gridItems, setGridItems] = useState<GridItemState[]>(
    items.map(item => ({
      ...item,
      colSpan: item.colSpan || 1,
      rowSpan: item.rowSpan || 1
    }))
  );

  const toggleColSpan = (id: string | number) => {
    setGridItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, colSpan: (item.colSpan === 2 ? 1 : 2) as 1 | 2 }
          : item
      )
    );
  };

  const toggleRowSpan = (id: string | number) => {
    setGridItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, rowSpan: (item.rowSpan === 2 ? 1 : 2) as 1 | 2 }
          : item
      )
    );
  };

  // Calcular altura para mostrar exactamente 2 filas
  // 2 filas * rowHeight + 1 gap (15px) + padding del wrapper (20px)
  const wrapperHeight = (2 * rowHeight) + 15 + 20;

  return (
    <div className="resizable-grid-wrapper" style={{ height: `${wrapperHeight}px` }}>
      <div
        className="resizable-grid"
        style={{ gridAutoRows: `${rowHeight}px` }}
      >
        {gridItems.map((item) => (
          <div
            key={item.id}
            className="grid-item"
            style={{
              gridColumn: `span ${item.colSpan}`,
              gridRow: `span ${item.rowSpan}`
            }}
          >
            <div className="grid-item-controls">
              <button
                className="control-btn"
                onClick={() => toggleColSpan(item.id)}
                title={item.colSpan === 2 ? "Reducir ancho" : "Expandir ancho"}
              >
                {item.colSpan === 2 ? '↔' : '→'}
              </button>
              <button
                className="control-btn"
                onClick={() => toggleRowSpan(item.id)}
                title={item.rowSpan === 2 ? "Reducir altura" : "Expandir altura"}
              >
                {item.rowSpan === 2 ? '↕' : '↓'}
              </button>
            </div>
            <div className="grid-item-content">
              {item.component}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResizableGrid;
