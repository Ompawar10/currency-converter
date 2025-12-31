import React, { useEffect, useState } from "react";

const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

const currencyToCountry = {
    USD: "us", INR: "in", EUR: "eu", GBP: "gb", JPY: "jp",
    AUD: "au", CAD: "ca", CHF: "ch", CNY: "cn", NZD: "nz"
};

export default function CurrencyConverter() {
    const [rates, setRates] = useState({});
    const [amount, setAmount] = useState(1);
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("INR");
    const [result, setResult] = useState("");

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setRates(data.rates));
    }, []);

    useEffect(() => {
        if (rates[from] && rates[to]) {
            setResult(((amount / rates[from]) * rates[to]).toFixed(2));
        }
    }, [amount, from, to, rates]);

    const flag = c => `https://flagcdn.com/w40/${currencyToCountry[c]}.png`;

    return (
        <div className="container">
            <h1>💱 Currency Converter</h1>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
            <div className="row">
                <div className="flag-select">
                    <img src={flag(from)} alt="" />
                    <select value={from} onChange={e => setFrom(e.target.value)}>
                        {Object.keys(rates).map(c => <option key={c}>{c}</option>)}
                    </select>
                </div>
                <span>⇄</span>
                <div className="flag-select">
                    <img src={flag(to)} alt="" />
                    <select value={to} onChange={e => setTo(e.target.value)}>
                        {Object.keys(rates).map(c => <option key={c}>{c}</option>)}
                    </select>
                </div>
            </div>
            <h2>{amount} {from} = {result} {to}</h2>
        </div>
    );
}
