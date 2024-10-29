clickButton.addEventListener('click', () => {
    score = score + clickAmount;
    scoreDisplay.textContent = 'Score: ${score}';
});