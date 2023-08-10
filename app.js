'use strict';

function FruitManager() {
    this.currItem = { item: null, data: {} };
    this.biggestId = -1;
}

FruitManager.prototype.handleItemListFilter = function() {
    const filter = $('.search-input').val().toUpperCase();
    
    $('.item-div').each(function() {
        const name = $(this).find('.item-name, .item-family').text().toUpperCase();
        $(this).toggle(name.includes(filter));
    });
};

FruitManager.prototype.handleItemClick = function(e) {      
    const item = $(e.currentTarget).closest('.item-div');
    const data = item.data('data');

    this.currItem = { item, data };

    $('.fruit-name-input, .fruit-family-input').each(function() {
        const inputName = $(this).attr('class').split('-')[2];
        $(this).val(data[inputName]);
    });
};

FruitManager.prototype.resetInputFields = function() {
    $('.fruit-name-input, .fruit-family-input').val('');
    this.currItem = { item: null, data: {} };
};

FruitManager.prototype.handleItemSave = function() {
    const fruitNameInput = $('.fruit-name-input');
    const fruitFamilyInput = $('.fruit-family-input');

    if (!fruitNameInput.val()) {
        alert('Fruit Name cannot be empty.');
        return;
    }

    if (!fruitFamilyInput.val()) {
        alert('Fruit Family cannot be empty.');
        return;
    }

    const ct = $('.item-div0');
    const fruitList = $('.fruit-list');

    if (!this.currItem.data.id) {
        this.biggestId += 1;

        const data = {
            id: this.biggestId,
            name: fruitNameInput.val(),
            family: fruitFamilyInput.val(),
        };

        const c2 = ct.clone()
            .removeClass('item-div0')
            .addClass('item-div')
            .data('data', data);

        c2.find('.item-name').text(data.name);
        c2.find('.item-family').text(data.family);

        this.currItem = { item: c2, data: data };
        
        fruitList.prepend(c2);
    } else {
        this.currItem.data.name = fruitNameInput.val();
        this.currItem.data.family = fruitFamilyInput.val();

        this.currItem.item.find('.item-name').text(this.currItem.data.name);
        this.currItem.item.find('.item-family').text(this.currItem.data.family);
        this.currItem.item.data('data', this.currItem.data);
    }
};

FruitManager.prototype.handleItemRemove = function(e) {
    const item = $(e.currentTarget).closest('.item-div');
    
    this.resetInputFields();
    
    item.fadeOut(100, () => {
        item.remove();    
    });
};

FruitManager.prototype.init = function() {
    const self = this;

    $.getJSON('data.json')
        .done(function(data) {
            const fruitList = $('.fruit-list');
            fruitList.empty();
            const ct = $('.item-div0');

            $.each(data, function(_, item) {
                self.biggestId = Math.max(self.biggestId, item.id);

                const c2 = ct.clone()
                    .removeClass('item-div0')
                    .addClass('item-div')
                    .data('data', item);

                c2.find('.item-name').text(item.name);
                c2.find('.item-family').text(item.family);

                fruitList.append(c2);
            });

            fruitList.on('click', '.item-data', self.handleItemClick.bind(self));
            fruitList.on('click', '.item-delete', self.handleItemRemove.bind(self));
        })
        .fail(function() {
            alert('An error has occurred.');
        });

    $('.search-input').on('keyup', function() {
        self.handleItemListFilter();
    });

    $('.save-input-btn').on('click', function() {
        self.handleItemSave();
    });

    $('.clean-input-btn').on('click', function() {
        self.resetInputFields();
    });

    self.resetInputFields();
    $('.search-input').val('');
};

$(() => {
    const fruitManager = new FruitManager();
    fruitManager.init();
});
