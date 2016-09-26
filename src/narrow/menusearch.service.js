angular
    .module('NarrowItDownApp')
    .service('menuSearchService', MenuSearchService);

MenuSearchService.$inject = ['$http', 'apiUrl']

function MenuSearchService($http, apiUrl) {
    this.getMatchedMenuItems = function (searchTerm) {
        return $http({
                method: 'GET',
                url: apiUrl + '/menu_items.json'
            })
            .then(function (result) {
                var items = result.data.menu_items;
                return items.filter(function(item) {
                    return item.description.indexOf(searchTerm) > -1;
                });
            });
    }
}