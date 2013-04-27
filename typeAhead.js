$('#myTable').find('tbody').empty();
$('#list').empty();

$("#brands").typeahead({
    source: function (query, process) {
        return $.get('data.php', { query: query }, function (data) {
            return process(data);
        }, "json");
    },
    updater:function (item) {
		var isUnique = true;

		$('#myTable').find('tbody').find('tr').each(function() {
			var text = $(this).find('td').text().replace('×','');

			if (item == text) {
				isUnique = false;
			}
		});

		if (isUnique) {
			$('#myTable').find('tbody').append(
				$('<tr>').append(
					$('<td>').text(item)
				).append(
					$('<td>').append(
						$('<a>').addClass("close").attr("href","#").html("&times;")
					)
				)
			);
		}
    }
});

$('#submitButton').click(function() {
	$('#output').show();
	$('#list').empty();

	$('#myTable').find('tbody').find('tr').each(function() {
		var text = $(this).find('td').text().replace('×','');
		$('#list').append(text).append("<br/>");

	});

	$('#myTable').find('tbody').empty();
});


$(document).on("click", ".close", function(){
    $(this).parent().parent().remove();
});