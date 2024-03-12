import { useEffect, useState, useRef } from 'react';

function App() {
  const [amount, setAmount] = useState(1);
  const [localAmount, setLocalAmount] = useState(amount);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const inputRef = useRef(null);

  useEffect(() => {
    setLocalAmount(amount);
  }, [amount]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [localAmount]); 

  const handleAmountChange = (e) => {
    setLocalAmount(Number(e.target.value));
  };

  const handleBlur = () => {
    setAmount(localAmount);
  };

useEffect(
  function() {
    async function convert() {
      setIsLoading(true);
      const response = await fetch(
       `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      //  `https://www.exchangerate-api.com/docs/free/${fromCurrency}`
      );
      const data = await response.json();
      console.log(data);
      setConvertedAmount(data.rates[toCurrency] * amount);
      setIsLoading(false);
}

if (fromCurrency === toCurrency) return setConvertedAmount(amount);
convert();
  } ,
  [fromCurrency, toCurrency, amount]);

  return (
    <div>
      <input 
        type="text" 
        value={localAmount}
        onChange={handleAmountChange}
        onBlur={handleBlur}
        disabled={isLoading}
        ref={inputRef}
      />
      <select name="fromCurrency" id="fromCurrency"
       value={fromCurrency}
       onChange={(e) => setFromCurrency(e.target.value)}
       disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">CHF</option>
      </select>
      <select name="toCurrency" id="toCurrency"
      value={toCurrency}
      onChange={(e) => setToCurrency(e.target.value)}
      disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">CHF</option>
      </select>
      <p>{convertedAmount} {toCurrency}</p>
    </div>
  );
}

export default App;
