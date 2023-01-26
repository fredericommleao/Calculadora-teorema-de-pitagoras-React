import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
    const [hypotenuse, setHypotenuse] = useState('');
    const [cateto1, setCateto1] = useState('');
    const [cateto2, setCateto2] = useState('');
    const [isCalculated, setIsHipotenusa] = useState(false);
    const [isCatetosOposto, setIsCatetosOposto] = useState(false);
    const [isCatetosAdjacente, setIsCatetosAdjacente] = useState(false);
    const [hasError, setHasError] = useState(false);

    const clear = () => {
        setHypotenuse('');
        setCateto1('');
        setCateto2('');
        setIsHipotenusa(false);
        setIsCatetosOposto(false);
        setIsCatetosAdjacente(false);
    }

    function validateInput(e) {
        const inputValue = e.target.value;
        if (!isNumber(inputValue) || inputValue < 0) {
            setHasError(true);
        } else {
            setHasError(false);
        }
    }
    
    function isNumber(value) {
        return !isNaN(value) && isFinite(value);
    }

    const calculate = async () => {
        if (hypotenuse !== '' && cateto1 === '') {
            const hypotenuseValue = parseFloat(hypotenuse);
            const cateto2Value = parseFloat(cateto2);
            const response = await fetch('http://localhost:5000/cateto_adjacente', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ hipotenusa:  hypotenuseValue, cateto_oposto: cateto2Value })
            });
            const data = await response.json();
            setCateto1(data.cateto_adjacente);
            setIsCatetosAdjacente(true);
        
        
        } else if (hypotenuse !== '' && cateto2 === '') {
            const hipotenusaValue = parseFloat(hypotenuse);
            const cateto1Value = parseFloat(cateto1);
            const response = await fetch('http://localhost:5000/cateto_oposto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ hipotenusa: hipotenusaValue, cateto_adjacente: cateto1Value })
            });
            const data = await response.json();
            setCateto2(data.cateto_oposto);
            setIsCatetosOposto(true);

        } else if (cateto1 !== '' && cateto2 !== '') {
            const cateto1Value = parseFloat(cateto1);
            const cateto2Value = parseFloat(cateto2);
            const response = await fetch('http://localhost:5000/hipotenusa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cateto_adjacente: cateto1Value, cateto_oposto: cateto2Value })
            });
            const data = await response.json();
            setHypotenuse(data.hipotenusa);
            setIsHipotenusa(true);
                }
                }
                return (
                   
                    <div className="container">

                        <div className='container2'>

                        <div className='container_bloco'>
                        <div className='title'>
                            <h2>Calculadora do Teorema de Pitágoras</h2>
                        </div>
                        <div className='title'>
                            <img src={require('./calculadora.png')} className="calculadora" alt="calculadora" />
                            </div>
                        </div>
                        <div className='container_bloco'>
                        <div>
                        <img src={require('./pitagoras.png')} className="triangle" alt="triangle" />
                        </div>
                       
                        <div className="inputs">
                            <div className="input-container">
                                <label>Valor do cateto A:</label>
                                <input value={cateto1} onChange={e => setCateto1(e.target.value)} onBlur={validateInput} />
                                {hasError && <div className="error-message">Não é permitido letras ou valores negativos!</div>}
                            </div>
                            <div className="input-container">
                                <label>Valor do cateto B:</label>
                                <input value={cateto2} onChange={e => setCateto2(e.target.value)} onBlur={validateInput} />
                                {hasError && <div className="error-message">Não é permitido letras ou valores negativos!</div>}
                            </div>
                            <div className="input-container">
                                <label>Valor da hipotenusa(C):</label>
                                <input value={hypotenuse} onChange={e => setHypotenuse(e.target.value)} disabled={isCalculated} onBlur={validateInput} />
                                {hasError && <div className="error-message">Não é permitido letras ou valores negativos!</div>}
                            </div>
                            <div className="input-container">
                                <button onClick={calculate}>Calcular</button>
                                {isCalculated && <button onClick={clear}>Limpar</button>}
                                {isCatetosAdjacente && <button onClick={clear}>Limpar</button>}
                                {isCatetosOposto && <button onClick={clear}>Limpar</button>}
                            </div>
                            {isCalculated && <p className="result">Comprimento da hipotenusa: {hypotenuse}</p>}
                            {isCatetosAdjacente && <p className="result">Comprimento dos catetos: {cateto1} </p>}
                            {isCatetosOposto && <p className="result">Comprimento dos catetos: {cateto2} </p>}
                            
                        </div>
                        
                        </div>
                        <div className='info'>
                           
                            <p>
                                Essa calculadora foi desenvolvida para auxiliar no cálculo do teorema de Pitágoras,
                                ela realiza o calculo da área, escolha dois campos e o que ficar em branco será calculado,
                                lembrando que pela regra do triangulo pitagorico o valor da hipotenusa(C) 
                                deve ser maior que os valores dos catetos A ou B, senão náo será possivel realizar o calculo.
                            </p>
                        </div>
                        </div>      
              
                    </div>
                );                
            }
                
                export default Calculator
                