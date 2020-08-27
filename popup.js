chrome.runtime.sendMessage({type: 'get-settings'}, (settings_) => {
  // watching channel setting
  let watchingCheckbox = document.querySelector("#update-watching");
  watchingCheckbox.checked = settings_.updateWatchingChannel;
  watchingCheckbox.onchange = e => {
    chrome.runtime.sendMessage({
      type: 'set-setting',
      key: 'updateWatchingChannel',
      value: watchingCheckbox.checked
    })
  }

  // replace twitch chat setting
  let replaceCheckbox = document.querySelector('#replace-twitch');
  replaceCheckbox.checked = settings_.replaceTwitchChat;

  // Require updateWatchingChannel setting if replacing chat
  if (settings_.replaceTwitchChat) {
    watchingCheckbox.checked = true;
    watchingCheckbox.disabled = true;
    chrome.runtime.sendMessage({
      type: 'set-setting',
      key: 'updateWatchingChannel',
      value: true,
    });
  }

  replaceCheckbox.onchange = e => {
    if (replaceCheckbox.checked) {
      watchingCheckbox.checked = true;
      chrome.runtime.sendMessage({
        type: 'set-setting',
        key: 'updateWatchingChannel',
        value: true,
      });
    }
    watchingCheckbox.disabled = replaceCheckbox.checked;

    chrome.runtime.sendMessage({
      type: 'set-setting',
      key: 'replaceTwitchChat',
      value: replaceCheckbox.checked,
    });
  };
});
