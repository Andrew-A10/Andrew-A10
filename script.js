let score = 0;
let clickAmount = 1 * clickModifier;
let clickModifier = 1;
const clickButton = document.getElementById('clickButton');
const scoreDisplay = document.getElementById('score');
clickButton.addEventListener('click', () => {
    score = score + clickAmount;
    scoreDisplay.textContent = 'Score: ${score}';
});