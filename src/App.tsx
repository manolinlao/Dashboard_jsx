import React from 'react';
import ResizableGrid, { GridItem } from './components/ResizableGrid';
import './App.css';

// Componentes de ejemplo
const ChartComponent: React.FC = () => (
  <div className='example-component chart'>
    <h3>Gráfica</h3>
    <div className='chart-placeholder'>
      <div className='bar' style={{ height: '60%' }}></div>
      <div className='bar' style={{ height: '80%' }}></div>
      <div className='bar' style={{ height: '40%' }}></div>
      <div className='bar' style={{ height: '90%' }}></div>
    </div>
  </div>
);

const TableComponent: React.FC = () => (
  <div className='example-component table'>
    <h3>Tabla de Datos</h3>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3, 4, 5].map((i) => (
          <tr key={i}>
            <td>{i}</td>
            <td>Item {i}</td>
            <td>${i * 100}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

interface CardComponentProps {
  title: string;
  content: string;
}

const CardComponent: React.FC<CardComponentProps> = ({ title, content }) => (
  <div className='example-component card'>
    <h3>{title}</h3>
    <p>{content}</p>
  </div>
);

const ImageComponent: React.FC = () => (
  <div className='example-component image'>
    <h3>Imagen</h3>
    <div className='image-placeholder'>
      <span>🖼️</span>
    </div>
  </div>
);

const ListComponent: React.FC = () => (
  <div className='example-component list'>
    <h3>Lista de Tareas</h3>
    <ul>
      <li>✅ Tarea completada 1</li>
      <li>✅ Tarea completada 2</li>
      <li>⏳ Tarea pendiente 3</li>
      <li>⏳ Tarea pendiente 4</li>
      <li>⏳ Tarea pendiente 5</li>
    </ul>
  </div>
);

interface StatComponentProps {
  label: string;
  value: string;
  color: string;
}

const StatComponent: React.FC<StatComponentProps> = ({ label, value, color }) => (
  <div className='example-component stat' style={{ borderLeftColor: color }}>
    <div className='stat-label'>{label}</div>
    <div className='stat-value' style={{ color }}>
      {value}
    </div>
  </div>
);

const App: React.FC = () => {
  // Define los items del grid con sus componentes
  const gridItems: GridItem[] = [
    {
      id: 1,
      component: <ChartComponent />,
      colSpan: 1,
      rowSpan: 1
    },
    {
      id: 2,
      component: <TableComponent />,
      colSpan: 1,
      rowSpan: 1
    },
    {
      id: 3,
      component: (
        <CardComponent
          title='Dashboard'
          content='Este es un componente de tarjeta que puede contener cualquier información.'
        />
      ),
      colSpan: 1,
      rowSpan: 1
    },
    {
      id: 4,
      component: <ImageComponent />,
      colSpan: 1,
      rowSpan: 1
    },
    {
      id: 5,
      component: <ListComponent />,
      colSpan: 1,
      rowSpan: 1
    },
    {
      id: 6,
      component: <StatComponent label='Usuarios Activos' value='1,234' color='#4caf50' />,
      colSpan: 1,
      rowSpan: 1
    },
    {
      id: 7,
      component: <StatComponent label='Ingresos' value='$45,678' color='#2196f3' />,
      colSpan: 1,
      rowSpan: 1
    },
    {
      id: 8,
      component: (
        <CardComponent
          title='Notificación'
          content='Tienes 5 nuevas notificaciones pendientes de revisar.'
        />
      ),
      colSpan: 1,
      rowSpan: 1
    }
  ];

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>Grid Redimensionable</h1>
        <p>Haz clic en las flechas para expandir/contraer los componentes</p>
      </header>

      <main className='app-main'>
        <ResizableGrid items={gridItems} rowHeight={250} />
      </main>

      <footer className='app-footer'>
        <p>
          <strong>Controles:</strong> → / ↔ (expandir/contraer ancho) | ↓ / ↕ (expandir/contraer
          altura)
        </p>
      </footer>
    </div>
  );
};

export default App;
