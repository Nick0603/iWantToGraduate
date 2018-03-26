let getBufferCourse = (course_arr) => {
    const id_index = 0;
    const course_code_index = 1;
    const course_name_index = 2;
    const credit_index = 3;
    const grade_index = 4;
    const cate_index = 6;
    return {
        course_code: course_arr[course_code_index],
        course_semester:'buffer',
        course_name: course_arr[course_name_index],
        credit: course_arr[credit_index],
        grade: course_arr[grade_index],
        cate: course_arr[cate_index]
    }
}

let getSemesterCourse = (course_arr) => {
    const id_index = 0;
    const course_code_index = 2;
    const course_semester_index = 1;
    const course_name_index = 3;
    const credit_index = 4;
    const grade_index = 5;
    const cate_index = 7;
    return {
        course_code: course_arr[course_code_index],
        course_semester: course_arr[course_semester_index],
        course_name: course_arr[course_name_index],
        credit: course_arr[credit_index],
        grade: course_arr[grade_index],
        cate: course_arr[cate_index]
    }
}

let getSubstitutionCourse = (course_arr) => {
    const id_index = 0;
    const course_semester_index = 1;
    const course_code_index = 3;
    const course_name_index = 4;
    const credit_index = 7;
    const grade_index = 2;
    return {
        course_code: course_arr[course_code_index],
        course_semester: course_arr[course_semester_index],
        course_name: course_arr[course_name_index],
        credit: course_arr[credit_index][0],
        grade: course_arr[grade_index]
    }
}

let collectCourseData = (buffer_course_index, semester_course_index, substitution_course_index) => {

    const tbody_arr = document.querySelectorAll('tbody');
    let getCourse = (tbody_arr,index) => {
        let target_tr_arr = tbody_arr[index].querySelectorAll('tr')
        return Object.keys(target_tr_arr).map(key => target_tr_arr[key])
            .map(tr => tr.querySelectorAll('td'))
            .map(tds => Object.keys(tds).map(key => tds[key].innerText))
    }
    const buffer_course = getCourse(tbody_arr, buffer_course_index).map(getBufferCourse);
    const semester_course = getCourse(tbody_arr, semester_course_index).map(getSemesterCourse);
    const substitution_course = getCourse(tbody_arr, substitution_course_index).map(getSubstitutionCourse);
    const total_course = [].concat(buffer_course,semester_course,substitution_course);
    const passed_course = total_course.filter((course)=>{
        grade_level = course.grade[0]
        is_substitution =  course.grade == "免修" || course.grade == "抵免";
        is_pass = 'A'.charCodeAt(0) <= grade_level.charCodeAt(0) &&
                                       grade_level.charCodeAt(0) < 'D'.charCodeAt(0);
        return is_substitution || is_pass;
    });
    return passed_course;
}

let main = ()=>{
    const buffer_course_index = 4;
    const semester_course_index = 5;
    const substitution_course_index = 8;

    let student_no = document.getElementById('studentno').innerText;
    let passed_course = collectCourseData(
        buffer_course_index,
        semester_course_index,
        substitution_course_index
    );
    console.log(passed_course);
    chrome.runtime.sendMessage({
        name: "learned_course_data",
        content:{
            student_no: student_no,
            passed_course: passed_course
        }
    });

    chrome.runtime.onMessage.addListener(request => {
        console.log("Message from the background script:");
        if (request.resultTabID) {
            window.resultTabID = request.resultTabID;
            console.log(window.resultTabID);
        }
    });
}


let title = document.getElementsByTagName('title')[0].innerText;
if (title == '臺灣科技大學學生資訊網站→成績查詢') main();

