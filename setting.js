// 車站選項 API
axios
	.get("./staName.json")
	.then(function(res){
		var datas = res.data
		$(function(){
			datas.map(function(data){
				$("#staName1").append('<option value="' + data.staName + '">' + data.staName + '</option>');
				$("#staName2").append('<option value="' + data.staName + '">' + data.staName + '</option>');
				$("#staName3").append('<option value="' + data.staName + '">' + data.staName + '</option>');
				$("#staName4").append('<option value="' + data.staName + '">' + data.staName + '</option>');
			});
		});
	});

// 天數選項 API
axios
	.get("./date.json")
	.then(function(res){
		var datas = res.data
		$(function(){
			datas.map(function(data){
				$("#staDateS1").append('<option value="' + data.trnOpDate + '">' + data.trnOpDate + '</option>');
				$("#staDateE1").append('<option value="' + data.trnOpDate + '">' + data.trnOpDate + '</option>');

				$("#staDateS2").append('<option value="' + data.trnOpDate + '">' + data.trnOpDate + '</option>');
				$("#staDateE2").append('<option value="' + data.trnOpDate + '">' + data.trnOpDate + '</option>');

				$("#staDateS3").append('<option value="' + data.trnOpDate + '">' + data.trnOpDate + '</option>');
				$("#staDateE3").append('<option value="' + data.trnOpDate + '">' + data.trnOpDate + '</option>');

				$("#staDateS4").append('<option value="' + data.trnOpDate + '">' + data.trnOpDate + '</option>');
				$("#staDateE4").append('<option value="' + data.trnOpDate + '">' + data.trnOpDate + '</option>');
			});
		});
	});

// 篩選程序 API
function getInfo1() {
	return new Promise((resolve) => {
		const sta1 = $("#staName1").val();
		const dateS1 = $("#staDateS1").val();
		const dateE1 = $("#staDateE1").val();
		axios.get(`https://taiwan-railway.herokuapp.com/${sta1}/${dateS1}/${dateE1}`).then((response) => {
			resolve(response.data);
			let resp1 = response.data;
			// console.log(resp);

			let labelCount1 = [];
			let data1Count1 = [];
			let data2Count1 = [];

			resp1.map((item1) => {
				let newItem1 = { 
					x: item1["trnOpDate"],
					y1: item1["gateInComingCnt"],
					y2: item1["gateOutGoingCnt"]
				}
				console.log(newItem1["x"]);

				labelCount1.push(newItem1.x);
				data1Count1.push(newItem1.y1);
				data2Count1.push(newItem1.y2 * -1);
			});
			console.log(labelCount1, data1Count1, data2Count1);
			
			// (() => {
			// 	data1.datasets[0].data = data1Count1;
			// 	data1.datasets[1].data = data2Count1;
			// 	data1.update();
			// })();

			var ctx1 = document.getElementById("stiNB");
			const data1 = {
				labels: labelCount1,
				datasets: [{
					label: "進站人數",
					data: data1Count1,
					backgroundColor: "rgba(98, 54, 245, 0.2)",
					borderColor: "rgba(98, 54, 245, 1)",
					borderWidth: 1
				},{
					label: "出站人數",
					data: data2Count1,
					backgroundColor: "rgba(255, 89, 89, 0.2)",
					borderColor: "rgba(255, 89, 89, 1)",
					borderWidth: 1
				}]
			}
			const tooltip1 = {
				yAlign: "bottom",
				titleAlign: "center",
				callbacks: {
					label: (context) => {
						return `${context.dataset.label} ${Math.abs(context.raw)}`
					}
				}
			};
			const config1 = {
				type: "bar",
				data: data1,
				options: {
					// indexAxis: 'y',
					// maintainAspectRatio: false,
					scales: {
						x: {
							stacked: true
						},
						y: {
							stacked: true,
							beginAtZero: true,
							ticks: {
								callback: (value) => {
									// console.log(Math.abs(value));
									return Math.abs(value);
								}
							}
						}
					},
					plugins: {
						tooltip: tooltip1
					}
				}
			}
			const stiNB = new Chart(ctx1, config1);	
		});
	});
}

function getInfo2() {
	return new Promise((resolve) => {
		const date2 = $("#staDateE2").val();
		axios.get(`https://taiwan-railway.herokuapp.com/date/${date2}`).then((response) => {
			resolve(response.data);
			let resp2 = response.data;
			// console.log(resp2);

			let labelCount2 = [];

			let total1 = [];	let total2 = [];	let total3 = [];	let total4 = [];	let total5 = [];
			let total6 = [];	let total7 = []; let total8 = [];	let total9 = [];

			resp2.map((item) => {
				let newItem2 = { 
					x: item["staCode"],
					y: item["gateInComingCnt"] + item["gateOutGoingCnt"]
				}
				// console.log(typeof(newItem2));

				if ( newItem2.x >= 900 && newItem2.x <= 1250 ) {
					total1.push(newItem2.y);
					labelCount2.push("西部幹線-北");
				} else if ( newItem2.x >= 2110 && newItem2.x <= 2260 ) {
					total2.push(newItem2.y)
					labelCount2.push("西部幹線-海");
				} else if ( newItem2.x >= 3140 && newItem2.x <= 3350 ) {
					total3.push(newItem2.y)
					labelCount2.push("西部幹線-山");
				} else if ( newItem2.x >= 3360 && newItem2.x <= 4100 ) {
					total4.push(newItem2.y)
					labelCount2.push("西部幹線-彰雲嘉");
				} else if ( newItem2.x >= 4110 && newItem2.x <= 5110 ) {
					total5.push(newItem2.y)
					labelCount2.push("西部幹線-台南高屏");
				} else if ( newItem2.x >= 5120 && newItem2.x <= 5240 ) {
					total6.push(newItem2.y)
					labelCount2.push("南迴線");
				} else if ( newItem2.x >= 6000 && newItem2.x <= 6070 ) {
					total7.push(newItem2.y)
					labelCount2.push("東部幹線-台東");
				} else if ( newItem2.x >= 6080 && newItem2.x <= 7080 ) {
					total8.push(newItem2.y)
					labelCount2.push("東部幹線-花蓮");
				} else if ( newItem2.x >= 7090 && newItem2.x <= 7360 ) {
					total9.push(newItem2.y)
					labelCount2.push("其他");
				}
			});

			let data1Count2 = [];

			function sumData(arr) {
				let sum = 0;
				arr.forEach(function(e) {
					sum += e
				});
				return sum;
			}

			data1Count2.push(
				sumData(total1), sumData(total2), sumData(total3),
				sumData(total4), sumData(total5), sumData(total6),
				sumData(total7), sumData(total8), sumData(total9)
			);

			console.log(data1Count2);

			const labelCount2_2 = [...new Set(labelCount2)];
			// console.log(labelCount2_2);
			
			var ctx2 = document.getElementById("cityNB");

			// function getRandomColor() {
			// 	let letters = '0123456789ABCDEF'.split('');
			// 	let color = '#';
			// 	for (let i = 0; i < 6; i++ )
			// 		color += letters[Math.floor(Math.random() * 16)];
			// 	return color;
			// }
			// let colors = [];
			// for (let i = 0; i < data1Count2.length ; i++){
			// 	colors.push(getRandomColor());
			// }
			
			const data2 = {
				labels: labelCount2_2,
				datasets: [{
					data: data1Count2,
					backgroundColor: 
					[
						"rgba(184, 216, 216, 1)", "rgba(122, 158, 159, 1)", "rgba(79, 99, 103, 1)",
						"rgba(159, 172, 161, 1)", "rgba(199, 209, 190, 1)", "rgba(238, 245, 219, 1)",
						"rgba(246, 170, 152, 1)", "rgba(250, 133, 119, 1)", "rgba(254, 95, 85, 1)"
					],
					hoverOffset: 4
				}],
			}
			const config2 = {
				type: "doughnut",
				data: data2,
				options: {
					// 搭配 隨機變色 colors 
					// hover: {mode: null},
				}
			}
			const cityNB = new Chart(ctx2, config2);		
		});
	});
}