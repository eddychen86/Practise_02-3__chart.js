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
			let data1Count2 = [];

			resp2.map((item2) => {
				let newItem2 = { 
					x: item2["staCode"],
					y1: item2["gateInComingCnt"],
					y2: item2["gateOutGoingCnt"]
				}
				console.log(typeof(newItem2.x));

				// labelCount2.push()
				
				// while ( newItem2.x >= 900 && newItem2.x <= 1250 ) {
				// 	labelCount2.push("西部幹線")
				// 	console.log(labelCount2);
				// }

				if ( newItem2.x >= 900 && newItem2.x <= 1250 ) {
					labelCount2.push("西部幹線-北")
				} else if ( newItem2.x >= 2110 && newItem2.x <= 2260 ) {
					labelCount2.push("西部幹線-海")
				} else if ( newItem2.x >= 3140 && newItem2.x <= 3350 ) {
					labelCount2.push("西部幹線-山")
				} else if ( newItem2.x >= 3360 && newItem2.x <= 4100 ) {
					labelCount2.push("西部幹線-彰雲嘉")
				} else if ( newItem2.x >= 4110 && newItem2.x <= 5110 ) {
					labelCount2.push("西部幹線-台南高屏")
				} else if ( newItem2.x >= 5120 && newItem2.x <= 5240 ) {
					labelCount2.push("南迴線")
				} else if ( newItem2.x >= 6000 && newItem2.x <= 6070 ) {
					labelCount2.push("東部幹線-台東")
				} else if ( newItem2.x >= 6080 && newItem2.x <= 7080 ) {
					labelCount2.push("東部幹線-花蓮")
				} else if ( newItem2.x >= 7090 && newItem2.x <= 7360 ) {
					labelCount2.push("其他")
				}

				// labelCount2.push(newItem2x);
				data1Count2.push(newItem2.y1 + newItem2.y2);
			});
			console.log(labelCount2);
			
			var ctx2 = document.getElementById("cityNB");

			// 問題：顏色會因耍的移入而改變
			// 參考：https://stackoverflow.com/questions/25594478/different-color-for-each-bar-in-a-bar-chart-chartjs
			function getRandomColor() {
				let letters = '0123456789ABCDEF'.split('');
				let color = '#';
				for (let i = 0; i < 6; i++ )
					color += letters[Math.floor(Math.random() * 16)];
				return color;
			}
			let colors = [];
			for (let i = 0; i < data1Count2.length ; i++){
				colors.push(getRandomColor());
			}
			
			const data2 = {
				labels: labelCount2,
				datasets: [{
					data: data1Count2,
					backgroundColor: colors,
					borderWidth: 1
				}],
			}
			const config2 = {
				type: "doughnut",
				data: data2,
				options: {
					hover: {mode: null},
				}
			}
			const cityNB = new Chart(ctx2, config2);		
		});
	});
}