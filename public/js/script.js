let selector = $("#day-select");
selector.on('change', function() {
    hideDays();
    let day = $(`[data-id="${this.value}"]`);
    day.removeClass("hidden");
});

function hideDays() {
    $(".day").each(function() {
        $(this).addClass("hidden");
    })
};