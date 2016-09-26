angular
    .module('NarrowItDownApp')
    .controller('NarrowItDownController', NarrowItDownController);

NarrowItDownController.$inject = ['menuSearchService', '$scope', '$rootScope'];
function NarrowItDownController(menuSearchService, $scope, $rootScope) {
    this.foundItems = [];
    this.searchTerm = '';
    this.nothingFound = false;

    this.narrowItDown = function (searchTerm) {
        this.nothingFound = false;
        searchTerm = searchTerm.trim().toLowerCase();
        if (searchTerm.length === 0) {
            this.nothingFound = true;
            this.foundItems = [];
            return;
        }
        $rootScope.$broadcast('menusearch:processing', { on: true });
        var resultsPromise = menuSearchService.getMatchedMenuItems(searchTerm);
        var self = this;
        resultsPromise
            .then(function (matchingItems) {
                if (matchingItems.length === 0) {
                    self.nothingFound = true;
                }
                self.foundItems = matchingItems;
            })
            .finally(function () {
                $rootScope.$broadcast('menusearch:processing', { on: false });
            });
    }

    this.removeItem = function (index) {
        this.foundItems.splice(index, 1);
    }
}