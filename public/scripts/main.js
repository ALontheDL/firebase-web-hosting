class Main {
    constructor() {
        this.pageViewsKey = 'pageViewsCount';
        this.initializeCounter();
        this.displayCount();
        this.attachEventListeners();
    }

    initializeCounter() {
        if (!localStorage.getItem(this.pageViewsKey)) {
            localStorage.setItem(this.pageViewsKey, '0');
        }
    }

    incrementCount() {
        let currentCount = parseInt(localStorage.getItem(this.pageViewsKey));
        currentCount++;
        localStorage.setItem(this.pageViewsKey, currentCount.toString());
    }

    displayCount() {
        document.getElementById('count').innerHTML = 'You have visited this page ' + localStorage.getItem(this.pageViewsKey) + ' times.';
    }

    // Custom function to reset the counter to zero
    resetCounter() {
        localStorage.setItem(this.pageViewsKey, '0');
        this.displayCount();
    }

    // Custom function to log the current count to the console
    logCount() {
        console.log('Page Views Count: ' + localStorage.getItem(this.pageViewsKey));
    }

    // Custom function to change the display message
    changeDisplayMessage() {
        const displayMessage = document.getElementById('count');
        displayMessage.innerHTML = 'Thank you for visiting this page ' + localStorage.getItem(this.pageViewsKey) + ' times!';
    }

    attachEventListeners() {
        // Event binding for resetting the counter
        const resetButton = document.getElementById('resetButton');
        resetButton.addEventListener('click', () => {
            this.resetCounter();
        });

        // Event binding for logging the count
        const logButton = document.getElementById('logButton');
        logButton.addEventListener('click', () => {
            this.logCount();
        });

        // Event binding for changing the display message
        const changeMessageButton = document.getElementById('changeMessageButton');
        changeMessageButton.addEventListener('click', () => {
            this.changeDisplayMessage();
        });
    }
}

document.mainClass = new Main();
