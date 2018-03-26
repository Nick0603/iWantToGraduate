console.log("created");

chrome.runtime.sendMessage({
        name: "get_course_data"
    },function(res){
        console.log(res)
    }
);