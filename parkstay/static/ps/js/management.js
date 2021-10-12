var management = {
    var: {
	'csrf_token': null,
	'test': 'test',	   
        'peak_groups_url': '/api/peak_groups/',
        'peak_groups_save_url' : '/api/save_peak_group/',
        'peak_periods_url': '/api/peak_periods/',
        'peak_period_save_url': '/api/save_peak_period/',
        'peak_periods_save_url' : '',
        'peak_period_collapsed_id': null,
        'peak_group_collapsed_id': null,
	'peak_group_id_selection' : null
    },
    load_peak_periods: function(peakgroup_id) {
	        console.log('load_peak_periods');
	        management.var.peak_group_id_selection = peakgroup_id;
                $('#peak-periods-tbody').html('<tr><td colspan=5 align="center"><div class="spinner-border text-primary" role="status"> <span class="visually-hidden">Loading...</span></div></td></tr>');
                $.ajax({
                    url: management.var.peak_periods_url+"?peakgroup_id="+peakgroup_id,
                    method: 'GET',
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (response) {
			var html = '';
                        if (response.length > 0) {
                              for (let i = 0; i < response.length; i++) {
                                  html+= "<tr>";
                                  html+= " <td>"+response[i].id+"</td>";
                                  html+= " <td>"+response[i].start_date+"</td>";
                                  html+= " <td>"+response[i].end_date+"</td>";
                                  html+= " <td class='text-center'>";

                                  if (response[i].active == true) {
                                     html+= '<i style="color: #00f300" class="bi bi-check-circle-fill"></i>';
                                  } else {
                                     html+= '<i style="color: #f30000" class="bi bi-x-circle-fill"></i>';
                                  }

                                  html+= "</td>";
				  html+= "<td align='right'>";
				  var buttondata='{"peakperiod_id": '+response[i].id+'}';
				  html+= "<button type='button' class='btn btn-primary btn-sm peakrow' button-data='"+buttondata+"' >Edit</button>";
				  html+= "</td>";
                                  html+= "</tr>";

                                  // edit collapse start
				  html+= "<tr style='display:none' id='rowcollapse-"+response[i].id+"'>";
				  html+= "<td>";
                                  html+= "&nbsp;";
				  html+= "</td>";
				  html+= "<td>";
                                  html+= '<input type="text" class="form-control bs-datepicker" id="row-start-date-'+response[i].id+'" value="'+response[i].start_date+'">';
				  html+= "</td>";
                                  html+= "<td>";
                                  html+= '<input type="text" class="form-control bs-datepicker" id="row-end-date-'+response[i].id+'" value="'+response[i].end_date+'">';
                                  html+= "</td>";
			          html+= "<td>";
                                  html+= "";
                                  html+= '<select class="form-select" aria-label="" id="row-active-'+response[i].id+'">';
                                  html+= '<option value="true"';

				  if (response[i].active == true) { 
				     html+= ' selected ';
			          }

			          html+= '>Active</option>';
                                  html+= '<option value="false"';
				  if (response[i].active == false) {
                                     html+= ' selected ';
				  }

				  html+= '>Inactive</option>';
                                  html+= '</select>';
                                  html+= "</td>";
				  html+= "<td align='right'>";

				  var buttondata='{"peakperiod_id": '+response[i].id+'}';
                                  html+= '<div class="spinner-border text-primary" role="status" style="display:none" id="peakperiod-loader-'+response[i].id+'">';
                                  html+= '<span class="visually-hidden">Loading...</span>';
                                  html+= '</div>&nbsp;&nbsp;&nbsp;';
                                  html+= "<button type='button' class='btn btn-success btn-sm peaksave' button-data='"+buttondata+"' >Save</button>";
				  html+= "</td>";
				  html+= "</tr>";
				  
				  // edit collapse end

			      }
 
                              $('#peak-periods-tbody').html(html);
                              $( ".peakrow" ).click(function() {
                                         
                                    if (management.var.peak_period_collapsed_id != null) {
			                    $('#rowcollapse-'+management.var.peak_period_collapsed_id).hide();			
				    }


                                    var buttondata = $(this)[0].attributes['button-data'].value;
                                    var buttondata_obj = JSON.parse(buttondata);
                                    $('#rowcollapse-'+buttondata_obj['peakperiod_id']).show();
                                    management.var.peak_period_collapsed_id = buttondata_obj['peakperiod_id'];
                              });

			      $( ".peaksave" ).click(function() {
				        console.log('peaksave');				      
					var buttondata = $(this)[0].attributes['button-data'].value;
				        var buttondata_obj = JSON.parse(buttondata);

				        console.log(buttondata);
				        management.save_peak_period(buttondata_obj);
			      });
		              $('.bs-datepicker').datepicker({"format": "dd/mm/yyyy"});		
                        } else {
                              $('#peak-periods-tbody').html("<tr><td colspan='4' class='text-center'>No results found<td></tr>");
                        }
		       
			console.log(response);
                    },
                    error: function (error) {
		        $('#period-popup-error').html("Error Loading peak periods");
			$('#period-popup-error').show();
			$('#peak-periods-tbody').html('');

                        console.log('Error loading peak periods');
                    },
                });
    },
    load_peak_groups: function() {
	        $('#peak-groups-tbody').html('<tr><td colspan=5 align="center"><div class="spinner-border text-primary" role="status"> <span class="visually-hidden">Loading...</span></div></td></tr>');
	        $('#peakgroup_progress_loader').hide();
	        $("#group-name").prop('disabled', false);
	        $('#peak-status').prop('disabled', false);

                $.ajax({
                    url: management.var.peak_groups_url,
                    method: 'GET',
                    dataType: 'json',
                    contentType: 'application/json',
                    // data: "{}",
                    success: function (response) {
			var html ='';
			if (response.length > 0) { 
                            for (let i = 0; i < response.length; i++) {
                                  html+= "<tr>";
                                  html+= " <td>"+response[i].id+"</td>";
                                  html+= "      <td>"+response[i].name+"</td>";
                                  html+= "      <td>";

			          if (response[i].active == true) {
                                     html+= '        <i style="color: #00f300" class="bi bi-check-circle-fill"></i>';
			          } else {
                                     html+= '        <i style="color: #f30000" class="bi bi-x-circle-fill"></i>';
			          }

                                  html+= "           </td>";
                                  html+= "           <td class='text-end'>";
				  var data_button = '{"id": '+response[i].id+'}';
                                  html+= "          <button type='button' class='btn btn-primary btn-sm' data-bs-backdrop='static' data-keyboard='false' data-bs-toggle='modal' data-bs-target='#ViewPeakPeriodModal' data-button='"+data_button+"' >View Periods</button>";
                                  html+= "                <button class='btn btn-primary btn-sm peakgroup-row' data-button='"+data_button+"' >Edit Group</button>";
                                  html+= "           </td>";
                                  html+= "       </tr>";
                                  
				  // save start
                                  html+= "<tr style='display:none' id='pg-rowcollapse-"+response[i].id+"'>";
                                  html+= "<td>";
                                  html+= "&nbsp;";
                                  html+= "</td>";

                                  html+= "<td>";
                                  html+= '<input type="text" class="form-control" id="row-group-name-'+response[i].id+'" value="'+response[i].name+'">';
                                  html+= "</td>";
                                  html+= "<td>";
                                  html+= "";
                                  html+= '<select class="form-select" aria-label="" id="row-group-active-'+response[i].id+'">';
                                  html+= '<option value="true"';

                                  if (response[i].active == true) {
                                     html+= ' selected ';
                                  }

                                  html+= '>Active</option>';
                                  html+= '<option value="false"';
                                  if (response[i].active == false) {
                                     html+= ' selected ';
                                  }

                                  html+= '>Inactive</option>';
                                  html+= '</select>';
                                  html+= "</td>";
                                  html+= "<td align='right'>";

                                  var buttondata='{"group_id": '+response[i].id+', "action": "save"}';
                                  html+= '<div class="spinner-border text-primary" role="status" style="display:none" id="peakgroup-loader-'+response[i].id+'">';
                                  html+= '<span class="visually-hidden">Loading...</span>';
                                  html+= '</div>&nbsp;&nbsp;&nbsp;';
                                  html+= "<button type='button' class='btn btn-success btn-sm peakgroupsave' button-data='"+buttondata+"' >Save</button>";
                                  html+= "</td>";

                                  // save end
		            }

			    $('#peak-groups-tbody').html(html);

                            $( ".peakgroup-row" ).click(function() {

                                  if (management.var.peak_group_collapsed_id != null) {
                                          $('#pg-rowcollapse-'+management.var.peak_group_collapsed_id).hide();
                                  }

                                  console.log($(this)[0].attributes);
                                  var buttondata = $(this)[0].attributes['data-button'].value;
                                  var buttondata_obj = JSON.parse(buttondata);
                                  $('#pg-rowcollapse-'+buttondata_obj['id']).show();
                                  management.var.peak_group_collapsed_id = buttondata_obj['id'];
                            });

                            $( ".peakgroupsave" ).click(function() {
                                      console.log('peakgroupsave');
                                      var buttondata = $(this)[0].attributes['button-data'].value;
                                      var buttondata_obj = JSON.parse(buttondata);

                                      console.log(buttondata);
                                      management.save_peak_group(buttondata_obj);
                            });

		 	} else {
				$('#peak-groups-tbody').html("<tr><td colspan='4' class='text-center'>No results found<td></tr>");
			}
                    },
                    error: function (error) {
                        console.log('Error loading peak groups');
                    },
                });
    },
    save_peak_period: function(buttondata_obj) {
	 var peakperiod_id = null;
	 var startdate = null;
         var enddate = null;
	 var active = null;
         var action = null;
         var loader_id = '';
	 var start_id = '';

         if (buttondata_obj['action'] == 'create') {
             action ='create';
	     startdate = $('#new-start-date');
	     enddate = $('#new-end-date');
	     active = $('#new-active');
	     loader_id = 'peakperiod-loader-create';
             start_id = 'new-start-date';
	     end_id = 'new-end-date';
	     active_id = 'new-active';
         } else {
             action = 'save';
	     peakperiod_id = buttondata_obj['peakperiod_id'];
             startdate = $('#row-start-date-'+peakperiod_id);
	     enddate = $('#row-end-date-'+peakperiod_id);
	     active = $('#row-active-'+peakperiod_id);
             loader_id = 'peakperiod-loader-'+peakperiod_id;
	     start_id = 'row-start-date-'+peakperiod_id;
	     end_id = 'row-end-date-'+peakperiod_id;
	     active_id = 'row-active-'+peakperiod_id;
         } 

	 var data = {'action' : action, 'period_id': peakperiod_id, 'start_date': startdate.val(), 'end_date' : enddate.val(), 'active' : active.val(), 'peakgroup_id': management.var.peak_group_id_selection};

         $('#period-popup-error').html('');
	 $('#period-popup-error').hide();

         $('#'+loader_id).show();
         $('.peakrow').prop('disabled', true);
         $("#"+start_id).prop('disabled', true);
         $('#'+end_id).prop('disabled', true);
         $('#'+active_id).prop('disabled', true);

         $.ajax({
             url: management.var.peak_period_save_url,
             method: "POST",
             headers: {'X-CSRFToken' : management.var.csrf_token },
             data: JSON.stringify({'payload': data,}),
             contentType: "application/json",
             success: function(data) {
                   $('#'+loader_id).hide();
                   $("#"+start_id).prop('disabled', false);
                   $('#'+end_id).prop('disabled', false);
                   $('#'+active_id).prop('disabled', false);
                   $('.peakrow').prop('disabled',false);
		   $('#period-popup-success').html("Successfully Updated");
		   $('#period-popup-success').show();
		   setTimeout("$('#period-popup-success').fadeOut('slow');",1000);
		   management.load_peak_periods(management.var.peak_group_id_selection);
             },
             error: function(errMsg) {
                   $('#'+loader_id).hide();
                   $("#"+start_id).prop('disabled', false);
                   $('#'+end_id).prop('disabled', false);
                   $('#'+active_id).prop('disabled', false);
                   $('.peakrow').prop('disabled',false);

                   $('#period-popup-error').html(errMsg.responseJSON.message);
                   $('#period-popup-error').show();
                   //management.load_peak_groups();
                   // alert(JSON.stringify(errMsg));
             }
         });
    },
    save_peak_group: function(buttondata_obj) {

             console.log(buttondata_obj)
	     var group_id = null;
             var group_name = null;
	     var peak_status = null;
	     var peakgroup_progress_loader = null;
            
             if (buttondata_obj['action'] == 'create') {
	         group_name = $('#group-name');
                 peak_status = $('#peak-status');
		 peakgroup_progress_loader = $('#peakgroup_progress_loader_create');
	     } else {
		 group_id = buttondata_obj['group_id'];
		 group_name = $('#row-group-name-'+buttondata_obj['group_id']);
		 peak_status = $('#row-group-active-'+buttondata_obj['group_id']);
		 peakgroup_progress_loader = $('#peakgroup-loader-'+group_id);
	     }

             var data = {'action': buttondata_obj['action'], 'group_id': group_id, 'group_name' : group_name.val(),'peak_status': peak_status.val()};

             peakgroup_progress_loader.show();
             $("#group-name").prop('disabled', true);
	     $('#peak-status').prop('disabled', true);
	     $('#group-flat-success').hide();
             $('#group-flat-error').hide();
	     $('#popup-error').hide();
             $.ajax({
                 url: management.var.peak_groups_save_url,
                 method: "POST",  
		 headers: {'X-CSRFToken':management.var.csrf_token},
                 data: JSON.stringify({'payload': data,}),
                 contentType: "application/json",
                 success: function(data){
		       peakgroup_progress_loader.hide();
		       group_name.prop('disabled', false);
		       peak_status.prop('disabled', false);
		       management.load_peak_groups();
                       $('#group-close-modal').click();

		       $('#group-flat-success').html("Successfull");
		       $('#group-flat-success').show();
                       // alert(JSON.stringify(data));
                 },
                 error: function(errMsg) {
		     console.log(errMsg);
	             group_name.prop('disabled', false);
	             peak_status.prop('disabled', false);
		     peakgroup_progress_loader.hide();
                     if (buttondata_obj['action'] == 'save') { 
			  $('#group-flat-error').html(errMsg.responseJSON.message);
                          $('#group-flat-error').show();
                     } else {
		          $('#popup-error').html(errMsg.responseJSON.message);
		          $('#popup-error').show();
		     }

		     management.load_peak_groups();
                     // alert(JSON.stringify(errMsg));
                 }
             });

	     //$('#close-modal').click();
    },	    
    init: function() {
    }
}
management.init();

