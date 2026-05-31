import { useState } from 'react';

// ===== TIER 3-7 — Component Split, useState, Events, CRUD, Todo App =====

// Tier 3: Component Split
function Header() {
    return <header style={{ background: '#4a90d9', color: '#fff', padding: '20px', textAlign: 'center' }}>
        <h1>🎯 React Exercises Tier 3-7</h1>
    </header>;
}

function ProductCard({ name, price }) {
    return (
        <div style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px' }}>
            <h3>{name}</h3>
            <p style={{ color: '#27ae60', fontWeight: 'bold' }}>{price.toLocaleString()}đ</p>
        </div>
    );
}

// Tier 4: useState với số, chuỗi, boolean
function StateDemo() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState("");
    const [isOn, setIsOn] = useState(false);

    return (
        <div style={{ padding: '20px', border: '2px solid #3498db', borderRadius: '8px' }}>
            <h2>Tier 4 — useState Basics</h2>

            <div style={{ marginBottom: '16px' }}>
                <h3>Số: {count}</h3>
                <button onClick={() => setCount(count + 1)}>+</button>
                <button onClick={() => setCount(count - 1)}>-</button>
                <button onClick={() => setCount(0)}>Reset</button>
            </div>

            <div style={{ marginBottom: '16px' }}>
                <h3>Chuỗi: {text}</h3>
                <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Nhập text..." />
            </div>

            <div>
                <h3>Boolean: {isOn ? "🟢 ON" : "🔴 OFF"}</h3>
                <button onClick={() => setIsOn(!isOn)}>Toggle</button>
            </div>
        </div>
    );
}

// Tier 5: Events
function EventsDemo() {
    const [message, setMessage] = useState("");

    return (
        <div style={{ padding: '20px', border: '2px solid #9b59b6', borderRadius: '8px' }}>
            <h2>Tier 5 — Events</h2>
            <button onClick={() => setMessage("Clicked!")}>Click me</button>
            <input onKeyDown={(e) => e.key === 'Enter' && setMessage("Enter pressed!")} placeholder="Press Enter..." />
            <p>{message}</p>
        </div>
    );
}

// Tier 6: Lists & CRUD
function CRUDDemo() {
    const [items, setItems] = useState(['Item 1', 'Item 2']);
    const [input, setInput] = useState('');

    const addItem = () => {
        if (input.trim()) {
            setItems([...items, input]);
            setInput('');
        }
    };

    const deleteItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <div style={{ padding: '20px', border: '2px solid #27ae60', borderRadius: '8px' }}>
            <h2>Tier 6 — Lists & CRUD</h2>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add item..." />
            <button onClick={addItem}>Add</button>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item} <button onClick={() => deleteItem(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// Tier 7: Todo App
function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [filter, setFilter] = useState('all');

    const addTodo = () => {
        if (input.trim()) {
            setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
            setInput('');
        }
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    return (
        <div style={{ padding: '20px', border: '2px solid #e74c3c', borderRadius: '8px' }}>
            <h2>Tier 7 — Todo App</h2>
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTodo()} placeholder="Add todo..." />
            <button onClick={addTodo}>Add</button>

            <div style={{ margin: '16px 0' }}>
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('active')}>Active</button>
                <button onClick={() => setFilter('completed')}>Completed</button>
            </div>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {filteredTodos.map(todo => (
                    <li key={todo.id} style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                        <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', marginLeft: '8px' }}>{todo.text}</span>
                        <button onClick={() => deleteTodo(todo.id)} style={{ float: 'right' }}>Delete</button>
                    </li>
                ))}
            </ul>
            <p>{todos.filter(t => !t.completed).length} items left</p>
        </div>
    );
}

// Main App
function App() {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif' }}>
            <Header />
            <div style={{ padding: '20px' }}>
                <section style={{ marginBottom: '40px' }}>
                    <h2>Tier 3 — Component Split</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                        <ProductCard name="iPhone 15" price={25000000} />
                        <ProductCard name="MacBook Pro" price={45000000} />
                        <ProductCard name="AirPods Pro" price={6000000} />
                    </div>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <StateDemo />
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <EventsDemo />
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <CRUDDemo />
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <TodoApp />
                </section>
            </div>
        </div>
    );
}

export default App;
