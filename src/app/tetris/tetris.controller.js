(function(){
    'use strict';

    angular
        .module('tetris')
        .controller('tetrisController', tetrisController);

    /** @ngInject */
    function tetrisController( tetrisService, $timeout, hotkeys, scoreService, $document     ) {
        var vm = this;
        vm.x = 30;
        vm.y = 30;
        vm.board = tetrisService.createBoard(vm.x, vm.y);
        vm.score = scoreService.getScore();
        vm.context = 'GAME PAUSED';
        vm.game_paused = true;
        vm.clock = moment({hour: 0, minute: 0, seconds: 0});
        var next_update, next_time;
        var max_speed = 300;
        var min_speed = 100;

        hotkeys.add({
            combo: 'left',
            description: 'Move left',
            callback: function() {
               tetrisService.move('left');
            }
        });

        hotkeys.add({
            combo: 'right',
            description: 'Move right',
            callback: function() {
               tetrisService.move('right');
            }
        });

        hotkeys.add({
            combo: 'up',
            description: 'Rotate',
            callback: function() {
               tetrisService.flip('right');
            }
        });

        hotkeys.add({
            combo: 'down',
            description: 'Rotate',
            callback: function() {
               tetrisService.flip('left');
            }
        });

        hotkeys.add({
            combo: 'p',
            description: 'Pause',
            callback: function() {
                if (vm.game_paused) {
                    updateBoard();
                    vm.game_paused = false;
                    vm.context = undefined;
                    $timeout.cancel(next_time);
                    tick();
                }
                else {
                    $timeout.cancel(next_update);
                    $timeout.cancel(next_time);
                    vm.game_paused = true;
                    vm.context = 'Game Paused';
                }
            }
        });

        hotkeys.add({
            combo: 'n',
            description: 'New Game',
            callback: function() {
                vm.board = tetrisService.newGame(vm.x, vm.y);
                vm.clock = moment({hour: 0, minute: 0, seconds: 0});
            }
        });

        hotkeys.add({
            combo: 'space',
            description: 'Speed up. Press again to slowdown!',
            callback: function() {
                vm.interval = vm.interval == max_speed ? min_speed : max_speed;
            }
        });

        function updateBoard() {
            if (tetrisService.figure_landed)
                vm.interval = max_speed;
            vm.board = tetrisService.updateBoard();
            vm.score = scoreService.getScore();
            if (!tetrisService.checkEndGame())
                next_update = $timeout(updateBoard, vm.interval);
            else {
                vm.context = 'GAME END';
            }
        }

        function tick () {
            vm.clock.add(1, 's');
            next_time = $timeout(tick, 1000);
        }



//
//        $document.bind("keydown", function(event) {
//            vm.interval = 30;
//        });
//
//        $document.bind("keyup", function(event) {
//            vm.interval = 300;
//        });

//        $timeout(updateBoard, 500);
    }
})();
