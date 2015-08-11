$.ajaxSetup({
	timeout:8000,
	error: function(jqXHR, exception) {
		if (jqXHR.status === 0) {
			alert('Not connect.\n Verify Network.');
		} else if (jqXHR.status == 403) {
			url = "403.html";
			window.location.href = url;
		} else if (jqXHR.status == 404) {
			url = "404.html";
			window.location.href = url;
		} else if (jqXHR.status == 500) {
			alert('Internal Server Error [500].');
		} else if(jqXHR.status == 401){
			url = "#login";
			window.location.href = url;
		}else if(jqXHR.status == 408){
			url = "#portada";
			window.location.href = url;
		}else if(jqXHR.status == 200){
			console.log(jqXHR);
		}else if(jqXHR.status == 201){
			console.log(jqXHR);
		}else if(jqXHR.status == 307){
			console.log(jqXHR);
		}else if (exception === 'parsererror') {
			alert('Requested JSON parse failed.');
		} else if (exception === 'timeout') {
			alert('Time out error.');
		} else if (exception === 'abort') {
			alert('Ajax request aborted.');
		} else {
			console.log('Uncaught Error.\n' + jqXHR.responseText);
		}
	},
	complete:function(XMLHttpRequest, textStatus){

	}

	/*
	Cross-Domain
	,
	xhrFields: {
		withCredentials: true
	}*/
});
var AjaxControl = {
	cargarAjax:function(tipo,URL, filtros, cabecera){
		$.support.cors = true;
		return $.ajax({
			contentType: 'application/json',
			mimeType: 'application/json',
			crossDomain: true,
			type:tipo,
			dataType:"json",
			data:filtros,
			global: false,
			url: URL,
			beforeSend: function (xhr) {
				//En caso de que sea necesaria autentificación
   			 	xhr.setRequestHeader ("Authorization", "Bearer "+ cabecera);
			 }
		})
	},
	cargarToken:function(tipo,URL, filtros){
		$.support.cors = true;
		return $.ajax({
			contentType: 'application/x-www-form-urlencoded',
			crossDomain: true,
			type:tipo,
			dataType:"json",
			data:filtros,
			global: false,
			url: URL,
			beforeSend: function (xhr) {
   				//Obetener el Token en caso de que la autorización sea OAuth
   				xhr.setRequestHeader ("Authorization", "Basic NTU3OTM4OWJlMzc3ZWQyOTBiMGQ1NTNlOlVMREI2NjRz");
			}
		})
	},
	cargarURL:function(tipo,URL, filtros){
		return $.ajax({
			type:tipo,
			data:filtros,
			global: false,
			url: URL
		});
	},
	cargarAdjuntos:function(tipo,URL,filtros,content,process){
		$.support.cors = true;
		if(typeof(content)==='undefined') content = "application/json";
		if(typeof(process)==='undefined') process = true;
		return $.ajax({
			contentType: content,
			//mimeType: 'application/json',
			processData: process,
			cache:false,
			crossDomain: true,
			xhr: function(){
				var xhr = new window.XMLHttpRequest();
				//Upload progress
				xhr.upload.addEventListener("progress", function(evt){
					if (evt.lengthComputable) {
						$(".tapa_preload_adjunto").removeClass("oculto");
						var percentComplete = evt.loaded / evt.total;
						$(".tapa_preload_adjunto .progress-bar").attr("style","width:"+(percentComplete*100)+"%");
					}
				}, false);
				//Download progress
				xhr.addEventListener("progress", function(evt){
					if (evt.lengthComputable) {
						var percentComplete = evt.loaded / evt.total;
						//Do something with download progress
						if(percentComplete == 1) {
							$(".tapa_preload_adjunto").addClass("oculto");
						}
					}
				}, false);
				return xhr;
			},
			type:tipo,
			dataType:"json",
			data:filtros,
			global: false,
			url: URL
		});
	}
};
