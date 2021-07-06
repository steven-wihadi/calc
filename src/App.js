import logo from './logo.svg';
import './App.scss';
import { useState } from 'react';

const data = {
  input1: { value: 0, checked: false },
  input2: { value: 0, checked: false },
  input3: { value: 0, checked: false },
};
let operator = '';

function App() {
  const [errorMessage, setErrorMessage] = useState('');
  const [result, setResult] = useState();

  const onChangeInput = (inputIn, key, e) => {
    const value = (key === 'value') ? +e.target.value : e.target.checked;
    data[inputIn][key] = value;
    doCalculate();
  }

  const onClickOperator = (operatorChoose) => {
    operator = operatorChoose;
    doCalculate();
  }

  const doCalculate = () => {
    let flag = 0;
    const tempValue = [];

    for (const key in data) {
      if (data[key].checked) { flag ++; tempValue.push(data[key].value); }
    }

    if (operator === '' && tempValue.length === 0) {
      setErrorMessage('');
      setResult(0);
    } else if (operator === '' && tempValue.length !== 0) {
      setErrorMessage('Please choose the operator.');
      setResult(0);
    } else {
      if (flag <= 1) {
        setErrorMessage('Please checked more than one value.');
        setResult(0);
      } else {
        setErrorMessage('');
        let formula = '';
        tempValue.forEach((value, index) => {
          formula += value;
          if (index !== tempValue.length - 1) { formula += operator }
        });

        setResult(eval(formula));
      }
    }
  }

  return (
    <div className="App">
      <div className="calculator-container">
        <div className="user-input-wrapper">
          <input type='number' min='0' onChange={ (e) => onChangeInput('input1', 'value', e) }/>
          <input type='checkbox' onChange={ (e) => onChangeInput('input1', 'checked', e) }/>
        </div>

        <div className="user-input-wrapper">
          <input type='number' min='0' onChange={ (e) => onChangeInput('input2', 'value', e) }/>
          <input type='checkbox' onChange={ (e) => onChangeInput('input2', 'checked', e) }/>
        </div>

        <div className="user-input-wrapper">
          <input type='number' min='0' onChange={ (e) => onChangeInput('input3', 'value', e) }/>
          <input type='checkbox' onChange={ (e) => onChangeInput('input3', 'checked', e) }/>
        </div>

        <div className="operator-wrapper">
          <div className='operator-box' onClick={ () => onClickOperator('+') }><span>+</span></div>
          <div className='operator-box' onClick={ () => onClickOperator('-') }><span>-</span></div>
          <div className='operator-box' onClick={ () => onClickOperator('*') }><span>x</span></div>
          <div className='operator-box' onClick={ () => onClickOperator('/') }><span>/</span></div>
        </div>

        <span className="error-message">{ errorMessage }</span>

        <div className="result-wrapper">
          Hasil: { result }
        </div>
      </div>
    </div>
  );
}

export default App;
