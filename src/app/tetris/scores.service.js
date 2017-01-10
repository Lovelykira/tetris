(function(){
    'use strict';

    angular
        .module('tetris')
        .service('scoreService', scoreService);

    /** @ngInject */
    function scoreService() {
        var SS = this;
        SS.score = 0;
        SS.increaseScore = increaseScore;
        SS.getScore = getScore;

        function increaseScore() {
            SS.score += 1;
        }

        function getScore(){
            return SS.score;
        }

    }
})();
