var getLastName = function(name, male){
  var last2 = name[name.length-2]+name[name.length-1];
  var last1 = last2[1];
  console.log(last1);
  var nameMinus1 = name.slice(0, name.length-1);
  var nameMinus2 = name.slice(0, name.length-2);
  var genetive = "";
  //get the genetive of the word (not pure genetive because of names exception):
  switch (last1) {
    case 'a':
      if(name === "Sturla")
        genetive =  "sturlu"
      else if(name === "Joshua" || name === "Jósúa")
        genetive =  name;
      genetive =  name+"sar";
      break;
    case 'i':
      genetive =  nameMinus1+"a";
      break;
    case 'í':
      genetive =  name;
      break;
    case 'r':
      if(nameMinus2 === "ur")
        genetive =  nameMinus2 + "ar";
      genetive =  name+"s";
      break;
    case 's':
      genetive =  name;
      break;
    case 'x':
      genetive =  name;
      break;
    case 'y':
      genetive =  name;
      break;
    case 'z':
      genetive =  name;
      break;
    default:
      genetive =  name + "s";

  }
  if(male){
    return genetive+"son";
  }
  else{ //female
    return genetive+"dóttir";
  }
}
