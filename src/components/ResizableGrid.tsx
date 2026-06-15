import React, { useState, useEffect, useRef } from 'react';
import './ResizableGrid.css';

export interface GridItem {
  id: string | number;
  component: React.ReactNode;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
}

export interface ResizableGridProps {
  items?: GridItem[];
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
 * The row height is calculated automatically based on the container height.
 * The component will fill 100% of its parent container's height.
 */
const ResizableGrid: React.FC<ResizableGridProps> = ({ items = [] }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [rowHeight, setRowHeight] = useState<number>(250);
  const [gridItems, setGridItems] = useState<GridItemState[]>(
    items.map(item => ({
      ...item,
      colSpan: item.colSpan || 1,
      rowSpan: item.rowSpan || 1
    }))
  );

  useEffect(() => {
    const calculateRowHeight = () => {
      if (!wrapperRef.current) return;

      const containerHeight = wrapperRef.current.clientHeight;
      const padding = 20; // 10px top + 10px bottom
      const gap = 15;

      // Calcular altura de cada fila para que quepan exactamente 2 filas
      const calculatedRowHeight = Math.floor((containerHeight - padding - gap) / 2);

      // Mínimo de 100px por fila
      setRowHeight(Math.max(100, calculatedRowHeight));
    };

    // Calcular al montar
    calculateRowHeight();

    // Recalcular cuando cambia el tamaño del contenedor
    const resizeObserver = new ResizeObserver(() => {
      calculateRowHeight();
    });

    if (wrapperRef.current) {
      resizeObserver.observe(wrapperRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

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

  return (
    <div ref={wrapperRef} className="resizable-grid-wrapper">
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
