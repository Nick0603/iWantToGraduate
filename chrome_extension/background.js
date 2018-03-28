chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
    console.log(sender.tab ?
        'from a content script:' + sender.tab.url :
        'from the extension');
    
    if (req.name == 'learned_course_data'){
        window.originTab = sender.tab;
        window.courseData = req.content;
        chrome.tabs.create({
            'url': chrome.extension.getURL('public/index.html'),
            'active':false
        }, function (tab) {
            window.resultTab = tab;
            chrome.tabs.sendMessage(
                originTab.id,
                {
                    resultTabID: tab.id
                }
            )
        });
    } else if (req.name = 'get_course_data'){
        sendResponse(window.courseData);
    }
});