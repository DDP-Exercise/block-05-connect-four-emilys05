
class View {
    constructor() {
        this.boardElement = document.getElementById('board');
        this.statusElement = document.getElementById('status');
        this.maskLeft = document.getElementById('mask-left');
        this.maskRight = document.getElementById('mask-right');

     
        window.addEventListener('connectFour:playerChanged', (e) => this.updateLighting(e.detail.player));
        window.addEventListener('connectFour:stoneInserted', (e) => this.renderStone(e.detail));
        window.addEventListener('connectFour:gameOver', (e) => this.showEnd(e.detail));
    }

    renderBoard(rows, cols, callback) {
        this.boardElement.innerHTML = '';
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.id = `cell-${c}-${r}`;
                cell.onclick = () => callback(c);
                this.boardElement.appendChild(cell);
            }
        }
    }

    renderStone({col, row, player}) {
        const cell = document.getElementById(`cell-${col}-${row}`);
        cell.classList.add(`player${player}`);
    }

    updateLighting(player) {
        if (player === 1) {
            this.maskLeft.classList.add('active');
            this.maskRight.classList.remove('active');
            this.statusElement.innerText = "Comedy plant den nächsten Akt...";
        } else {
            this.maskRight.classList.add('active');
            this.maskLeft.classList.remove('active');
            this.statusElement.innerText = "Tragedy webt Schatten...";
        }
    }

    showEnd({type, winner, stones}) {
        this.maskLeft.classList.remove('active');
        this.maskRight.classList.remove('active');

        if (type === 'win') {
            this.statusElement.innerText = winner === 1 ? "EWIGE STILLE." : "GOLDENER TRIUMPH!";
      
            stones.forEach(([c, r]) => {
                document.getElementById(`cell-${c}-${r}`).style.boxShadow = "0 0 20px white";
            });
        } else {
            this.statusElement.innerText = "Das Stück endet im Stillstand (Unentschieden).";
        }
    }
}