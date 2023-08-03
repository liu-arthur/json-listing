'use strict';

function fruit() { }

fruit.curr_c = null;
fruit.curr_o = null;

fruit.getContainer = function () { return $('.live-div'); };
fruit.getItemList = function () { return $('.fruit-list'); };

function myFunction() {
    var input, filter, li, a, i, txtValue;
    input = $('.search-input');
    filter = input.val().toUpperCase();
    li = $('.item-div');

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName('a')[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}

fruit.init = function () {
    var l, c0, ct, c2, u, p;

    c0 = fruit.getContainer()

    $.getJSON("data.json", function(d){
        var il = c0.find('.fruit-list');
        il.html('');
        ct = $('.item-div0');

        $.each(d, function (i, item) {
            c2 = ct.clone();
            c2.removeClass('item-div0').addClass('item-div');
            c2.data('data', item);
            c2.find('.col-name').text(item.name);
            c2.find('.col-family').text(item.family);
            il.append(c2);
        });
    }).fail(function(){
        console.log("An error has occurred.");
    });

    $('.search-input').keyup(function(){
        myFunction()
    })
};

//--------------------------------------//
//        Page Startup Function         //
//--------------------------------------//
$(function () {
    fruit.init();
});
