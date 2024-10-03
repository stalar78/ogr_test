import React, { useEffect, useState } from 'react';

const Question = ({ data, handleAnswerClick }) => {
    const [selectedOption, setSelectedOption] = useState('');

    // Сбрасываем выбор при каждом новом вопросе
    useEffect(() => {
        setSelectedOption(''); // Сбрасываем выбор при загрузке нового вопроса
    }, [data]);

    const handleOptionChange = (option) => {
        setSelectedOption(option); // Устанавливаем выбранный ответ в состоянии компонента
        handleAnswerClick(option); // Сообщаем родительскому компоненту о выборе ответа
    };

    if (!data) return null; // Защита от рендеринга, если данных нет

    return (
        <div className="question fade-in">
            <h3>{data.question}</h3>
            <ul>
                {data.options.map((option, index) => (
                    <li key={index}>
                        <label>
                            <input
                                type="radio"
                                name="option"
                                value={option}
                                checked={selectedOption === option} // Устанавливаем состояние радиокнопки
                                onChange={() => handleOptionChange(option)} // Обрабатываем клик по варианту
                            />
                            {option}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Question;
