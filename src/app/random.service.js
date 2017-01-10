(function(){
    'use strict';

    angular
        .module('rnd', [])
        .service('rndService', rndService);

    function rndService() {
        this.getRandomNumber = getRandomNumber;

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }
    }
})();