
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;


        this.view.renderBoard(6, 7, (col) => {
            this.model.dropToken(col);
        });
    }
}

window.onload = () => {
    const model = new Model();
    const view = new View();
    new Controller(model, view);
};