import React from 'react';
import './App.css';
import Quiz from './components/Quiz'; // Убедитесь, что Quiz импортирован правильно

function App() {
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
      </main>
      <footer>© 2024 StaLar78</footer>
    </div>
  );
}

export default App;
