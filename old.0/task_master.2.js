$(document).ready(function(){

	var taskDefault = "I need to...";
	var dateDefault = "MM/DD/YY";
	var itemCounter = 0;
	var taskArray = [];

	// New Task Textarea Click Handling
	$("#new_task").click(function(){
		if($("#new_task").val()==taskDefault)// check if initial value
			$(this).val("");					// if it is clear field
	});
	$("#new_task").blur(function(){
		if(!$.trim($("#new_task").val())) // test if empty, if it is
			$(this).val(taskDefault);  // make field initial value

	});

	// Date Field Click Handling
	$("#date").click(function(){
		if($("#date").val()==dateDefault)// check if initial value
			$(this).val("");			// if it is clear field
	});

	$("#date").blur(function(){
		if(!$.trim($("#date").val()))	// test if empty, if it is
			$(this).val(dateDefault);	// make field initial value
	});

	// On Submit
	$("#task_submit").click(function(){

		// Put task into array
		taskArray[itemCounter] = [$("#new_task").val(), $("#date").val()];
// alert(taskArray);
		// Sort array by date
		// taskArray.sort(function())

		// output task array
		outputTaskArray();


		// Set inputs to defaults
		$("#new_task").val(taskDefault);
		$("#date").val(dateDefault);

		itemCounter++;

	});

	// Delete checked items
	$("#task_delete").click(function(){
		// $(this).off('click');
		$("input:checked").each(function(){
			var task_id = $(this).closest(".checkbox").attr('id');
			taskArray.splice(task_id, 1);

			// output task array
			outputTaskArray()		
		});

	});

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

