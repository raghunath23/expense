// Sample expenses data (replace with your actual data)
let expensesData = [
    { label: "Groceries", amount: 50 },
    { label: "Utilities", amount: 100 },
    { label: "Entertainment", amount: 30 }
];

// Function to calculate percentages
function calculatePercentages(expenses, total) {
    return expenses.map(expense => Math.round((expense.amount / total) * 100));
}

// Function to handle adding an expense
function addExpense() {
    const tableBody = document.querySelector('.table-section tbody');
    const reason = prompt("Enter the reason for the expense:");
    const amount = parseFloat(prompt("Enter the amount:"));

    if (reason && !isNaN(amount)) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${reason}</td><td>$${amount}</td>`;
        tableBody.appendChild(newRow);

        // Update expensesData array with new expense
        expensesData.push({ label: reason, amount: amount });

        // Recalculate total amount
        const totalAmount = expensesData.reduce((acc, expense) => acc + expense.amount, 0);

        // Recalculate percentages
        const percentages = calculatePercentages(expensesData, totalAmount);

        // Generate random colors for the pie chart
        const randomColors = expensesData.map(() => '#' + Math.floor(Math.random()*16777215).toString(16));

        // Update chart data and options
        pieChart.data.labels = expensesData.map(expense => expense.label);
        pieChart.data.datasets[0].data = percentages;
        pieChart.data.datasets[0].backgroundColor = randomColors;
        pieChart.update();
    } else {
        alert("Invalid input. Please enter a valid reason and amount.");
    }
}

// Add event listener to the "Add Expense" button
document.getElementById('add-expense-btn').addEventListener('click', addExpense);

// Calculate total amount
const totalAmount = expensesData.reduce((acc, expense) => acc + expense.amount, 0);

// Initialize Chart.js pie chart
const ctx = document.getElementById('pie-chart').getContext('2d');
const pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: expensesData.map(expense => expense.label),
        datasets: [{
            data: calculatePercentages(expensesData, totalAmount),
            backgroundColor: Array.from({ length: expensesData.length }, () => '#' + Math.floor(Math.random()*16777215).toString(16))
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Expense Distribution'
        }
    }
});

