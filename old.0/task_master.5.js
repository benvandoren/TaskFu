$(document).ready(function(){

	var taskDefault = "I need to...";
	var dateDefault = "MM/DD/YY";
	var itemCounter = 0;
	var taskArray = [];

	// New Task Textarea Click Handling
	//
	//
	$("#new_task").click(function(){
		if($("#new_task").val()==taskDefault)// check if initial value
			$(this).val("");					// if it is clear field
	});
	$("#new_task").blur(function(){
		if(!$.trim($("#new_task").val())) // test if empty, if it is
			$(this).val(taskDefault);  // make field initial value

	});

	// Date Field Click Handling
	//
	//
	$("#date").click(function(){
		if($("#date").val()==dateDefault)// check if initial value
			$(this).val("");			// if it is clear field
	});

	$("#date").blur(function(){
		if(!$.trim($("#date").val()))	// test if empty, if it is
			$(this).val(dateDefault);	// make field initial value
	});

	// On Submit Click Handler
	//
	//
	$("#task_submit").click(function(){
		//get input
		var task = $("#new_task").val();
		var date = $("#date").val();

		// clear error/success messages
		if($("#task_err").length)
			$("#task_err").remove();

		if($("#date_err").length)
			$("#date_err").remove();

		if($("#success").length)
			$("#success").remove();		

		// validate input
		var chk_date = /(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/\d{2}$/ 

		if(!(task==taskDefault))
		{
			if(chk_date.test(date))
			{
				// Put task into array
				taskArray[taskArray.length] = [task, date];	

				// Sort array by date
				taskArray.sort(function(a, b){
					// convert to date
					var dateA = new Date(a[1]);
					var dateB = new Date(b[1]);

					//compare
					if(dateA < dateB)
					{
						return -1;
					} else if(dateA > dateB)
					{
						return 1;
					} else 
					{
						return 0;
					}

				});

				// output task array
				outputTaskArray();

				// Set inputs to defaults
				$("#new_task").val(taskDefault);
				$("#date").val(dateDefault);

				// success message
				$(".input").after("<div id='success'>"
					+ "Task successfully added to list!" + "</div>");

			} else // error with date
			{
				$("#date").after("<div id='date_err'>"
					+ "Date is invalid or not proper form: (MM/DD/YY)" + "</div>");
			}
		} else // error with task
		{
			$("#new_task").after("<div id='task_err'>"
				+ "Task Cannot Be Blank" + "</div>");
		}


	});

	// Delete checked items
	//
	//
	$("#task_delete").click(function(){
		// $("#task_delete").unbind('click'); // doesn't help
		$("input:checked").each(function(){
			var task_id = $(this).closest(".checkbox").attr('id');
			taskArray.splice(task_id, 1);
			
			// output task array
			outputTaskArray()		
		});

	});

	// Output the list
	//
	//
	function outputTaskArray()
	{
		// Clear task data
		$("#task_data").empty();

		//Output array
		for(var i = 0; i < taskArray.length; i++)
		{
			$("#task_data").prepend("<div class='row'>"
				+ "<div class='cell checkbox' id='" + i + "'>"
				+ "<input type='checkbox'></input></div>"
				+ "<div class='cell task'>" + taskArray[i][0] + "</div>" 
				+ "<div class='cell date'>" + taskArray[i][1] + "</div>");		
		}			
	}




});

