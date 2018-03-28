 const operater = {
    getBufferCourse:(course_arr) => {
        const id_index = 0;
        const code_index = 1;
        const name_index = 2;
        const credit_index = 3;
        const grade_index = 4;
        const cate_index = 6;
        return {
            code: course_arr[code_index] || '',
            semester:'buffer',
            name: course_arr[name_index] || '',
            credit: course_arr[credit_index] || '',
            grade: course_arr[grade_index] || '',
            cate: course_arr[cate_index] || ''
        }
    },
    getSemesterCourse:(course_arr) => {
        const id_index = 0;
        const code_index = 2;
        const semester_index = 1;
        const name_index = 3;
        const credit_index = 4;
        const grade_index = 5;
        const cate_index = 7;
        return {
            code: course_arr[code_index] || '',
            semester: course_arr[semester_index] || '',
            name: course_arr[name_index] || '',
            credit: course_arr[credit_index] || '',
            grade: course_arr[grade_index] || '',
            cate: course_arr[cate_index] || ''
        }
    },getSubstitutionCourse:(course_arr) => {
        const id_index = 0;
        const semester_index = 1;
        const code_index = 3;
        const name_index = 4;
        const credit_index = 7;
        const grade_index = 2;
        return {
            code: course_arr[code_index] || '',
            semester: course_arr[semester_index] || '',
            name: course_arr[name_index] || '',
            credit: course_arr[credit_index][0] || '0',
            grade: course_arr[grade_index] || '',
            cate: ''
        }
    },
    getCourse : (tbody_arr,index) => {
        let target_tr_arr = tbody_arr[index].querySelectorAll('tr')
        return Object.keys(target_tr_arr).map(key => target_tr_arr[key])
            .map(tr => tr.querySelectorAll('td'))
            .map(tds => Object.keys(tds).map(key => tds[key].innerText))
    },
    getTotalCourse :(tbody_arr,course_index) => {
        let buffer_course       = operater.getCourse(tbody_arr, course_index.buffer_course_index).map(operater.getBufferCourse);
        let semester_course     = operater.getCourse(tbody_arr, course_index.semester_course_index).map(operater.getSemesterCourse);
        let substitution_course = operater.getCourse(tbody_arr, course_index.substitution_course_index).map(operater.getSubstitutionCourse);
        return [].concat(buffer_course,semester_course,substitution_course);
    },
    passCourseFilter:(course)=>{
        grade_level = course.grade[0]
        is_substitution =  course.grade == "免修" || course.grade == "抵免";
        is_pass = 'A'.charCodeAt(0) <= grade_level.charCodeAt(0) &&
                                       grade_level.charCodeAt(0) < 'D'.charCodeAt(0);
        return is_substitution || is_pass;
    },
    collectPassedCourse : (course_index) => {
        let tbody_arr = document.querySelectorAll('tbody');
        let total_course = operater.getTotalCourse(tbody_arr,course_index);
        let passed_course = total_course.filter(operater.passCourseFilter);
        return passed_course;
    }
}

const {collectPassedCourse} = operater;
let main = () => {
    let student_no = document.getElementById('studentno').innerText;
    let passed_course = collectPassedCourse({
        buffer_course_index,
        semester_course_index,
        substitution_course_index
    });
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

const buffer_course_index = 4;
const semester_course_index = 5;
const substitution_course_index = 8;

// If we're running under Node, 
if(typeof exports !== 'undefined') {
    module.exports = operater;
}else{
    let title = document.getElementsByTagName('title')[0].innerText;
    if (title == '臺灣科技大學學生資訊網站→成績查詢') main();
}


