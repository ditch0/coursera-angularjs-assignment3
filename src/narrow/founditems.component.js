angular
    .module('NarrowItDownApp')
    .component('foundItems', {
        templateUrl: 'src/narrow/founditems.component.html',
        bindings: {
            items: '<foundItems',
            onRemove: '&'
        }
    });