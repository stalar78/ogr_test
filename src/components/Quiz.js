import React, { useState, useEffect } from 'react';
import Question from './Question';
import questions from './questions'; // Импортируем вопросы

// Функция для случайного выбора 10 вопросов
const getRandomQuestions = (questions) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10); // Возвращаем 10 вопросов
};

const Quiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Индекс текущего вопроса
    const [selectedAnswer, setSelectedAnswer] = useState(''); // Храним выбранный ответ
    const [selectedAnswers, setSelectedAnswers] = useState([]); // Сохраняем все ответы пользователя
    const [randomQuestions, setRandomQuestions] = useState([]); // Массив случайных вопросов
    const [isFinished, setIsFinished] = useState(false); // Отслеживаем завершение теста
    const [error, setError] = useState(''); // Ошибка, если пользователь не выбрал ответ

    useEffect(() => {
        setRandomQuestions(getRandomQuestions(questions)); // Загружаем случайные вопросы при инициализации
    }, []);

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer); // Устанавливаем выбранный ответ
        setError(''); // Очищаем ошибку при выборе ответа
    };

    const handleNextQuestion = () => {
        // Если не выбрано ни одного ответа, показываем сообщение об ошибке
        if (!selectedAnswer) {
            setError('Пожалуйста, выберите ответ перед тем, как продолжить.');
            return;
        }

        // Сохраняем ответ и переходим к следующему вопросу
        setSelectedAnswers([...selectedAnswers, selectedAnswer]);
        setSelectedAnswer(''); // Очищаем выбранный ответ

        if (currentQuestionIndex === randomQuestions.length - 1) {
            setIsFinished(true); // Если это был последний вопрос, завершаем тест
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1); // Переход к следующему вопросу
        }
    };

    // Функция для перезапуска теста
    const restartQuiz = () => {
        setCurrentQuestionIndex(0); // Сбрасываем индекс текущего вопроса
        setSelectedAnswers([]); // Сбрасываем ответы пользователя
        setIsFinished(false); // Сбрасываем состояние завершенности теста
        setRandomQuestions(getRandomQuestions(questions)); // Генерируем новый набор вопросов
        setError(''); // Сбрасываем ошибки
    };

    const getCorrectAnswersCount = () => {
        return selectedAnswers.filter((answer, index) =>
            answer === randomQuestions[index].correctAnswer
        ).length;
    };

    // Проверка на случай, если массив вопросов пуст или текущий вопрос отсутствует
    if (randomQuestions.length === 0 || !randomQuestions[currentQuestionIndex]) {
        return <div>Загрузка...</div>; // Показать "Загрузка..." если вопросы еще не готовы
    }

    return (
        <div>
            {isFinished ? (
                <div>
                    <h2>Тест завершен!</h2>
                    <p>Вы ответили правильно на {getCorrectAnswersCount()} из 10 вопросов.</p>

                    {/* Показать правильные ответы и источники для всех вопросов */}
                    <ul>
                        {randomQuestions.map((question, index) => {
                            const isCorrect = selectedAnswers[index] === question.correctAnswer;
                            return (
                                <div key={index} className="result-item">
                                    <h3>{question.question}</h3>

                                    {/* Показать варианты ответов как текст */}
                                    <div>
                                        {question.options.map((option, i) => (
                                            <p
                                                key={i}
                                                className={
                                                    option === question.correctAnswer
                                                        ? 'correct' // Если это правильный ответ
                                                        : option === selectedAnswers[index]
                                                            ? 'incorrect' // Если это выбранный пользователем, но неправильный ответ
                                                            : ''
                                                }
                                            >
                                                {option}
                                            </p>
                                        ))}
                                    </div>

                                    <p className="source">Источник: {question.source}</p>
                                </div>
                            );
                        })}
                    </ul>


                    {/* Кнопка для начала теста заново */}
                    <button onClick={restartQuiz}>Начать сначала</button>
                </div>
            ) : (
                <div>
                    <Question
                        data={randomQuestions[currentQuestionIndex]} // Передаем текущий вопрос
                        handleAnswerClick={handleAnswerClick} // Обрабатываем выбор ответа
                    />
                    {error && <p className="error-message">{error}</p>} {/* Показываем ошибку */}
                    <button onClick={handleNextQuestion}>Следующий вопрос</button>
                    <p>Вопрос {currentQuestionIndex + 1} из 10</p>
                </div>
            )}
        </div>
    );
};

export default Quiz;
