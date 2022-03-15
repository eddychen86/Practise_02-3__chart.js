// 車站選項 API
axios
	.get("./staName.json")
	.then(function(res){
		const datas = res.data
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
		const datas = res.data
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

// 幹線選項 API
axios
	.get("./trLine.json")
	.then(function(res){
		const datas = res.data
		$(function(){
			datas.map(function(data){
				$("#trLine2").append('<option value="' + data.trLine + '">' + data.trLine + '</option>');
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
			const resp1 = response.data;
			// console.log(resp);

			const labelCount1 = [];
			const data1Count1 = [];
			const data2Count1 = [];

			resp1.map((item1) => {
				const newItem1 = { 
					x: item1["trnOpDate"],
					y1: item1["gateInComingCnt"],
					y2: item1["gateOutGoingCnt"]
				}
				// console.log(newItem1["x"]);

				labelCount1.push(newItem1.x);
				data1Count1.push(newItem1.y1);
				data2Count1.push(newItem1.y2 * -1);
			});
			// console.log(labelCount1, data1Count1, data2Count1);
			
			const ctx1 = document.getElementById("myChart1");
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
			const myChart1 = new Chart(ctx1, config1);
		});
	});
}

function getInfo2() {
	return new Promise((resolve) => {
		const trLine2 = $("#trLine2").val();
		// if ( trLine2 === "西部幹線-北" ) {
		// 	return 
		// } else 
		// if ( trLine2 === "西部幹線-海" ) {

		// } else 
		// if ( trLine2 === "西部幹線-山" ) {

		// } else 
		// if ( trLine2 === "西部幹線-彰雲嘉" ) {

		// } else 
		// if ( trLine2 === "西部幹線-台南高屏" ) {

		// } else 
		// if ( trLine2 === "南迴線" ) {

		// } else 
		// if ( trLine2 === "東部幹線-台東" ) {

		// } else 
		// if ( trLine2 === "東部幹線-花蓮" ) {

		// } else 
		// if ( trLine2 === "東部幹線-宜蘭&宜蘭縣" ) {

		// } else 
		// if ( trLine2 === "其他" ) {

		// }
		const dateS2 = $("#staDateS2").val();
		const dateE2 = $("#staDateE2").val();
		axios.get(`https://taiwan-railway.herokuapp.com/八堵/920/${dateS2}/${dateE2}`).then((response) => {
			resolve(response.data);
			const resp2 = response.data;
			// console.log(resp);

			const labelCount2 = [];
			const data1Count2 = [];
			const data2Count2 = [];

			resp2.map((item2) => {
				let newItem2 = { 
					x: item2["trnOpDate"],
					y1: item2["gateInComingCnt"],
					y2: item2["gateOutGoingCnt"]
				}
				// console.log(newItem1["x"]);

				labelCount2.push(newItem2.x);
				data1Count2.push(newItem2.y1);
				data2Count2.push(newItem2.y2);
			});
			// console.log(labelCount1, data1Count1, data2Count1);
			
			const ctx2 = document.getElementById("myChart2");
			const data2 = {
				labels: labelCount2,
				datasets: [{
					label: "進站人數",
					data: data1Count2,
					fill: true,
					backgroundColor: "rgba(98, 54, 245, 0.2)",
					borderColor: "rgba(98, 54, 245)",
					tension: 0.1
				},{
					label: "出站人數",
					data: data2Count2,
					fill: true,
					backgroundColor: "rgba(255, 89, 89, 0.2)",
					borderColor: "rgba(255, 89, 89)",
					tension: 0.1
				}]
			}
			const config2 = {
				type: "line",
				data: data2
			}
			const myChart2 = new Chart(ctx2, config2);
		});
	});
}

function getInfo3() {
	return new Promise((resolve) => {
		const sta3 = $("#staName3").val();
		const dateS3 = $("#staDateS3").val();
		axios.get(`https://taiwan-railway.herokuapp.com/${sta3}/${dateS3}`).then((response) => {
			resolve(response.data);
			const resp3 = response.data;

			const labelCount3 = [];
			const data1Count3 = [];			

			resp3.map((item3) => {
				const newItem3 = { 
					x: item3["trnOpDate"],
					y1: item3["gateInComingCnt"],
					y2: item3["gateOutGoingCnt"]
				}

				labelCount3.push(newItem3.x);
				data1Count3.push(newItem3.y1, newItem3.y2);
			});
			console.log(data1Count3);
			
			const ctx3 = document.getElementById("myChart3");
			const data3 = {
				labels: ["進站人數", "出站人數"],
				datasets: [{
					label: "進站人數",
					data: data1Count3,
					backgroundColor: ["rgba(98, 54, 245)", "rgba(255, 89, 89)"],
				}]
			}
			const config3 = {
				type: "pie",
				data: data3,
				options: {
					aspectRatio: 1.5,
					plugins: {
						legend: {
							position: "right"
						}
					}
				}
			}
			const myChart3 = new Chart(ctx3, config3);
		});
	});
}

function getInfo4() {
	return new Promise((resolve) => {
		const date4 = $("#staDateE4").val();
		axios.get(`https://taiwan-railway.herokuapp.com/date/${date4}`).then((response) => {
			resolve(response.data);
			const resp4 = response.data;
			// console.log(resp2);

			const labelCount4 = [];

			const total1 = [];	const total2 = [];	const total3 = [];	const total4 = [];	const total5 = [];
			const total6 = [];	const total7 = []; const total8 = [];	const total9 = []; const total10 = [];

			resp4.map((item) => {
				const newItem4 = { 
					x: item["staCode"],
					y: item["gateInComingCnt"] + item["gateOutGoingCnt"]
				}
				
				// 參考：https://www.fly.idv.tw/
				if ( newItem4.x >= 900 && newItem4.x <= 1250 ) {
					total1.push(newItem4.y);
					labelCount4.push("西部幹線-北");
				} else if ( newItem4.x >= 2110 && newItem4.x <= 2260 ) {
					total2.push(newItem4.y)
					labelCount4.push("西部幹線-海");
				} else if ( newItem4.x >= 3140 && newItem4.x <= 3350 ) {
					total3.push(newItem4.y)
					labelCount4.push("西部幹線-山");
				} else if ( newItem4.x >= 3360 && newItem4.x <= 4100 ) {
					total4.push(newItem4.y)
					labelCount4.push("西部幹線-彰雲嘉");
				} else if ( newItem4.x >= 4110 && newItem4.x <= 5110 ) {
					total5.push(newItem4.y)
					labelCount4.push("西部幹線-台南高屏");
				} else if ( newItem4.x >= 5120 && newItem4.x <= 5240 ) {
					total6.push(newItem4.y)
					labelCount4.push("南迴線");
				} else if ( newItem4.x >= 6000 && newItem4.x <= 6070 ) {
					total7.push(newItem4.y)
					labelCount4.push("東部幹線-台東");
				} else if ( newItem4.x >= 6080 && newItem4.x <= 7080 ) {
					total8.push(newItem4.y)
					labelCount4.push("東部幹線-花蓮");
				} else if ( newItem4.x >= 7090 && newItem4.x <= 7360 ) {
					total9.push(newItem4.y)
					labelCount4.push("東部幹線-宜蘭&宜蘭縣");
				} else if ( newItem4.x >= 7361 && newItem4.x <= 7390 ) {
					total10.push(newItem4.y)
					labelCount4.push("其他");
				}
			});

			const data1Count4 = [];

			function sumData(arr) {
				let sum = 0;
				arr.forEach(function(e) {
					sum += e
				});
				return sum;
			}

			data1Count4.push(
				sumData(total1), sumData(total2), sumData(total3),
				sumData(total4), sumData(total5), sumData(total6),
				sumData(total7), sumData(total8), sumData(total9),
				sumData(total10)
			);

			// console.log(data1Count2);

			const labelCount4_2 = [...new Set(labelCount4)];
			// console.log(labelCount2_2);
			
			const ctx4 = document.getElementById("myChart4");

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
			
			const data4 = {
				labels: labelCount4_2,
				datasets: [{
					data: data1Count4,
					backgroundColor: 
					[
						"rgba(184, 216, 216)", "rgba(122, 158, 159)", "rgba(79, 99, 103)",
						"rgba(159, 172, 161)", "rgba(199, 209, 190)", "rgba(238, 245, 219)",
						"rgba(246, 170, 152)", "rgba(250, 133, 119)", "rgba(254, 95, 85)",
						"rgba(204, 232, 204)"
					],
					hoverOffset: 4
				}],
			}
			const config4 = {
				type: "doughnut",
				data: data4,
				options: {
					// 搭配 隨機變色 colors 
					// hover: {mode: null},
					aspectRatio: 1.5,
					plugins: {
						legend: {
							position: "right"
						}
					}
				}
			}
			const myChart4 = new Chart(ctx4, config4);		
		});
	});
}