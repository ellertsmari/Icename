function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            name = sParameterName[1];
            console.log("name er:");
            console.log(name);
            return name;
            //return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
        }
    }
};
/*
$.ajax({
  url: "http://apis.is/names/males/",
  context: document.body
}).done(function(men) {
	$.ajax({
	  url: "http://apis.is/names/females/",
	  context: document.body
	}).done(function(women) {
    */
      var firstnames = unescape(GetURLParameter("first")).split("+");
      console.log("nofnin eru:");
      console.log(firstnames);
      var nameList = (GetURLParameter("Gender") === "Male") ? men.results : women.results;
      var fathersName = GetURLParameter("fathers")
      console.log(fathersName);
      var results1 = "";
      for (var i = 0; i < firstnames.length; i++) {
        results1 += checkName(firstnames[i], nameList) + " ";
      }
      var results2 = checkName(fathersName, men.results);
      //TODO: need to make this work for mothers name too, make it more fluent and transparent in the code
      var results = results1 + " " + getLastName(results2, GetURLParameter("Gender") === "Male");
      $("#results").html(results);

/*
	});

});*/
var checkName=function(name, names){
  /*testing remove before production:
  console.log("nafnid er: "+ GetURLParameter("first"));
  var stafrofid = "aábcdðeéfghiíjklmnoópqrstuúvxyýzþæö";
  var counter = 0;
  var endsWithArray = [];
  var endsWithObject = {};
  var namesThatEndWithArray = [];
  for (var j = 0; j < stafrofid.length; j++) {
    namesThatEndWithArray = [];
    counter = 0;
    for (var i = 0; i < names.length; i++) {
        if(names[i][names[i].length-1] === stafrofid[j]){
          namesThatEndWithArray.push(names[i]);
          counter++;
        }
    }
    endsWithArray.push({
      'letter': stafrofid[j],
      'count' : counter,
      'names' : namesThatEndWithArray
    })
  }
  console.log(endsWithArray);
	testing ends*/
  name = name.charAt(0).toUpperCase() + name.slice(1);
  console.log("upper name is: " + name);
  var exeptionEN = ['T', 'C', 'O', 'I', 'Y', 'd', 'o', 'i', 'w', 'X', 'W'];
	var exeptionIS = ['Þ', 'K', 'Ó', 'Í', 'J', 'ð', 'ó', 'í', 'v', 'K', 'V'];
	var firstname = name;
	var startsWith = [];
	var similarity = [];
	var IceName = [];
	//change Th to Þ
	if(firstname[0]=='T' && firstname[1]=='h'){
		firstname = 'Þ' + firstname.slice(2,firstname.length);
	}
	//change Ph to F
	if(firstname[0]=='P' && firstname[1]=='h'){
		firstname = 'F' + firstname.slice(2,firstname.length);
	}
	//names that start with same letter:
	for (var i = 0; i < names.length; i++) {
		if(names[i][0]==firstname[0]){
			startsWith.push(names[i]);
		}
		for (var j = 0; j < exeptionEN.length; j++) {
			if(names[i][0]==exeptionIS[j] && firstname[0]==exeptionEN[j]){
				startsWith.push(names[i]);
			}
		};

	};
	//find similar names
	for (var i = 0; i < startsWith.length; i++) {
		similarity[i] = 0;
		similarity[i] = similarity[i] + 10 - Math.abs(startsWith[i].length-firstname.length)*3; //betra að nöfnin séu svipað löng
		for (var j = 0; j < startsWith[i].length; j++) {
			for (var k = 0; k < firstname.length; k++) {
				if(firstname[k]==startsWith[i][j]){
					similarity[i] = similarity[i] + 10 - Math.abs(k-j)*3;
				}
				for (var l = 0; l < exeptionEN.length; l++) {
					if(firstname[k]==exeptionEN[l] && startsWith[i][j]==exeptionIS[l]){
						similarity[i] = similarity[i] + 10 - Math.abs(k-j)*3;
					}
				};

			};

		};
	};
  console.log(startsWith);
  var results = startsWith[similarity.indexOf(Math.max.apply(Math, similarity))]
	console.log(results);
  console.log($("#results"))
  return results;
}
