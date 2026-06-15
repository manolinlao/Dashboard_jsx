# Resizable Grid Component

Componente React + TypeScript que muestra una lista de componentes en un grid redimensionable de máximo 2 columnas.

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

```tsx
import ResizableGrid, { GridItem } from './components/ResizableGrid';

const gridItems: GridItem[] = [
  {
    id: 1,
    component: <TuComponente />,
    colSpan: 1,  // 1 o 2 columnas (opcional, default: 1)
    rowSpan: 1   // 1 o 2 filas (opcional, default: 1)
  },
  // ... más items
];

// El componente ocupa el 100% de la altura de su contenedor padre
<div style={{ height: '600px' }}>
  <ResizableGrid items={gridItems} />
</div>

// O con CSS
<div className="mi-contenedor">  {/* .mi-contenedor { height: 80vh; } */}
  <ResizableGrid items={gridItems} />
</div>
```

### Props

- **items**: Array de componentes a mostrar

El componente **ocupa automáticamente el 100% de la altura de su contenedor padre** y calcula la altura de cada fila para mostrar exactamente 2 filas.

## Controles

### Redimensionar arrastrando:
- **Borde derecho**: Arrastra para expandir/contraer el ancho (1 ↔ 2 columnas)
- **Borde inferior**: Arrastra para expandir/contraer la altura (1 ↔ 2 filas)
- **Esquina inferior derecha**: Arrastra en cualquier dirección

### Botones:
- **→ / ↔**: Click para expandir/contraer el ancho
- **↓ / ↕**: Click para expandir/contraer la altura
