(function(){
    'use strict';

    angular
        .module('tetris')
        .service('tetrisService', tetrisService);

    /** @ngInject */
    function tetrisService($timeout, figureService, scoreService, BACKGROUND_COLOR, FILL_COLOR, ACTIVE_COLOR){
        var TS = this;

        TS.createBoard = createBoard;
        TS.updateBoard = updateBoard;
        TS.checkEndGame = checkEndGame;
        TS.newGame = newGame;
        TS.move = move;
        TS.flip = flip;
        TS.board = [];
        TS.figure_landed = true;

        var NUM_ROWS;
        var NUM_COLS;
        var X, Y;

        function createBoard(x, y) {
            NUM_ROWS = x;
            NUM_COLS = y;
            for ( var i = 0; i < NUM_ROWS; i++ ) {
                TS.board[i] = [];
                for ( var j = 0; j < NUM_COLS; j++ ) {
                    TS.board[i][j] = figureService.createEmptyCell(i, j);
                }
            }
            return TS.board;
        }

        function newGame(x, y){
            TS.createBoard(x,y);
            TS.figure_landed = true;

        }

        function updateBoard() {
            if (TS.figure_landed) {
                TS.cur_figure = generateFigure();
                TS.figure_landed = false;
                X = 0;
                Y = Math.floor(NUM_COLS / 2) - TS.cur_figure.num_cols;
                redraw();
            }
            else {
                if (canMove(X + 1, Y)) {
                    moveDown();
                }
                else {
                    TS.figure_landed = true;
                    clearFigureParts();
                }
            }
            clearFilledRows();

            return TS.board;
        }

        function canMove(to_x, to_y) {
            if (to_x >= NUM_ROWS - TS.cur_figure.num_rows + 1 || to_x < 0 || to_y >= NUM_COLS - TS.cur_figure.num_cols + 1
                || to_y < 0) {
                return false;
            }
            for (var i = TS.cur_figure.num_rows - 1; i >= 0; i--) {
                for (var j = TS.cur_figure.num_cols - 1; j >= 0; j--) {
                    if ( (TS.board[to_x + i ][to_y + j].color == FILL_COLOR && TS.cur_figure.getMatrix()[i][j].color == ACTIVE_COLOR)) {
                        return false;
                    }
                }
            }
            return true;
        }

        function moveDown() {
            clear();
            X += 1;
            redraw();
        }

        function rowFilled(row) {
            for (var i = 0; i < row.length; i++) {
                if (row[i].color != FILL_COLOR)
                    return false;
            }
            return true;
        }

        function clearFilledRows() {
            for (var i = NUM_ROWS - 1; i >=0; i--) {
                if (rowFilled(TS.board[i])) {
                    scoreService.increaseScore();
                    for (var k = i; k >= 0; k--) {
                        for (var j = 0; j < NUM_COLS; j++) {
                            if (k == 0) {
                                TS.board[k][j] = figureService.createEmptyCell(k, j);
                            }
                            else {
                                TS.board[k][j] = TS.board[k-1][j];
                            }
                        }
                    }
                    i-=1;
                }
            }
        }

        function checkEndGame(){
            for ( var j = 0; j < NUM_COLS; j++ ) {
                if(TS.board[0][j].color==FILL_COLOR){
                    return true;
                }
            }
            return false;
        }

        function clearFigureParts() {
            for ( var i = TS.cur_figure.num_rows - 1; i >= 0 ; i-- ) {
                for ( var j = TS.cur_figure.num_cols - 1; j >= 0; j-- ) {
                    if (TS.board[X + i][Y + j].figure_part) {
                        TS.board[X + i][Y + j] = figureService.createEmptyCell(X + i, Y + j);
                        TS.board[X + i][Y + j].color = FILL_COLOR;
                        TS.board[X + i][Y + j].figure_part = false;
                    }
                }
            }
        }

        function generateFigure() {
            var figure_object = figureService.getRandomFigure();
            return figure_object.figure;
        }

        function move(side){
            var new_y = Y;
            if (side == 'left') {
                new_y = Y - 1;
            }
            else if (side == 'right') {
                new_y = Y + 1;
            }
            if(!TS.figure_landed && canMove(X, new_y)) {
                clear();
                Y = new_y;
                redraw();
            }
        }

        function flip(side) {
            if (TS.figure_landed)
                return;
            clear();
            TS.cur_figure.rotate(side);
            redraw();
        }

        function clear() {
            for (var i = 0; i < TS.cur_figure.num_rows; i++ ) {
                for (var j = 0; j < TS.cur_figure.num_cols; j++) {
                    if (TS.cur_figure.getMatrix()[i][j].color == ACTIVE_COLOR)
                     TS.board[X + i][Y + j] = figureService.createEmptyCell(X + i, Y + j);
                }
            }
        }

        function redraw() {
            if (X + TS.cur_figure.num_rows > NUM_ROWS)
                X = NUM_ROWS - TS.cur_figure.num_rows;

            if (Y + TS.cur_figure.num_cols > NUM_COLS)
                Y = NUM_COLS - TS.cur_figure.num_cols;

//            console.log(TS.cur_figure.getMatrix());

            for (var i = 0; i < TS.cur_figure.num_rows; i++ ) {
                for (var j = 0; j < TS.cur_figure.num_cols; j++) {
                    if (TS.cur_figure.getMatrix()[i][j].color == ACTIVE_COLOR) {
                        TS.board[X + i][Y + j] = TS.cur_figure.getMatrix()[i][j];
                    }
                }
            }
        }
    }

})();
