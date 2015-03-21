// task_master.10.js
// Author: Ben Van Doren
// Date: 3/19/15
// Course: CSC3950
// Description: This javascript utilizes JQuery to dynamically listen 
// for click events within the page. On these events it will assemble 
// and validate user form input. It will save the input as a "Task" that
// has some description and an associated date. Tasks are sorted by date.
// The user can also remove tasks.

// This function runs when the HTML document is fully loaded. It is the 
// entire program.
// Precondition: Run within a static HTML document
// Postcondition: HTML items have been dynamically created.
$(document).ready(function(){

	var taskDefault = "I need to..."; // default task description field
	var dateDefault = "MM/DD/YY"; // default date field text
	var taskArray = []; // holds the task items

	// This function handles click events on the task description field.
	// When clicked it will clear the field if the field is still the
	// default value. Otherwise nothing.
	// Preconditions: #new_task is a textarea for the task description.
	// Postconditions: Value is blanked unless user has input their own
	// text.
	$("#new_task").click(function(){
		if($("#new_task").val()==taskDefault)// check if initial value
			$(this).val("");					// if it is clear field
	});

	// This function handles the task description field when it loses focus.
	// If the user has left the field blank it will return to the default
	// value.
	// Preconditions: #new_task is a textarea for the task description.
	// Postconditions: If blank field returns to the default state.
	$("#new_task").blur(function(){
		if(!$.trim($("#new_task").val())) // test if empty, if it is
			$(this).val(taskDefault);  // make field initial value
	});

	// This function handles click events on the date field.
	// When clicked it will clear the field if the field is still the
	// default value. Otherwise nothing.
	// Preconditions: #date is a text field
	// Postconditions: Field is blanked unless user has already input text.
	$("#date").click(function(){
		if($("#date").val()==dateDefault)// check if initial value
			$(this).val("");			// if it is clear field
	});

	// This function handles date field on loss of focus.
	// When it loses focus it will return to the default value if the user
	// has not input any text.
	// Preconditions: #date is a text field
	// Postconditions: If blank field returns to the default state.
	$("#date").blur(function(){
		if(!$.trim($("#date").val()))	// test if empty, if it is
			$(this).val(dateDefault);	// make field initial value
	});

	// This function handles the submit button click event. When clicked
	// it will parse the form fields, validate, and then save input to
	// an array. 
	// Preconditions: #task_submit is a button.
	// Postconditions: Input validated and saved to array, success message 
	// given, and display is updated. If input doesn't validate error messages
	// are displayed.
	$("#task_submit").click(function(){
		//get input
		var task = $("#new_task").val();
		var date = $("#date").val();

		// clear error/success messages
		clearMessages();	

		// Date Regex string: MM/DD/YY
		var chk_date = /(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/\d{2}$/ 

		if(!(task==taskDefault)) // See if task field is default value
		{
			if(chk_date.test(date)) // Validate date for correct form
			{
				// Put task into array
				taskArray[taskArray.length] = [task, date];	

				// This function sorts the task array by date.
				// Preconditions: Array of items.
				// Postconditions: Task array is sorted by Year, Month, and Day
				taskArray.sort(function(a, b){
					// convert to date type
					var dateA = new Date(a[1]);
					var dateB = new Date(b[1]);

					// Compare two items and
					// determine which one is greater.
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

				// success message:
				$(".input").after("<div id='success'>"
					+ "Task successfully added to list!" + "</div>");

			} else // error with date
			{		// Error message inserted into HTML file:
				$("#date").after("<div id='date_err'>"
					+ "Date is invalid or not proper form: (MM/DD/YY)" + "</div>");
			}
		} else // error with task
		{		// Error message inserted into HTML file:
			$("#new_task").after("<div id='task_err'>"
				+ "Task Cannot Be Blank" + "</div>");
		}


	});

	// This function handles click events for the select all checkbox. 
	// If the box is checked all associated checkboxes are checked too.
	// If the box is unchecked all associated checkboxes are unchecked too.
	// Preconditions: #select_all is a checkbox.
	// Postconditions: All .databox items are either checked or unchecked.
	$("#select_all").click(function(){ 
		// Checks / Unchecks .checkbox items based on state of #select_all
		$(".checkbox input:checkbox").prop("checked", $(this).prop("checked"));
	});


	// This function handles the button to delete selected tasks. It removes
	// all tasks that are selected when clicked and updates the display.
	// Preconditions: #task_delete is a button.
	// Postconditions: Checked items of .databox class are removed.
	$("#task_delete").click(function(){
		// For each checked .databox item gather the item id and 
		// use as index to remove corresponding array item:
		$(".databox:input:checkbox:checked").each(function(){
			var task_id = $(this).closest(".checkbox").attr('id'); // Finds item id
			taskArray.splice(task_id, 1);//Removes the item from array.
			
			// output task array
			outputTaskArray()		

			// clear error/success messages
			clearMessages();


			// success message:
			$(".right").after("<div id='success'>"
				+ "Successfully Removed" + "</div>");
		});
		// set select all box to unchecked
		$(".checkbox input:checkbox").prop("checked",false);
	});

	// This function outputs the array to the HTML document.
	// Preconditions: taskArray is an array, #task_data is a div tag.
	// Postconditions: #task_data content is replaced with HTML displaying
	// the information contained in taskArray. And each item is given a
	// checkbox with unique id.
	function outputTaskArray()
	{
		// Clear task data
		$("#task_data").empty();

		//Output array
		for(var i = 0; i < taskArray.length; i++)
		{
			$("#task_data").prepend("<div class='row'>"
				+ "<div class='cell checkbox' id='" + i + "'>" // unique id
				+ "<input class='databox' type='checkbox'/></div>"
				+ "<div class='cell task'>" + taskArray[i][0] + "</div>" // task description
				+ "<div class='cell date'>" + taskArray[i][1] + "</div>"); // date
		}			
	}

	// This function will remove any error or success messages that exist
	// on the page.
	// Preconditions: #task_err, #date_err, #success may or may not exist.
	// Postconditions: #task_err, #date_err, #success do not exist.
	function clearMessages()
	{
		// clear task error message if it exists
		if($("#task_err").length)
			$("#task_err").remove();

		// clear data error message if it exists
		if($("#date_err").length)
			$("#date_err").remove();

		// clear success message if it exists
		if($("#success").length)
			$("#success").remove();			
	}

});

