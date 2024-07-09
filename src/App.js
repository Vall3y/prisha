import React, { useState } from "react";
import "./App.css";

function App() {
  const [startingWealth, setStartingWealth] = useState("");
  const [monthlyExpense, setMonthlyExpense] = useState("");
  const [amountOfChildren, setAmountOfChildren] = useState("");
  const [pricePerChild, setPricePerChild] = useState("");
  const [years, setYears] = useState("");
  const [yearlyROI, setYearlyROI] = useState("");
  const [eventualWealth, setEventualWealth] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const startingWealthNum = parseFloat(startingWealth);
    const monthlyExpenseNum = parseFloat(monthlyExpense);
    const amountOfChildrenNum = parseInt(amountOfChildren, 10);
    const pricePerChildNum = parseFloat(pricePerChild);
    const yearsNum = parseInt(years, 10);
    const yearlyROINum = parseFloat(yearlyROI) / 100;

    // Compute eventual wealth
    const annualExpense = monthlyExpenseNum * 12;
    const initialWealthAfterChildren = startingWealthNum;

    const wealthAfterROI = initialWealthAfterChildren * (1 + yearlyROINum);
    const wealthAfterExpenses = wealthAfterROI - annualExpense;
    const totalWealth = wealthAfterExpenses * yearsNum;

    let wealth = startingWealthNum;

    let childrenYearCount = 0;

    for (let i = 0; i < years; i++) {
      if (childrenYearCount < 9) {
        wealth = wealth - amountOfChildrenNum * ((pricePerChildNum * 0.75) / 9);
        childrenYearCount += 1;
      } else if (childrenYearCount < 18) {
        wealth = wealth - amountOfChildrenNum * ((pricePerChildNum * 0.25) / 9);
        childrenYearCount += 1;
      }
      wealth = (wealth - annualExpense) * (1 + yearlyROINum);
    }

    setEventualWealth(wealth);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Financial Planning</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Starting Wealth:
              <input
                type="number"
                value={startingWealth}
                onChange={(e) => setStartingWealth(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Monthly Expense:
              <input
                type="number"
                value={monthlyExpense}
                onChange={(e) => setMonthlyExpense(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Amount of Children:
              <input
                type="number"
                value={amountOfChildren}
                onChange={(e) => setAmountOfChildren(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Price per Child:
              <input
                type="number"
                value={pricePerChild}
                onChange={(e) => setPricePerChild(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Years:
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Yearly ROI (%):
              <input
                type="number"
                value={yearlyROI}
                onChange={(e) => setYearlyROI(e.target.value)}
              />
            </label>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </header>
      <h1>
        Wealth after {years} years:{" "}
        {eventualWealth &&
          eventualWealth.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
      </h1>
    </div>
  );
}

export default App;
