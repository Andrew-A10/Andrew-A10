const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundary {
    static width = 20
    static height = 20
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
class Player {
    constructor({ position, velocity }) {
        this.position = this.position
        this.velocity = this.velocity
        this.radius = 5
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'yellow';
        c.fill()
        c.closePath()
    }
}
let map = [];

const boundaries = [];
const player = new Player({
    position: {
        x: 20,
        y: 20
    },
    velocity: {
        x: 0,
        y: 0
    }
})
//!Function to update the boundaries based on the map

function updtmap() {
    boundaries.length = 0; // Clear boundaries before redrawing
    map.forEach((row, i) => {
        row.forEach((symbol, j) => {
            switch (symbol) {
                case '1':
                    boundaries.push(new Boundary({ position: { x: Boundary.width * j, y: Boundary.height * i } }))
                    break;
            }
        })
    })
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    player.draw()
}

// File upload logic
let upload = document.getElementById('upload')
let outputBx = document.getElementById('outputBx')

upload.addEventListener('change', () => {
    let fr = new FileReader()
    fr.readAsText(upload.files[0])
    fr.onload = function () {
        var txt = fr.result  // The content of the file

        // Now we parse the text into a 2D array for the map
        map = txt.trim().split('\n').map(line => line.split('')) // Convert the text to a 2D array

        // After loading the map, update the boundaries
        updtmap()
    }
})