import React, { useState } from 'react';
import './ResizableGrid.css';

/**
 * ResizableGrid Component
 *
 * @param {Object} props
 * @param {Array} props.items - Array de objetos con la estructura:
 *   {
 *     id: string|number,
 *     component: React.Component,
 *     colSpan: number (1-2, default: 1) - columnas que ocupa,
 *     rowSpan: number (1-2, default: 1) - filas que ocupa
 *   }
 * @param {number} props.rowHeight - Altura de cada fila (default: 250px)
 */
const ResizableGrid = ({ items = [], rowHeight = 250 }) => {
  const [gridItems, setGridItems] = useState(
    items.map(item => ({
      ...item,
      colSpan: item.colSpan || 1,
      rowSpan: item.rowSpan || 1
    }))
  );

  const toggleColSpan = (id) => {
    setGridItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, colSpan: item.colSpan === 2 ? 1 : 2 }
          : item
      )
    );
  };

  const toggleRowSpan = (id) => {
    setGridItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, rowSpan: item.rowSpan === 2 ? 1 : 2 }
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
