(function ($) {

    $.fn.simpleTabs = function (options) {

        const settings = $.extend({
            activeClass: "active",
            animationSpeed: 200,
            defaultTab: null
        }, options);

        return this.each(function () {

            const container = $(this);
            const tabs = container.find(".tab-links li");
            const panels = container.find(".tab-panel");

            panels.hide();

            function activateTab(tabId) {

                if (!$("#" + tabId).length) return;

                tabs.removeClass(settings.activeClass);
                panels.stop(true, true).hide();

                tabs.filter(`[data-tab="${tabId}"]`)
                    .addClass(settings.activeClass);

                $("#" + tabId)
                    .stop(true, true)
                    .fadeIn(settings.animationSpeed);

                window.location.hash = tabId;
            }

            // Click
            tabs.on("click", function () {
                activateTab($(this).data("tab"));
            });

            // ENTER key support
            tabs.on("keydown", function (e) {

                let index = tabs.index(this);

                if (e.key === "Enter") {
                    activateTab($(this).data("tab"));
                }

                if (e.key === "ArrowRight") {
                    index = (index + 1) % tabs.length;
                    tabs.eq(index).focus();
                }

                if (e.key === "ArrowLeft") {
                    index = (index - 1 + tabs.length) % tabs.length;
                    tabs.eq(index).focus();
                }
            });

            // Hash support
            let initialTab = settings.defaultTab;

            if (window.location.hash) {
                const hashTab = window.location.hash.substring(1);
                if ($("#" + hashTab).length) {
                    initialTab = hashTab;
                }
            }

            if (!initialTab) {
                initialTab = tabs.first().data("tab");
            }

            activateTab(initialTab);

        });
    };

})(jQuery);