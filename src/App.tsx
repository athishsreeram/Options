import React, { useState, useEffect } from 'react';
import './style.css';

const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [question, setQuestion] = useState('My Question');
  const [options, setOptions] = useState([
    { id: '1', label: 'Option 1' },
    { id: '2', label: 'Option 2' },
    { id: '3', label: 'Option 3' },
    { id: '4', label: 'Option 4' },
  ]);

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const fetchCaptcha = async () => {
    try {
      const response = await fetch('/captcha');
      const data = await response.json();
      const { question, options } = data;
      setQuestion(question);
      setOptions(options);
    } catch (error) {
      console.error('Error fetching captcha:', error);
    }
  };

  const handleDivClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedOption(null);
  };

  const handleOptionClick = (option) => {
    console.log(option);
    setSelectedOption(option);
    handleClosePopup();
  };

  return (
    <div className="app">
      <div className="div-container" onClick={handleDivClick}>
        <input type="checkbox" id="checkbox" /> &nbsp;{' '}
        <label htmlFor="checkbox">I am not a bot</label>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <div className="question">{question}</div>
            <div className="options">
              <div className="grid-container">
                {options.map((option, index) => (
                  <img
                    key={index}
                    src={option.image}
                    alt={option.label}
                    className={`grid-item ${
                      selectedOption === option.label ? 'selected' : ''
                    }`}
                    onClick={() => handleOptionClick(option.label)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
