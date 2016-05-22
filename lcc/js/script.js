function superfun() {
  $('#convert').click(function(event) {
    event.preventDefault();
    amount = $('#amount').val();
    from = $('#from').val();
    to = $('#to').val();
    $.ajax({
      url: 'https://openexchangerates.org/api/latest.json?app_id=6de7adf2889e48e1891726444acf778d',
      dataType: 'jsonp',
      success: function(json) {
        console.log(json);
        rate_from = json.rates[from];
        rate_to = json.rates[to];
        console.log(json.timestamp);
        timestamp = json.timestamp;
        console.log(timestamp);
        putnow();
      },
      error: function() {
        $('#result').css({
          'display': 'inherit'
        });
        $('#result_p').text("Looks like you are not connected to Internet, Please do.");
        $('#exchange').css({
          'display': 'none',
        });
        $('#result_timestamp').css({
          'display': 'none',
        });
      }
    });
  });

  var amount = $('#amount').val();
  var from = $('#from').val();
  var to = $('#to').val();
  var rate_from = 0;
  var rate_to = 0;
  var timestamp = 0;
  $('#exchange').click(function(){
    var temp = from;
    from = to;
    to = temp;
    temp = rate_to;
    rate_to = rate_from;
    rate_from = temp;
    putnow();
  });

  function putnow() {
    if (amount && from && to) {
      var temp = (amount / rate_from) * rate_to;
      output_value = Math.round(temp * 100) / 100;
      console.log("output_value");
      console.log(output_value);
      if (output_value) {
        $('#result').css({
          'display': 'inherit'
        });
        $('#exchange').css({
          'display': 'inline-block'
        });
        $('#result_timestamp').css({
          'display': 'inherit'
        });
        var str = String(amount) + " " + String(from) + " = " + String(output_value) + " " + String(to);
        $('#result_p').text(str);
        var date = new Date(timestamp * 1000);
        $('#result_timestamp').text("Exchange Rates collected on : " + date);
      }
    }
    else {
      $('#result').css({
        'display': 'inherit'
      });
      $('#result_p').text("Please select data properly.");
      $('#exchange').css({
        'display': 'none',
      });
      $('#result_timestamp').css({
        'display': 'none',
      });
    }
  }
}
