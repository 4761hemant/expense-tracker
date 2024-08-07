// script.js
document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    // Load expenses from local storage
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    const renderExpenses = () => {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${expense.name} - $${expense.amount}
                <button onclick="deleteExpense(${index})">Delete</button>
            `;
            expenseList.appendChild(li);
        });
    };

    const addExpense = (name, amount) => {
        expenses.push({ name, amount });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    };

    const deleteExpense = (index) => {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    };

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('expense-name').value;
        const amount = document.getElementById('expense-amount').value;
        addExpense(name, amount);
        expenseForm.reset();
    });

    renderExpenses();
});

function deleteExpense(index) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    document.getElementById('expense-list').innerHTML = '';
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.name} - $${expense.amount}
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
        document.getElementById('expense-list').appendChild(li);
    });
}
