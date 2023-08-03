'use strict';

function fruit () { };

fruit.listFiltering = () => {
    var input, filter, li, name, family, i, txtValue_1, txtValue_2;
    input = $('.search-input');
    filter = input.val().toUpperCase();
    li = $('.item-div');

    for (i = 0; i < li.length; i++) {
        name = li[i].querySelectorAll('a.col-name')[0];
        family = li[i].querySelectorAll('a.col-family')[0];

        txtValue_1 = name.textContent || name.innerText;
        txtValue_2 = family.textContent || family.innerText;

        if (txtValue_1.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else if (txtValue_2.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}

fruit.init = () => {
    var c0, ct, c2;

    c0 = $('.live-div');

    $.getJSON("data.json", function(d){
        var il = $('.fruit-list');
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

    $('.search-input').keyup(() => {
        fruit.listFiltering()
    })
};

//--------------------------------------//
//        Page Startup Function         //
//--------------------------------------//
$(function () {
    fruit.init();
});
