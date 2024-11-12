const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundary {
    constructor({ position }) {
        this.position = position;
        this.width = 20;
        this.height = 20;
    }
    draw() {
        c.fillStyle = "blue";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

// Initialize the map array to empty for now
let map = [];

const boundaries = [];

// Function to update the boundaries based on the map
function update() {
    console.log(map);
    boundaries.length = 0; // Clear boundaries before redrawing
    map.forEach((row, i) => {
        row.forEach((symbol, j) => {
            switch (symbol) {
                case '1':
                    boundaries.push(new Boundary({ position: { x: 20 * j, y: 20 * i } }));
                    break;
            }
        });
    });
    boundaries.forEach(boundary => {
        boundary.draw();
    });
}

// File upload logic
let upload = document.getElementById('upload');
let outputBx = document.getElementById('outputBx');

upload.addEventListener('change', () => {
    let fr = new FileReader();
    fr.readAsText(upload.files[0]);
    fr.onload = function () {
        var txt = fr.result;  // The content of the file

        // Now we parse the text into a 2D array for the map
        map = txt.trim().split('\n').map(line => line.split('')); // Convert the text to a 2D array

        // After loading the map, update the boundaries
        update();
    };
});
