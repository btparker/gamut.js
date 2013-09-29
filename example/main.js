$(function(){
	var $target = $('#drop-zone');

	function dropZone($target, onDrop){
		$target.
			bind('dragover', function(){
				$target.addClass( 'drag-over' );
				return false;
			}).
			bind("dragend", function () {
				$target.removeClass( 'drag-over' );
				return false;
			}).
			bind("mouseout", function () {
				$target.removeClass( 'drag-over' );
				return false;
			}).
			bind("drop", function(event) {
				var file = event.originalEvent.dataTransfer.files[0];

				event.stopPropagation();
				event.preventDefault();

				$target.removeClass( 'drag-over' );

				var droppedImage = new Image();
				var fileReader = new FileReader();
				
				fileReader.onload = function (event) {
					droppedImage.src = event.target.result;
					$target.html(droppedImage);
				};
				
				fileReader.readAsDataURL(file);

				onDrop(file);
			});
	}

	dropZone($target, function(file){

		gamut(file).onComplete(function(data){
			$('#image-data').show();
			$('#red').css('width',data.average.red+'%');
			$('#green').css('width',data.average.green+'%');
			$('#blue').css('width',data.average.blue+'%');
			$('#brightness').css('width',data.average.brightness+'%');
		});

	});

	function onComplete(data){
		var time = Date.now();
		var diffImage = new Image();
		diffImage.src = data.getImageDataUrl();

		$('#image-diff').html(diffImage);

		$(diffImage).click(function(){
			window.open(diffImage.src, '_blank');
		});

		$('#buttons').show();

		if(data.misMatchPercentage == 0){
			$('#thesame').show();
			$('#diff-results').hide();
		} else {
			$('#mismatch').text(data.misMatchPercentage);
			if(!data.isSameDimensions){
				$('#differentdimensions').show();
			} else {
				$('#differentdimensions').hide();
			}
			$('#diff-results').show();
			$('#thesame').hide();
		}
	}

	var file1;
	var file2;
	var gamutControl;
	dropZone($('#dropzone1'), function(file){
		console.log(file);
		file1 = file;
		if(file2){
			gamutControl = gamut(file).compareTo(file2).onComplete(onComplete);
		}
	});
	dropZone($('#dropzone2'), function(file){
		file2 = file;
		if(file1){
			gamutControl = gamut(file).compareTo(file1).onComplete(onComplete);
		}
	});


	var buttons = $('#raw, #colors, #antialising');

	buttons.click(function(){
		var $this = $(this);

		buttons.removeClass('active');
		$this.addClass('active');

		if($this.is('#raw')){
			gamutControl.ignoreNothing();
		}
		else
		if($this.is('#colors')){
			gamutControl.ignoreColors();
		}
		else
		if($this.is('#antialising')){
			gamutControl.ignoreAntialiasing();
		}
	});

});