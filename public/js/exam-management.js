(function ($){
    $('.add-question').click(function(event){
        localStorage.clear();
        let made = $(this).data('made');
        let soluong = $(this).data('data-soluong');
        event.preventDefault();
        localStorage.setItem(made,soluong);
    })
  })(jQuery);
