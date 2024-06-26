(function () {
    'use strict';

    const {
        stash,
        Stash,
        waitForElementId,
        waitForElementClass,
        waitForElementByXpath,
        getElementByXpath,
    } = window.stash7dJx1qP;

    async function openMediaPlayerTask(path) {
        // fixes decodeURI breaking on %'s because they are not encoded
        // const encodedPctPath = path.replace(/%([^\d].)/, "%25$1");
        // decode encoded path but then encode % and # otherwise VLC breaks
        // const encodedPath = decodeURI(encodedPctPath).replaceAll('%', '%25').replaceAll('#', '%23');
        const settings = await stash.getPluginConfig('stashOpenMediaPlayer');
        stash.runPluginTask("stashOpenMediaPlayer", "Open in Media Player", [{ "key": "path", "value": { "str": path } }, { "key": "mediaPlayerPath", "value": { "str": settings?.mediaPlayerPath } }]);
    }
    stash.openMediaPlayerTask = openMediaPlayerTask;
    console.debug("222222")
    // scene filepath open with Media Player
    stash.addEventListener('page:scene', function () {
        console.debug("11111")
        waitForElementClass('scene-file-info', function () {
            const translate_path = ['Path', '路径'];
            var a;
            for (var i = 0; i < translate_path.length; i++) {
                console.debug("33333 "+ i)
                var x_path = "//dt[text()='" + translate_path[i] + "']/following-sibling::dd/a";
                console.debug(x_path)
                a = getElementByXpath(x_path);
                console.debug(a)
                if (a && !a.classList.contains('open-media-player')) {
                    openMediaPlayerTask(a.href);
                    break;
                }
            }
        });
    });

    stash.registerHiddenPluginTask('Stash Open Media Player');
})();
