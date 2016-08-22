function intro(event) {
  var client = new XMLHttpRequest();
  client.open('GET', '/me.html');
  client.onreadystatechange = function() {
    if (client.readyState == 4 && client.status == 200) {
      if (client.responseText.length > 0) {
        document.getElementById('window').innerHTML = client.responseText
      }
    }
  }
  client.send();
}


function projects() {
  return [
    {
      name: "John Patrick Halling",
      link: "JohnPatrickhalling.com",
      desc: "Website for a local musican in Kent, OH",
    },
    {
      name: "Sobertool",
      link: "",
      desc: "Alcohol rehab app for lawyer Paul Caimi"
    },
    {
      name: "Mobile App Club",
      link: "mobileapposu.github.io",
      desc: "Simple website for the Mobile App Club at Ohio State"
    },
    {
      name: "OHI/O",
      link: "hack.osu.edu",
      desc: "Website for the Hackathon at Ohio State"
    },
    {
      name: "CountMySteps",
      link: "",
      desc: "iOS step counting applicaiton. Uses the M7(+) motion chip"
    },
    {
      name: "Umm",
      link: "",
      desc: "Tally the filler words during someone speaches"
    },
    {
      name: "MyPharmacist",
      link: "",
      desc: "Pharmac app for the Ohio State Univeristy department of Pharmacy"
    },
    {
      name: "Pillar",
      link: "",
      desc: "iOS app and intro website for a social network designed to bring Muslim students together"
    },
    {
      name: "GeoPatterns",
      link: "",
      desc: "Generate patterns from a stirng. Uses CoreGraphics"
    }];
  }
