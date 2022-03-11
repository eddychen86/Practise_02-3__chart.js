// 車站選項 API
axios
	.get("./staName.json")
	.then(function(res){
		var datas = res.data
		$(function(){
			datas.map(function(data){
				$("#staName").append('<option value="' + data.staName + '">' + data.staName + '</option>');
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
				$("#staDateS").append('<option value="' + data.trnOpDate + '">' + data.trnOpDate + '</option>');
				$("#staDateE").append('<option value="' + data.trnOpDate + '">' + data.trnOpDate + '</option>');
			});
		});
	});

// 篩選程序 API
function getInfo() {
	return new Promise((resolve) => {
		const sta = $("#staName").val();
		const dateS = $("#staDateS").val();
		const dateE = $("#staDateE").val();
		axios.get(`https://taiwan-railway.herokuapp.com/${sta}/${dateS}/${dateE}`).then((response) => {
			resolve(response.data);
			let resp = response.data;
			// console.log(resp);

			let labelCount = [];
			let data1Count = [];
			let data2Count = [];

			resp.map((item) => {
				let newItem = { 
					x: item["trnOpDate"],
					y1: item["gateInComingCnt"],
					y2: item["gateOutGoingCnt"]
				}
				console.log(newItem["x"]);

				labelCount.push(newItem.x);
				data1Count.push(newItem.y1);
				data2Count.push(newItem.y2 * -1);
			});
			console.log(labelCount, data1Count, data2Count);
			
			var ctx1 = document.getElementById("stiNB");
			const data1 = {
				labels: labelCount,
				datasets: [{
					label: "進站人數",
					data: data1Count,
					backgroundColor: "rgba(98, 54, 245, 0.2)",
					borderColor: "rgba(98, 54, 245, 1)",
					borderWidth: 1
				},{
					label: "出站人數",
					data: data2Count,
					backgroundColor: "rgba(255, 89, 89, 0.2)",
					borderColor: "rgba(255, 89, 89, 1)",
					borderWidth: 1
				}]
			}
			const tooltip = {
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
						tooltip: tooltip
					}
				}
			}
			const stiNB = new Chart(ctx1, config1);		
		});
	});
}