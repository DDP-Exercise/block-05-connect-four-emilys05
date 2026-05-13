
class Model {
    constructor() {
        this.columns = 7;
        this.rows = 6;
        this.board = Array(this.columns).fill(null).map(() => Array(this.rows).fill(0));
        this.currentPlayer = 1;
        this.gameOver = false;
        this.winningStones = []; 
    }

 
    dispatchPlayerChanged() {
        window.dispatchEvent(new CustomEvent('connectFour:playerChanged', { detail: { player: this.currentPlayer } }));
    }

    dispatchStoneInserted(col, row) {
        window.dispatchEvent(new CustomEvent('connectFour:stoneInserted', {
            detail: { col, row, player: this.board[col][row] }
        }));
    }

    dispatchGameOver(type) {
        window.dispatchEvent(new CustomEvent('connectFour:gameOver', {
            detail: { type, winner: type === 'win' ? (this.currentPlayer === 1 ? 2 : 1) : null, stones: this.winningStones }
        }));
    }

    dropToken(col) {
        if (this.gameOver) return;

        for (let r = this.rows - 1; r >= 0; r--) {
            if (this.board[col][r] === 0) {
                this.board[col][r] = this.currentPlayer;
                this.dispatchStoneInserted(col, r);

                if (this.checkWin(col, r)) {
                    this.gameOver = true;
                    this.dispatchGameOver('win');
                } else if (this.checkDraw()) {
                    this.gameOver = true;
                    this.dispatchGameOver('draw');
                } else {
                    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
                    this.dispatchPlayerChanged();
                }
                return true;
            }
        }
       
        alert("Dieser Pfad des Schicksals ist bereits versperrt! (Spalte voll)");
        return false;
    }

    checkDraw() {
        return this.board.every(col => col.every(cell => cell !== 0));
    }

    checkWin(col, row) {
        const p = this.board[col][row];
        const directions = [[1,0], [0,1], [1,1], [1,-1]];
        for (let [dx, dy] of directions) {
            let stones = [[col, row]];
            for (let i of [1, -1]) {
                let r = row + i*dy, c = col + i*dx;
                while (r>=0 && r<this.rows && c>=0 && c<this.columns && this.board[c][r] === p) {
                    stones.push([c, r]);
                    r += i*dy; c += i*dx;
                }
            }
            if (stones.length >= 4) {
                this.winningStones = stones;
                return true;
            }
        }
        return false;
    }
}