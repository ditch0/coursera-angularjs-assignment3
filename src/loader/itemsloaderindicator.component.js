angular
    .module('Loader')
    .component('itemsLoaderIndicator', {
        templateUrl: 'src/loader/itemsloaderindicator.template.html',
        controller: ItemsLoaderIndicatorController,
        bindings: {
            triggeringEventId: '@'
        }
    });

ItemsLoaderIndicatorController.$inject = ['$rootScope'];
function ItemsLoaderIndicatorController($rootScope) {
    this.showLoader = false;

    if (!this.triggeringEventId) {
        return;
    }

    var self = this;
    var cancelListener = $rootScope.$on(this.triggeringEventId, function (event, data) {
        self.showLoader = data.on;
    });

    this.$onDestroy = function () {
        cancelListener();
    };
}