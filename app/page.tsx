"use client";
import { useState } from 'react';

interface WidgetProps {
  id: string;
  data: any;
  onRemove: (id: string) => void;
}

const ChartWidget: React.FC<WidgetProps> = ({ id, data, onRemove }) => (
  <div className="bg-white border border-gray-200 p-4 relative">
    <button
      onClick={() => onRemove(id)}
      className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
    >x
    </button>
    <h3 className="text-sm font-medium mb-3 text-gray-800">Chart</h3>
    <div className="text-3xl font-bold text-gray-800">{data}</div>
  </div>
);

const TaskListWidget: React.FC<WidgetProps> = ({ id, data, onRemove }) => (
  <div className="bg-white border border-gray-200 p-4 relative text-gray-800">
    <button
      onClick={() => onRemove(id)}
      className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
    >
      x
    </button>
    <h3 className="text-sm font-medium mb-3 text-gray-800 ">Tasks</h3>
    <ul className="space-y-1">
      {data.map((task: string, idx: number) => (
        <li key={idx} className="text-sm">• {task}</li>
      ))}
    </ul>
  </div>
);

const InfoPanel: React.FC<WidgetProps> = ({ id, data, onRemove }) => (
  <div className="bg-white border border-gray-200 p-4 relative text-gray-800">
    <button
      onClick={() => onRemove(id)}
      className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
    >
      x
    </button>
    <h3 className="text-sm font-medium mb-3 text-gray-800">Info</h3>
    <p className="text-sm">{data}</p>
  </div>
);

const widgetComponents = {
  ChartWidget,
  TaskListWidget,
  InfoPanel,
};

const mockData = {
  ChartWidget: () => Math.floor(Math.random() * 1000),
  TaskListWidget: () => ['New task item', 'Another task to complete'],
  InfoPanel: () => 'This is an informational panel with static content. It provides helpful context and details about your dashboard.',
};

const initialConfig: Widget[] = [
  { id: 'widget-1', type: 'ChartWidget', data: 420 },
  { id: 'widget-2', type: 'TaskListWidget', data: ['Buy eggs', 'Review PR'] },
];

interface Widget {
  id: string;
  type: keyof typeof widgetComponents;
  data: any;
}

const Dashboard: React.FC = () => {
  const [widgets, setWidgets] = useState<Widget[]>(initialConfig);
  const [idCounter, setIdCounter] = useState(3);

  const addWidget = (type: keyof typeof widgetComponents) => {
    const newWidget: Widget = {
      id: `widget-${idCounter}`,
      type,
      data: mockData[type](),
    };
    setWidgets([...widgets, newWidget]);
    setIdCounter(idCounter + 1);
  };

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter(widget => widget.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>
        
        <div className="bg-white border border-gray-200 p-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => addWidget('ChartWidget')}
              className="px-3 py-2 bg-blue-300 text-white text-sm hover:bg-blue-700"
            >
              + Chart
            </button>
            <button
              onClick={() => addWidget('TaskListWidget')}
              className="px-3 py-2 bg-green-300 text-white text-sm hover:bg-green-700"
            >
              + Tasks
            </button>
            <button
              onClick={() => addWidget('InfoPanel')}
              className="px-3 py-2 bg-purple-600 text-white text-sm hover:bg-purple-700"
            >
              + Info
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {widgets.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500 text-sm">
              No widgets added yet
            </div>
          ) : (
            widgets.map((widget) => {
              const WidgetComponent = widgetComponents[widget.type];
              return (
                <WidgetComponent
                  key={widget.id}
                  id={widget.id}
                  data={widget.data}
                  onRemove={removeWidget}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;