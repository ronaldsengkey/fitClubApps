// const e = require("express");

var urlService = 'http://149.129.241.18:8888/ronaldSengkey/fitClub/api/v1';
// var urlService = 'http://192.168.1.12:8888/ronaldSengkey/fitClub/api/v1';
var fieldTextInput = '<input type="text" class="form-control fieldText">';
var fieldEmailInput = '<input type="email" class="form-control fieldEmail">';
var fieldPswdInput = '<input type="password" class="form-control fieldPswd">';
var fieldSelect = '<select class="form-control select2"></select>';
var target, uri, dom, data, userId, userName, userRole = '';
var backBtn = '<button type="button" id="backBtn" data-target="index" style="position:fixed;right:7%;bottom:5%;" class="btn bg-blue btn-circle-lg waves-effect waves-circle waves-float">' +
	'<i class="material-icons">keyboard_arrow_left</i>' +
	'</button>';
$(function () {
	if ($('#loginPage').length > 0) {
		validate('login');
		// $('body').append(backBtn);
		// controlBackBtn('registration');
	}
	if ($('#registerPage').length > 0) {
		// $('body').append(backBtn);
		// controlBackBtn('index');
		validate();
		select2Activated();
	}
	if ($('#classHistoryPage').length > 0) {
		validate('memberClass');
	}
	if ($('#classListPage').length > 0) {
		validate('classList');
	}
	if ($('#profilePage').length > 0) {
		validate('profile');
	}
	if ($('#membershipPage').length > 0) {
		validate('membership');
	}
	if ($('#classDetailPage').length > 0) {
		validate('classDetail');
	}
	if ($('#classSchedulePage').length > 0) {
		validate('classSchedule');
	}
	if ($('#bodyProgressPage').length > 0) {
		validate('bodyProgress');
	}
	if($('#classAvailableListPage').length > 0){
		validate('availableClass');
	}
	var dataProfilee = parseUserData();
	if (dataProfilee) {
		console.log('profile data', dataProfilee);
	}
	setTimeout(function () {
		$('.page-loader-wrapper').fadeOut(400, "linear");
	}, 300);
});


function logout() {
	localStorage.removeItem("dataProfile");
	window.location.href = "index.html";
}

function notification(cat, T) {
	if (cat == 200) {
		console.log('masuk cat 200');
		swal({
			title: "Proccess success!",
			text: T,
			icon: "success",
			button: "Thanks!",
		});
		$(".sweet-alert").css({
			'background-color': '#2196F3'
		});
	} else if (cat == 500) {
		swal({
			title: "Proccess failed!",
			text: T,
			icon: "error",
			button: "Thanks!",
		});
		$(".sweet-alert").css({
			'background-color': '#F44336'
		});
	}

	$(".sweet-alert").find('p').css({
		'color': '#fff'
	});
	$(".sweet-alert").find('h2').css({
		'color': '#fff'
	});
	$(".sweet-alert").find('button').css({
		'background': '#03A9F4'
	});
}

function controlBackBtn(page) {
	$('#backBtn').attr('data-target', page);
}

function loadingActive() {
	$('.page-loader-wrapper').fadeIn(400, "linear");
}

function loadingDeactive() {
	$('.page-loader-wrapper').fadeOut(400, "linear");
}

function getDetailData() {
	let searchParams = new URLSearchParams(window.location.search);
	let param = searchParams.get('id');
	getData('classDetail', param);
}

function validate(param) {
	let dataProfile = JSON.parse(localStorage.getItem("dataProfile"));
	if (dataProfile) {
		switch (param) {
			case "availableClass":
				getData('availableClass');
				break;
			case "login":
				window.location = "classHistory.html";
				break;
			case "memberClass":
				getData("memberClass");
				break;
			case 'classList':
				getData('classList');
				break;
			case 'profile':
				appendProfile(dataProfile)
				break;
			case 'membership':
				appendMembershipData(dataProfile);
				break;
			case 'classDetail':
				getDetailData();
				break;
			case 'classSchedule':
				getScheduleData();
				break;
			case 'bodyProgress':
				getBodyProgress();
				break;
				// default:
				// 	window.location = "classHistory.html";
				// 	break;
		}
		// if($('#profilePage').length > 0 ){
		// $('#userName').html(userName);
		// $('#name').val(userName);
		// $('.wrapImg').attr('data-id',userId);
		// $('#updateProfile').attr('data-id',userId);
		// $('#bodyProgress').attr('data-id',userId);
		// $('#uploadImgProfile').val(userId);
		// var param = {'token':12345678,'filter':'getProfile','dataId':userId};
		// postData('read','user',param);
		// }if($('#classHistoryPage').length > 0){
		// 	$('#userName').html(dataProfile.name);
		// 	$('#name').val(dataProfile.name);
		// 	var param = {'dataId':dataProfile.memberId};
		// postData('read','classHistory',param);
		// }
		// else{ getPage("",'profile',''); }
	} else {
		// window.location = "index.html";
		// logout();
		// 	if($('#indexPage').length == 0 && $('#registerIntroPage').length == 0 && $('#registerPage').length == 0 && $('#loginPage').length == 0){
		// 		getPage("","index",'');
		// 	}
	}
}

function getBodyProgress() {
	getData('bodyProgress');
}

function getScheduleData() {
	getData('classSchedule');
}

function callModal(content) {
	$('#largeModal').modal({
		backdrop: 'static',
		keyboard: false,
		show: true
	});
	$('.modal-body').empty('');
	$('.modal-body').html('');
	$('.modal-body').html(content);
}




function getData(param, extraParam) {
	let profile = JSON.parse(localStorage.getItem('dataProfile'));
	let directory = urlService;
	switch (param) {
		case "memberClass":
			//FIXME 
			// directory += '/class/memberClass/' + profile.data.accessToken;
			directory += '/class/memberClass/history' + profile.data.accessToken;
			break;
		case 'classList':
			directory += '/class/' + profile.data.accessToken;
			break;
		case 'classDetail':
			directory += '/class/detail/' + profile.data.accessToken + '/' + extraParam;
			$('#className').html('');
			$('#classDesc').html('');
			break;
		case 'classSchedule':
			console.log('masuk get data schedule');
			directory += '/coach/schedule/' + profile.data.accessToken;
			$('#classScheduleData').empty();
			$('#classScheduleData').html('');
			break;
		case 'bodyProgress':
			$('.chartProg').empty();
			$('.chartProg').html('');
			directory += '/member/personalRecord/' + profile.data.accessToken;
			break;
		case "availableClass":
			directory += '/class/memberClass/' + profile.data.accessToken;
			break;
	}
	if(param == 'bodyProgress'){
		$.ajax({
			url: urlService + '/member/personalRecord/category/' + profile.data.accessToken,
			crossDomain: true,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*",
				"Cache-Control": "no-cache",
				"Accept-Encoding": "gzip, deflate",
				"Connection": "keep-alive",
			},
			timeout: 8000,
			tryCount: 0,
			retryLimit: 3,
			success: function (callback) {
				console.log('kembalian get pr cat', callback);
				switch (callback.responseCode) {
					case "200":
						callback.data.forEach(domPrCat);
						break;
					default:
						notification(500,'empty data');
						break;
				}
			}
		})
	}
	$.ajax({
		url: directory,
		crossDomain: true,
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Accept": "*/*",
			"Cache-Control": "no-cache",
			"Accept-Encoding": "gzip, deflate",
			"Connection": "keep-alive",
		},
		timeout: 8000,
		tryCount: 0,
		retryLimit: 3,
		success: function (callback) {
			console.log('kembalian', callback);
			switch (callback.responseCode) {
				case "500":
					this.tryCount++;
					if (this.tryCount < this.retryLimit) {
						$.ajax(this);
					} else if (this.tryCount == this.retryLimit) {
						let empty500 = '<h3 class="h3 mb-5">Server Error</h3>'
						$('#classContent').append(empty500);
					}
					break;
				case "401":
					logout();
					break;
				case "404":
					if (param == 'memberClass') {
						appendEmptyClass();
					} else if (param == 'bodyProgress') {
						appendEmptyChart();
						$.getScript("assets/js/pages/charts/chartjs.js", function (data, textStatus, jqxhr) {});
					} else if (param == 'availableClass') {
						appendEmptyAvailableClass();
					} else {
						alert(callback.responseMessage);
					}
					break;
				case "200":
					if (param == 'classList') {
						callback.data.forEach(appendClassData);
					} else if (param == 'classDetail') {
						domClassDetail(callback.data[0]);
					} else if (param == 'classSchedule') {
						callback.data.forEach(domClassSchedule);
					} else if (param == 'bodyProgress') {
						// callback.data.forEach(domBodyProgressChart);
						defineChart(callback.data);
						// console.log('i dont know what to do yet');
						appendEmptyChart();
						$.getScript("assets/js/pages/charts/chartjs.js", function (data, textStatus, jqxhr) {});
					} else if (param == 'availableClass') {
						callback.data.forEach(appendClassAvailableData);
					} 
					break;
			}
		}
	})
}

var splitCategory = [];
function defineChart(data){
	data.forEach(domBodyProgressChart);

	var uniqueNames = [];
	$.each(splitCategory, function(i, el){
		if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
	});
	console.log('unique cat',uniqueNames);
	// defineCategory(uniqueNames,data);
}

// function defineCategory(categoryData,data){
	
// 	data.forEach(element => {
// 		if(categoryData.includes(element.categoryName)){

// 		}
// 	});
// }

function domBodyProgressChart(data,index){
	splitCategory.push(data.categoryName);
}

function domPrCat(data,index){
	let htmlPr = '<option value='+data.id+'>'+data.categoryName+'</option>';
	$('#categories').append(htmlPr);
}

function appendEmptyChart() {
	let htmlChart = '<canvas id="line_chart" class="animated flipInX" height="188"></canvas>';
	$('.chartProg').append(htmlChart);
}

function domClassDetail(result) {
	$('#className').html(result.className);
	$('#classDesc').html(result.descript);
	$('#schedule_id').val(result.scheduleId);
	let coachHtml = '<div class="row mb-3">'+
	'<div class="col-lg-3 col-3">'+
		'<div class="news">'+
			'<div class="label">'+
				'<img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(20)-mini.jpg" style="width:110%;" class="rounded-circle z-depth-1-half">'+
			'</div>'+
		'</div>'+
	'</div>'+
	'<div class="col-lg-9 col-9">'+
		'<div class="excerpt mb-0">'+
				'<div class="brief">'+
				'<a class="blue-text">'+result.coachName+'</a>'+
				'<div class="date">3 days ago</div>'+
				'</div>'+
				'<div class="feed-footer">'+
				'<span>'+
					'<a>47</a>'+
				'</span>'+
				'<a class="thumbs" data-toggle="tooltip" data-placement="top" title="" data-original-title="I like it">'+
					'<i class="fas fa-thumbs-up"></i>'+
				'</a>'+
				'<a class="thumbs" data-toggle="tooltip" data-placement="top" title="" data-original-title="I dont like it">'+
					'<i class="fas fa-thumbs-down"></i>'+
				'</a>'+
				'</div>'+
			'</div>'+
	'</div>'+
	'</div>';
	$('#coachListDetail').append(coachHtml);
}

function domClassSchedule(data, index) {
	let schedHtml = '<div class="card card-cascade wider">' +
		'<div class="card-body card-body-cascade text-center">' +
		'<div class="row">' +
		'<div class="col-8">' +
		'<div class="news" style="border-right:solid 1px #ddd;padding-left:3%;">' +
		'<div class="excerpt">' +
		'<div class="brief">' +
		'<h5 class="blue-text">' + data.class_name + '</h5></div>' +
		'<div class="feed-footer">' +
		'<div>' + data.coach_name + '</div>' +
		'<a class="like">' +
		'</a></div></div></div></div>' +
		'<div class="col-4">' +
		'<h4 class="h4 text-default">' + data.class_start_time + '</h4>' +
		'<a class="btn-floating btn-sm purple-gradient waves-effect waves-light text-white" onclick="toClassDetail(' + data.class_id + ')"><i class="fas fa-check"></i></a>' +
		'<a class="btn-floating btn-sm peach-gradient waves-effect waves-light text-white"><i class="fas fa-times"></i></a>' +
		'<h4 class="h4 text-default">' + data.class_end_time + '</h4>' +
		'</div>' +
		'</div>' +
		'</div></div><div class="clearfix"></div><br/>';
	$('#classScheduleData').append(schedHtml);
}

function appendEmptyClass() {
	let html = '<h3 class="h3 mb-5">Oopss !,<br> You are not join any class</h3>' +
		'<div class="clearfix"></div>' +
		'<button type="button" class="text-white btn purple-gradient btn-md btn-block btn-floating" data-uri="view" data-filter="listClass" data-target="listClass">Join Class Now</button>';
	$('#classContent').append(html);
}

function appendEmptyAvailableClass(){
	let html = '<h3 class="h3 mb-5">Oopss !,<br> Empty available class</h3>' +
		'<div class="clearfix"></div>' +
		'<button type="button" class="text-white btn purple-gradient btn-md btn-block btn-floating" data-uri="view" data-filter="goToClassMembership" data-target="goToClassMembership">Join as a Member now!</button>';
	$('#classAvailableListData').append(html);
}

function toClassDetail(id) {
	// let profileData = parseUserData();
	// let data = {'token' : profileData.data.accessToken,'classId' : id};
	// postData('','detailClass',data);
	window.location.href = "classDetail.html?id=" + id;
}

function appendClassAvailableData(data, index) {
	let searchPlaceholder = '<div class="md-form input-group col-12" style="margin-top:-30px;">'+
		'<input type="text" class="form-control text-white text-center availableClassSearch" placeholder="Looking for ?"'+
			'style="font-size:1.50em;font-weight:500" aria-describedby="material-addon2">'+
		'<div class="input-group-append">'+
			'<span class="input-group-text md-addon" id="material-addon2">'+
				'<i class="fas fa-pencil-alt text-white"></i></span>'+
		'</div>'+
	'</div>';
	let html = '<div class="card card-cascade wider classAvailableeList mb-3" onclick="toClassDetail(' + data.id + ')" data-id=' + data.id + ' data-class="' + data.name + '">' +
		'<div class="card-body card-body-cascade text-center">' +
		'<div class="row"><div class="col-8">' +
		'<div class="news" style="border-right:solid 1px #ddd;padding-left:3%;">' +
		'<div class="excerpt"><div class="brief"><h5 class="blue-text">' + data.name + '</h5></div>' +
		'</div>' +
		'</div>'
	'</div>' +
	'<div class="col-4">' +
	'<h3 class="h3 text-default">07.00</h3>' +
	'<button type="button" class="text-white btn purple-gradient btn-md btn-block btn-floating" data-target="classDetail" data-filter="classDetail" data-uri="read">Join</button>' +
	'</div>' +
	'</div>' +
	'</div>' +
	'</div>';
	$('#searchPlace').append(searchPlaceholder);
	$('#classAvailableListData').append(html);
}

function appendClassData(data, index) {

	let html = '<div class="card card-cascade wider classList mb-3" onclick="toClassDetail(' + data.id + ')" data-id=' + data.id + ' data-class="' + data.name + '">' +
		'<div class="card-body card-body-cascade text-center">' +
		'<div class="row"><div class="col-8">' +
		'<div class="news" style="border-right:solid 1px #ddd;padding-left:3%;">' +
		'<div class="excerpt"><div class="brief"><h5 class="blue-text">' + data.name + '</h5></div>' +
		'</div>' +
		'</div>'
	'</div>' +
	'<div class="col-4">' +
	'<h3 class="h3 text-default">07.00</h3>' +
	'<button type="button" class="text-white btn purple-gradient btn-md btn-block btn-floating" data-target="classDetail" data-filter="classDetail" data-uri="read">Join</button>' +
	'</div>' +
	'</div>' +
	'</div>' +
	'</div>';
	$('#classListData').append(html);
}

function postData(uri, target, dd) {
	loadingActive();
	if (target == 'login') {
		$.ajax({
			url: urlService + '/' + target,
			type: "POST",
			data: JSON.stringify(dd),
			timeout: 5000,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			success: function (callback) {
				switch (callback.responseCode) {
					case "200":
						notification(200, "Login success");
						break;
				}
				loadingDeactive();
				localStorage.setItem("dataProfile", JSON.stringify(callback));
				window.location.href = 'classHistory.html';
			},
			error: function () {
				loadingDeactive();
				notification(500, "Cannot login, please try again");
			}
		});
	} else if (target == 'classHistory') {
		$.ajax({
			url: urlService + '/class/history' + dd.dataId,
			type: "GET",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			success: function (callback) {
				loadingDeactive();
				console.log(callback)
			},
			error: function () {
				loadingDeactive();
			}
		});
	} else if (target == 'joinMember') {
		$.ajax({
			url: urlService + '/member/join',
			type: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			data: JSON.stringify(dd),
			success: function (callback) {
				loadingDeactive();
				switch (callback.responseCode) {
					case "200":
						notification(200, "Success join membership");
						window.location.href = "paymentMethod.html";
						break;
					default:
						alert('msih failed',callback);
						// window.location.href = "paymentMethod.html";
						break;
				}
			},
			error: function () {
				loadingDeactive();
			}
		});
	} else if (target == 'classJoin') {
		$.ajax({
			url: urlService + '/member/act',
			type: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			data: JSON.stringify(dd),
			timeout: 7000,
			success: function (callback) {
				loadingDeactive();
				console.log('class join callback',callback);
				switch (callback.responseCode) {
					case "200":
						notification(200, "Success join class");
						window.location.href="classSchedule.html";
						break;
					default:
						notification(500, "failed join class" + callback.responseMessage);
						break;
				}
			},
			error: function () {
				loadingDeactive();
			}
		});
	} else if (target == 'bodyProgress') {
		let profile = JSON.parse(localStorage.getItem('dataProfile'));
		$.ajax({
			url: urlService + '/member/personalRecord/' + profile.data.accessToken,
			type: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			data: JSON.stringify(dd),
			timeout: 7000,
			success: function (callback) {
				loadingDeactive();
				console.log('body progress',callback);
				switch (callback.responseCode) {
					case "200":
						notification(200, "Success create body progress record");
						window.location.href="bodyProgress.html";
						break;
					default:
						notification(500, "failed create body progress record" + callback.responseMessage);
						break;
				}
			},
			error: function () {
				loadingDeactive();
			}
		});
	} else {
		let link = "";
		switch (data.filter) {
			case "memberRegister":
				link = urlService + "/register"
				break;
		}
		$.ajax({
			url: link,
			crossDomain: true,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "*/*",
				"Cache-Control": "no-cache",
				"Host": "localhost:8888",
			},
			timeout: 7000,
			data: JSON.stringify(dd),
			success: function (callback) {
				loadingDeactive();
				// var json = JSON.parse(callback);
				// console.log("check json ==>", json)
				// console.log(dd.filter);
				if (dd.filter == 'resendCode' || dd.filter == 'memberRegister' || dd.filter == 'trainerRegister') {
					console.log(callback);
					switch (callback.responseCode) {
						case "200":
							let content = '<input type="text" class="form-control" id="otpCode">' +
								"<b><small style='color:#fff;'>Your verification code has been send in your email address, Please check your email, and verify your account</small></b>"
							callModal(content);

							console.log(callback)
							// alert();	
							break;
						case "406":
							alert(callback.responseMessage);
							break;
					}
					// if(callback.response == 200){
					// 	notification(json.response,"Please check your inbox mail, to have your verification code");
					// 	getPage('.container-wrap','verification',json.dataId);
					// }else{
					// 	notification(json.response,json.reason);
					// }
				} else if (dd.filter == 'confirmCode') {
					$.each($(json), function (i) {
						localStorage.setItem("userId", json[i].id);
						localStorage.setItem("userName", json[i].name);
					});
					window.location.href = 'profile.html';
				} else if (dd.filter == 'profileUser') {
					$('#imgProfile').submit();
				} else if (dd.filter == 'getProfile') {
					var gc = '';
					$.each($(json), function (i) {
						if (json[i].gender == 1) {
							gc = '<option value="' + json[i].gender + '">Male</option>' +
								'<option value="2">Female</option>';
						} else {
							gc = '<option value="' + json[i].gender + '">Female</option>' +
								'<option value="1">Male</option>';
						}
						$('#gender').empty();
						$('#gender').append(gc);
						$('#phone').val(json[i].phone);
						$('#address').val(json[i].address);
						$('#dvPreview').attr("src", json[i].imgProfile).css({
							'width': '90px',
							'height': '90px'
						});
						console.log(json);
					});
					if ($('#name').val() != '' && $('#gender option:selected').val() != '' &&
						$('#phone').val() != '' && $('#address').val() != '') {
						$('#updateProfile').remove();
						$('#skipNav').find('span').html("Let's Go");
					}
					if ($('#classHistoryPage').length > 0) {
						$.each($(json), function (i) {
							$('#userName').html(json[i].name);
							$('#imgUser').attr("src", json[i].imgProfile).css({
								'width': '90px',
								'height': '90px'
							});
						});
					}
				}
				setTimeout(function () {
					if ($(".sweet-alert").length > 0) {
						swal.close();
					}
				}, 950);
			},
			error: function () {
				loadingDeactive();
			}
		});

	}
}

function appendToBody(page, toDo) {
	if (toDo !== '' && toDo !== undefined && toDo !== null) {
		// $("body").load(page, function(responseData){
		// 	toDo();
		// })
		window.location.href = page;
		$('#classListPage').ready(function () {
			alert('woe onok ga');
			toDo();
		})
	}
}

function select2Activated() {
	$(".select2").select2({
		placeholder: 'Select Here'
	});
	$(".tags").select2({
		tags: true,
		tokenSeparators: [','],
		placeholder: 'Select Here'
	});
	$('.select2').css({
		"width": "100%"
	});
}

function getPageWithData(target, toDo) {

	$.ajax({
		url: target + '.html',
		success: function (response) {
			document.documentElement.innerHTML = '';
			$('html').html();
			$('html').html(response);
			// $(location).attr('href', url);
			setTimeout(() => {
				if (toDo !== '' && toDo !== undefined && toDo !== null) {
					toDo();
				}
			}, 500);

		}
	});
	// $(location).attr('href', target+'.html');
	// console.log('after load');
	// if(toDo !== '' && toDo !== undefined && toDo !== null){
	// 	console.log('after load agi');
	// 	toDo();
	// }
}

function getPage(dom, target, param) {
	if (dom != '') {
		$.ajax({
			url: target + '.html',
			success: function (response) {
				$(dom).empty();
				$(dom).html();
				$(dom).html(response);
				if (target == 'forgotPassword') {
					controlBackBtn('login');
				}
				if (target == 'verification') {
					$('.container-wrap').css({
						'margin-top': '60%'
					});
					$('#resendCode').attr('data-id', param);
					$('#confirmCode').attr('data-id', param);
					controlBackBtn('login');
				}
				loadingDeactive();
			}
		});
	} else {
		window.location.href = target + '.html';
	}
}

function dataTablleActivated() {
	$('.dataTable').dataTable();
}