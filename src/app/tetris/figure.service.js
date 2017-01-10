(function(){
    'use strict';

    angular
        .module('tetris')
        .service('figureService', figureService);

    /** @ngInject */
    function figureService(BACKGROUND_COLOR, ACTIVE_COLOR, rndService) {
        this.getRandomFigure = getRandomFigure;
        this.createEmptyCell = createEmptyCell;
        this.Cell = Cell;

        function getRandomFigure() {
            var states = {};
            var figure_state = [];
            var result_figure;
            var number = rndService.getRandomNumber(1, 6);
            switch (number) {
                case 1:
                    // |
                    // |
                    // |
                    // |
                    figure_state = generateEmptyFigure(4, 1);
                    for (var i = 0; i < 4 ; i++){
                        figure_state[i][0].color = ACTIVE_COLOR;
                        figure_state[i][0].figure_part = true;
                    }
                    states[0] = figure_state;
                    figure_state = generateEmptyFigure(1, 4);
                    for (var j = 0; j < 4 ; j++){
                        figure_state[0][j].color = ACTIVE_COLOR;
                        figure_state[0][j].figure_part = true;
                    }
                    states[1] = figure_state;

                    result_figure = new Figure(states);
                    break
                case 2:
                    // ||
                    // ||
                    figure_state = generateEmptyFigure(2, 2);
                    for (var i = 0; i < 2; i++){
                        for(var j = 0; j < 2; j++) {
                            figure_state[i][j].color = ACTIVE_COLOR;
                            figure_state[i][j].figure_part = true;
                        }
                    }
                    states[0] = figure_state;
                    result_figure = new Figure(states);
                    break
                case 3:
                    // |
                    // ||
                    //  |
                    figure_state = generateEmptyFigure(3, 2);
                    figure_state[0][0].color = ACTIVE_COLOR;
                    figure_state[0][0].figure_part = true;

                    figure_state[1][0].color = ACTIVE_COLOR;
                    figure_state[1][0].figure_part = true;

                    figure_state[1][1].color = ACTIVE_COLOR;
                    figure_state[1][1].figure_part = true;

                    figure_state[2][1].color = ACTIVE_COLOR;
                    figure_state[2][1].figure_part = true;

                    states[0] = figure_state;

                    figure_state = generateEmptyFigure(2, 3);
                    figure_state[1][0].color = ACTIVE_COLOR;
                    figure_state[1][0].figure_part = true;

                    figure_state[1][1].color = ACTIVE_COLOR;
                    figure_state[1][1].figure_part = true;

                    figure_state[0][1].color = ACTIVE_COLOR;
                    figure_state[0][1].figure_part = true;

                    figure_state[0][2].color = ACTIVE_COLOR;
                    figure_state[0][2].figure_part = true;
                    states[1] = figure_state;
                    result_figure = new Figure(states);
                    break
                case 4:
                    //  |
                    // ||
                    // |
                    figure_state = generateEmptyFigure(3, 2);
                    figure_state[0][1].color = ACTIVE_COLOR;
                    figure_state[0][1].figure_part = true;

                    figure_state[1][0].color = ACTIVE_COLOR;
                    figure_state[1][0].figure_part = true;

                    figure_state[1][1].color = ACTIVE_COLOR;
                    figure_state[1][1].figure_part = true;

                    figure_state[2][0].color = ACTIVE_COLOR;
                    figure_state[2][0].figure_part = true;

                    states[0] = figure_state;

                    figure_state = generateEmptyFigure(2, 3);
                    figure_state[0][0].color = ACTIVE_COLOR;
                    figure_state[0][0].figure_part = true;

                    figure_state[1][1].color = ACTIVE_COLOR;
                    figure_state[1][1].figure_part = true;

                    figure_state[0][1].color = ACTIVE_COLOR;
                    figure_state[0][1].figure_part = true;

                    figure_state[1][2].color = ACTIVE_COLOR;
                    figure_state[1][2].figure_part = true;
                    states[1] = figure_state;
                    result_figure = new Figure(states);
                    break
                case 5:
                    // |
                    // |
                    // |__
                    figure_state = generateEmptyFigure(3, 2);
                    figure_state[0][1].color = ACTIVE_COLOR;
                    figure_state[0][1].figure_part = true;

                    figure_state[1][1].color = ACTIVE_COLOR;
                    figure_state[1][1].figure_part = true;

                    figure_state[2][1].color = ACTIVE_COLOR;
                    figure_state[2][1].figure_part = true;

                    figure_state[2][0].color = ACTIVE_COLOR;
                    figure_state[2][0].figure_part = true;

                    states[0] = figure_state;

                    figure_state = generateEmptyFigure(2, 3);
                    figure_state[0][0].color = ACTIVE_COLOR;
                    figure_state[0][0].figure_part = true;

                    figure_state[1][1].color = ACTIVE_COLOR;
                    figure_state[1][1].figure_part = true;

                    figure_state[1][0].color = ACTIVE_COLOR;
                    figure_state[1][0].figure_part = true;

                    figure_state[1][2].color = ACTIVE_COLOR;
                    figure_state[1][2].figure_part = true;

                    states[1] = figure_state;

                    figure_state = generateEmptyFigure(3, 2);
                    figure_state[0][0].color = ACTIVE_COLOR;
                    figure_state[0][0].figure_part = true;

                    figure_state[0][1].color = ACTIVE_COLOR;
                    figure_state[0][1].figure_part = true;

                    figure_state[1][0].color = ACTIVE_COLOR;
                    figure_state[1][0].figure_part = true;

                    figure_state[2][0].color = ACTIVE_COLOR;
                    figure_state[2][0].figure_part = true;

                    states[2] = figure_state;

                    figure_state = generateEmptyFigure(2, 3);
                    figure_state[0][0].color = ACTIVE_COLOR;
                    figure_state[0][0].figure_part = true;

                    figure_state[0][1].color = ACTIVE_COLOR;
                    figure_state[0][1].figure_part = true;

                    figure_state[0][2].color = ACTIVE_COLOR;
                    figure_state[0][2].figure_part = true;

                    figure_state[1][2].color = ACTIVE_COLOR;
                    figure_state[1][2].figure_part = true;

                    states[3] = figure_state;
                    result_figure = new Figure(states);
                    break

//                default:
//                    FIGURE_ROWS = 4;
//                    FIGURE_COLS = 1;
//                    figure = generateEmptyFigure();
//                    for (var i = 0; i < FIGURE_ROWS; i++){
//                        figure[i][0].color = ACTIVE_COLOR;
//                        figure[i][0].figure_part = true;
//                    }
            }
            return {figure: result_figure};
        }

        function generateEmptyFigure(rows, cols){
            var figure = []
            for ( var i = 0; i < rows; i++ ) {
                figure[i] = [];
                for ( var j = 0; j < cols; j++ ) {
                    figure[i][j] = createEmptyCell(i, j);
                }
            }
            return figure;
        }

        function createEmptyCell (i, j) {
            return new Cell (i, j, BACKGROUND_COLOR, false)
        }

        function Cell (i, j, color, figure_part) {
            this.i = i;
            this.j = j;
            this.color = color;
            this.figure_part = figure_part;
        }

        function Figure(states) {
            this.states = states;
            this.cur_state = 0;
            this.num_rows = this.states[this.cur_state].length;
            this.num_cols = this.states[this.cur_state][0].length;
            this.num_states = Object.keys(this.states).length - 1;
        }

        Figure.prototype.rotate = function (side) {
            if (side == 'right') {
                this.cur_state = this.cur_state + 1 <= this.num_states ?  this.cur_state + 1 : 0;
                this.num_rows = this.states[this.cur_state].length;
                this.num_cols = this.states[this.cur_state][0].length;
            }
            else if (side == 'left') {
                this.cur_state = this.cur_state - 1 >= 0 ?  this.cur_state - 1 : this.num_states;
                this.num_rows = this.states[this.cur_state].length;
                this.num_cols = this.states[this.cur_state][0].length;
            }
        }

        Figure.prototype.getMatrix = function () {
            return this.states[this.cur_state];
        }
    }
})();
