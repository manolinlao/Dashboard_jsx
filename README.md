# Resizable Grid Component

Componente React que muestra una lista de componentes en un grid redimensionable de máximo 2 columnas.

## Características

- ✅ Grid de 2 columnas máximo
- ✅ Scroll vertical cuando hay muchos componentes
- ✅ Componentes redimensionables (pueden ocupar 1 o 2 columnas/filas)
- ✅ Controles intuitivos para expandir/contraer
- ✅ Responsive (1 columna en móviles)

## Instalación

```bash
npm install
```

## Uso

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:3000`

## Cómo usar el componente

```jsx
import ResizableGrid from './components/ResizableGrid';

const gridItems = [
  {
    id: 1,
    component: <TuComponente />,
    colSpan: 1,  // 1 o 2 columnas (opcional, default: 1)
    rowSpan: 1   // 1 o 2 filas (opcional, default: 1)
  },
  // ... más items
];

<ResizableGrid 
  items={gridItems} 
  maxHeight={700}  // Altura máxima del grid (opcional, default: 600)
/>
```

## Controles

- **→ / ↔**: Expandir/contraer el ancho del componente (1 o 2 columnas)
- **↓ / ↕**: Expandir/contraer la altura del componente (1 o 2 filas)
