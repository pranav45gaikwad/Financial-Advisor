document.addEventListener("DOMContentLoaded", () => {
    // Select all the necessary elements
    const calculateBtn = document.getElementById("calculate-sip");
    
    const sipAmountInput = document.getElementById("sip-amount");
    const sipRateInput = document.getElementById("sip-rate");
    const sipTimeInput = document.getElementById("sip-time");

    const investedAmountSpan = document.getElementById("invested-amount");
    const estimatedReturnsSpan = document.getElementById("estimated-returns");
    const totalValueSpan = document.getElementById("total-value");

    // Add a click event listener to the button
    calculateBtn.addEventListener("click", () => {
        // 1. Get and parse the input values
        const P = parseFloat(sipAmountInput.value); // Monthly Investment
        const annualRate = parseFloat(sipRateInput.value); // Expected Return Rate (annual)
        const timeInYears = parseFloat(sipTimeInput.value); // Time Period (Years)

        // 2. Validate inputs
        if (isNaN(P) || isNaN(annualRate) || isNaN(timeInYears) || P <= 0 || annualRate <= 0 || timeInYears <= 0) {
            alert("Please enter valid positive numbers in all fields.");
            return;
        }

        // 3. Perform SIP calculations
        const n = timeInYears * 12; // Number of months
        const i = (annualRate / 12) / 100; // Monthly interest rate

        // Calculate Future Value (Total Value)
        // Formula: FV = P * ({[ (1 + i)^n ] - 1} / i) * (1 + i)
        // We use (1+i) at the end because SIPs are typically invested at the start of the month.
        // If investments are at the end, remove the *(1 + i). Let's assume end-of-month for simplicity.
        // Simplified Formula (end of month): FV = P * ([ (1 + i)^n - 1 ] / i)
        
        const totalValue = P * ((Math.pow(1 + i, n) - 1) / i);
        const investedAmount = P * n;
        const estimatedReturns = totalValue - investedAmount;

        // 4. Format and display the results
        
        // Helper function to format numbers as Indian Rupees
        const formatAsRupee = (number) => {
            // Using 'en-IN' locale for Indian numbering system and 'INR' for the currency symbol.
            // We strip the decimal places with maximumFractionDigits: 0
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0
            }).format(number);
        };

        investedAmountSpan.textContent = formatAsRupee(investedAmount);
        estimatedReturnsSpan.textContent = formatAsRupee(estimatedReturns);
        totalValueSpan.textContent = formatAsRupee(totalValue);
    });
});