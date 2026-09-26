import { useState } from 'react';
import './style.css';

const EMPTY_FORM = {};

function App() {
  const [books, setBooks] = useState([]);

  const [form, setForm] = useState(EMPTY_FORM);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [listError, setListError] = useState(null);

  const [message, setMessage] = useState(null);

  const [detailBook, setDetailBook] = useState(null);

  return (
    <h1>도서 관리 시스템</h1>
  );
}

export default App;