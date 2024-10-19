import React, { useState, useEffect } from 'react';
import './App.css';
import Quiz from './components/Quiz'; // Убедитесь, что Quiz импортирован правильно

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('http://212.67.11.96:8080/api/data')
      .then(response => response.json())
      .then(data => {
        setData(data); // Сохраняем данные в состоянии
      })
      .catch(error => {
        console.error("Ошибка:", error);
      });
  }, []);

  return (
    <div className="App">
      <header>
        <h1>В:.С:.В:.С:.В:.</h1>
        <h1>Тест на знание ОГР</h1>
        <img src="https://avatars.dzeninfra.ru/get-zen_doc/1549204/pub_63a75afde2427d502bac74d0_63a7885ce2427d502bc015f8/scale_1200" alt="Classic Image" />
      </header>
      <main>
        {/* Подключаем компонент с тестами */}
        <Quiz />
        {/* Отображаем данные из бэкенда */}
        <div>
          {data ? (
            <p>Сообщение с бэкенда: {data.message}</p>
          ) : (
            <p>Загрузка данных...</p>
          )}
        </div>
      </main>
      <footer>© 2024 StaLar78</footer>
    </div>
  );
}

export default App;
