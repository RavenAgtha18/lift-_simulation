const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Lift {
    constructor() {
        this.currentFloor = Math.floor(Math.random() * 10) + 1;
    }

    async move(fromFloor, toFloor) {
        console.log(`Lift berada di posisi awal acak di lantai ${this.currentFloor}`);
        console.log(`Penumpang lift dengan nama "${this.userName}" berada di lantai ${fromFloor}`);
        console.log(`Dan hendak ${fromFloor > toFloor ? "turun" : "naik"} ke lantai ${toFloor}`);

        if (this.currentFloor !== fromFloor) {
            await this.travel(fromFloor);
        }

        console.log(`Maka lift akan bergerak ${fromFloor > toFloor ? "turun" : "naik"} dari lantai ${fromFloor} sampai ke lantai ${toFloor} lalu pintu terbuka`);

        this.currentFloor = toFloor;

        console.log(`Pintu lift menutup dan akan bergerak ${fromFloor > toFloor ? "turun" : "naik"} dari lantai ${fromFloor} ke lantai ${toFloor} lalu pintu terbuka`);
    }

    async getName() {
        return new Promise((resolve) => {
            rl.question("Tolong masukkan nama Anda [minimal 5 karakter]: ", (name) => {
                while (name.length < 5) {
                    name = readline.question("Nama Anda harus lebih dari 4 karakter! Tolong masukkan nama Anda [minimal 5 karakter]: ");
                }
                this.userName = name;
                resolve(name);
            });
        });
    }

    async travel(floor) {
        const direction = this.currentFloor > floor ? "turun" : "naik";
        
        console.log(`Lift ${direction} dari lantai ${this.currentFloor} menuju lantai ${floor}...`);
        while (this.currentFloor !== floor) {
            this.currentFloor += direction === "turun" ? -1 : 1;
            console.log(`Lift ${direction === "turun" ? "turun" : "naik"} ke lantai: ${this.currentFloor}`);
        }
        
        console.log(`Lift sampai di lantai ${this.currentFloor}, pintu terbuka.`);
    }
}

async function main() {
    const lift = new Lift();
    const userName = await lift.getName();
    console.log(`Selamat datang, ${userName}!`);

    const fromFloor = await askForFloor("Tolong masukkan lantai penjemputan (1-10): ");
    const toFloor = await askForFloor("Tolong masukkan lantai tujuan (1-10): ");

    if (fromFloor === toFloor) {
        console.log("Anda tidak perlu naik lift.");
    } else {
        await lift.move(fromFloor, toFloor);
    }

    console.log("Program Lift selesai digunakan");
    rl.close();
}

function askForFloor(question) {
    return new Promise((resolve) => {
        rl.question(question, (floor) => {
            while (isNaN(floor) || floor < 1 || floor > 10) {
                floor = readline.question("Lantai yang Anda masukkan harus di antara rentang 1-10! " + question);
            }
            resolve(parseInt(floor));
        });
    });
}

main();
