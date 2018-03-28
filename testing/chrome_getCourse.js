var assert = require('assert');


const {
  getBufferCourse,
  getSemesterCourse,
  getSubstitutionCourse,
  passCourseFilter
} = require('../chrome_extension/content.js')

describe('使用者修課資訊', function() {
  describe('取得緩衝區資料( getBufferCourse )', function() {
    // const id_index = 0;
    // const code_index = 1;
    // const name_index = 2;
    // const credit_index = 3;
    // const grade_index = 4;
    // const cate_index = 6;
    it('學期中課程', function() {
      let expect_result = {
        code: 'ME3002304',
        semester: 'buffer',
        name: '工程數學(二)',
        credit: '3',
        grade: '期末評量未填無法顯示',
        cate:''
      }
      let course_arr = "1,ME3002304,工程數學(二),3,期末評量未填無法顯示,,".split(',');
      let result = getBufferCourse(course_arr);
      assert.deepEqual(result,expect_result);
    });  
  });

  describe('取得學習修課資料( getSemesterCourse )', function() {
    // const id_index = 0;
    // const code_index = 2;
    // const semester_index = 1;
    // const name_index = 3;
    // const credit_index = 4;
    // const grade_index = 5;
    // const cate_index = 7;
    it('體育課', function() {
      let expect_result = {
        code: 'CC1528045',
        semester: '1031',
        name: '體育(足球)',
        credit: '0',
        grade: 'A+',
        cate:''
      }
      let course_arr = "1,1031,CC1528045,體育(足球),0,A+,,".split(',');
      let result = getSemesterCourse(course_arr);
      assert.deepEqual(result,expect_result);
    });  
    it('通識課', function() {
      let expect_result = {
        code: 'TCG065301',
        semester: '1052',
        name: '經濟學：市場與趨勢',
        credit: '2',
        grade: 'C',
        cate:'B'
      }
      let course_arr = "61,1052,TCG065301,經濟學：市場與趨勢,2,C,,B".split(',');
      let result = getSemesterCourse(course_arr);
      assert.deepEqual(result,expect_result);
    });
  });

  describe('取得抵免及免修資料( getSubstitutionCourse )', function() {
    // const id_index = 0;
    // const semester_index = 1;
    // const code_index = 3;
    // const name_index = 4;
    // const credit_index = 7;
    // const grade_index = 2;
    it('免修課程', function() {
      let expect_result = {
        code: 'CE1508',
        semester: '1031',
        name: '初階數學(一)',
        credit: '0',
        grade: '免修',
        cate:''
      }
      let course_arr = "1,1031,免修,CE1508,初階數學(一),無,必,".split(',');
      let result = getSubstitutionCourse(course_arr);
      assert.deepEqual(result,expect_result);
    });
    it('抵免課程', function() {
      let expect_result = {
        code: 'CC1001',
        semester: '1031',
        name: '英文字彙與閱讀(一)',
        credit: '2',
        grade: '抵免',
        cate:''
      }
      let course_arr = "1,1031,抵免,CC1001,英文字彙與閱讀(一),無,必,2 學分".split(',');
      let result = getSubstitutionCourse(course_arr);
      assert.deepEqual(result,expect_result);
    });  
  });

  describe('找出通過的課程', function() {
    it('抵免免修', function() {
      
      let test_course_arr = [{
        code: 'CE1508',
        semester: '1031',
        name: '初階數學(一)',
        credit: '0',
        grade: '免修',
        cate:''
      },{
          code: 'CC1001',
          semester: '1031',
          name: '英文字彙與閱讀(一)',
          credit: '2',
          grade: '抵免',
          cate:''
      }];
      let expect_result = test_course_arr;
      let result = test_course_arr.filter(passCourseFilter);
      assert.deepEqual(result,expect_result);
    });
    it('通過未通過課程', function() {
      let test_course_arr = [{
        code: 'ME2008301',
        semester: '1032',
        name: 'Ｃ程式語言',
        credit: '3',
        grade: 'A+',
        cate:''
      },{
          code: 'ME3002303',
          semester: '1042',
          name: '工程數學(二)',
          credit: '2',
          grade: 'E',
          cate:''
      },{
        code: 'ME3002303',
        semester: '1052',
        name: '工程數學(二)',
        credit: '2',
        grade: 'D',
        cate:''
    }];
      let expect_result = [{
        code: 'ME2008301',
        semester: '1032',
        name: 'Ｃ程式語言',
        credit: '3',
        grade: 'A+',
        cate:''
      }];
      let result = test_course_arr.filter(passCourseFilter);
      assert.deepEqual(result,expect_result);
    });
    it('通過二退課程', function() {
      let test_course_arr = [{
        code: '3T5922702',
        semester: '1052',
        name: '犯罪、毒品與人性',
        credit: '3',
        grade: 'A-',
        cate:''
      },{
          code: 'CS3046701',
          semester: '10ˊㄅ',
          name: '人機互動介面設計',
          credit: 'ˇ',
          grade: '二次退選',
          cate:''
      }];
      let expect_result = [{
        code: '3T5922702',
        semester: '1052',
        name: '犯罪、毒品與人性',
        credit: '3',
        grade: 'A-',
        cate:''
      }];
      let result = test_course_arr.filter(passCourseFilter);
      assert.deepEqual(result,expect_result);
    });
  });

});
