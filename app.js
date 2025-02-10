//import { countryListAlpha2 } from "./countrylist.js";

const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

// Add on-click event to the search button
document.getElementById('searchButton').addEventListener('click', function() {
    const cName = document.getElementById('locationInput').value;
    if (cName) {
        searchWeather(cName);
    }
});

// Function for searching location and retrieving data
async function searchWeather(cName) {
	const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
	    try {
		    const res = await fetch(temp);
		    const data = await res.json();
		    if (res.ok) {
			    fetchWeather(data);
		    } else {
			    alert('Location not found. Please try again.');
		    }
	    } catch (error) {
		    console.error('Error fetching weather data:', error);
	    }
    }

// Display data
function fetchWeather(data) {
    var weatherIcon = data.weather[0].icon;
    var iconUrl = "https://openweathermap.org/img/w/" + weatherIcon + ".png";
	var windSpeedText;
	// Clock
	var date = new Date();
	var dateHours = date.getHours();
	var dateMinutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
	var dateSeconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	var formattedTime = dateHours + ':' + dateMinutes + '.' + dateSeconds;
	// Date objects for sunrise and sunset
	var sunriseDate = new Date(data.sys.sunrise * 1000);
	var sunsetDate = new Date(data.sys.sunset * 1000);
	// Hours
	var sunriseHours = sunriseDate.getHours();
	var sunsetHours = sunsetDate.getHours();
	// Minutes
	var sunriseMinutes = sunriseDate.getMinutes() < 10 ? '0' + sunriseDate.getMinutes() : sunriseDate.getMinutes();
	var sunsetMinutes = sunsetDate.getMinutes() < 10 ? '0' + sunsetDate.getMinutes() : sunsetDate.getMinutes();
	// Seconds
	var sunriseSeconds = sunriseDate.getSeconds() < 10 ? '0' + sunriseDate.getSeconds() : sunriseDate.getSeconds();
	var sunsetSeconds = sunsetDate.getSeconds() < 10 ? '0' + sunsetDate.getSeconds() : sunsetDate.getSeconds();
	// Display
	var formattedSunriseTime = sunriseHours + ':' + sunriseMinutes + '.' + sunriseSeconds;
	var formattedSunsetTime = sunsetHours + ':' + sunsetMinutes + '.' + sunsetSeconds;
	// Wind direction as text based on the angle in degrees (0 >= x <= 360)
	if ((data.wind.deg > 348 && data.wind.deg <= 360) || (data.wind.deg >= 0 && data.wind.deg <= 11)) {
		windSpeedText = "North";
	}
	else if (data.wind.deg > 11 && data.wind.deg <= 33) {
		windSpeedText = "North-northeast";
	}
	else if (data.wind.deg > 33 && data.wind.deg <= 56) {
		windSpeedText = "Northeast";
	}
	else if (data.wind.deg > 56 && data.wind.deg <= 78) {
		windSpeedText = "East-northeast";
	}
	else if (data.wind.deg > 78 && data.wind.deg <= 101) {
		windSpeedText = "East";
	}
	else if (data.wind.deg > 101 && data.wind.deg <= 123) {
		windSpeedText = "East-southeast";
	}
	else if (data.wind.deg > 123 && data.wind.deg <= 146) {
		windSpeedText = "Southeast";
	}
	else if (data.wind.deg > 146 && data.wind.deg <= 168) {
		windSpeedText = "South-southeast";
	}
	else if (data.wind.deg > 168 && data.wind.deg <= 191) {
		windSpeedText = "South";
	}
	else if (data.wind.deg > 191 && data.wind.deg <= 213) {
		windSpeedText = "South-southwest";
	}
	else if (data.wind.deg > 213 && data.wind.deg <= 236) {
		windSpeedText = "Southwest";
	}
	else if (data.wind.deg > 236 && data.wind.deg <= 258) {
		windSpeedText = "West-southwest";
	}
	else if (data.wind.deg > 258 && data.wind.deg <= 281) {
		windSpeedText = "West";
	}
	else if (data.wind.deg > 281 && data.wind.deg <= 303) {
		windSpeedText = "West-northwest";
	}
	else if (data.wind.deg > 303 && data.wind.deg <= 326) {
		windSpeedText = "Northwest";
	}
	else if (data.wind.deg > 326 && data.wind.deg <= 348) {
		windSpeedText = "North-northwest";
	}
	const property = data.sys.country;
	const { [property]: countryAbbr } = countryListAlpha2;

    $('.weather-info').show();
	$('#location').text(data.name);
	$('#location').append(`, <abbr title='${countryAbbr}'>${data.sys.country}</abbr>`);
	//$('#location').append(`, <abbr title='${countryListAlpha2}['${data.sys.country}']'>${data.sys.country}</abbr>`);
	//$('#date').text(moment().format().substring(11, 19));
	$('#date').text(moment().format('MMMM Do YYYY'));
	$('#date').append(`, ${formattedTime}`);
	$('#temperature').html(`${data.main.temp} `);
	$('#temperature').append("<abbr title='degrees Celcius'>°C</abbr>");
	$('#description').text(data.weather[0].description);
    $('#feels-like-temp').html(`Feels like: ${data.main.feels_like} `);
	$('#feels-like-temp').append("<abbr title='degrees Celcius'>°C</abbr>");
	$('#wind-speed').html(`Wind Speed: ${data.wind.speed} `);
	$('#wind-speed').append("<abbr title='meters per second'>m/s</abbr>");
    $('#wind-direction').html(`Wind Direction: ${data.wind.deg}° (${windSpeedText})`);
    $('#humidity').html(`Humidity: ${data.main.humidity} %`)
    $('#pressure').html(`Pressure: ${data.main.pressure} `);
	$('#pressure').append("<abbr title='hectopascals'>hPa</abbr>");
    $('#visibility').html(`Visibility: ${data.visibility} `);
	$('#visibility').append("<abbr title='meters'>m</abbr>");
	$('#sunrise').html(`Sunrise: ${formattedSunriseTime}`);
	$('#sunset').html(`Sunset: ${formattedSunsetTime}`);
	$('#weather-icon').attr('src', iconUrl);
}

// Country names object using 2-letter country codes to reference country name
// ISO 3166 Alpha-2 Format: [2 letter Country Code]: [Country Name]
// Sorted alphabetical by country name (special characters on bottom)
const countryListAlpha2 = {
    "AF": "Afghanistan",
    "AL": "Albania",
    "DZ": "Algeria",
    "AS": "American Samoa",
    "AD": "Andorra",
    "AO": "Angola",
    "AI": "Anguilla",
    "AQ": "Antarctica",
    "AG": "Antigua and Barbuda",
    "AR": "Argentina",
    "AM": "Armenia",
    "AW": "Aruba",
    "AU": "Australia",
    "AT": "Austria",
    "AZ": "Azerbaijan",
    "BS": "Bahamas (the)",
    "BH": "Bahrain",
    "BD": "Bangladesh",
    "BB": "Barbados",
    "BY": "Belarus",
    "BE": "Belgium",
    "BZ": "Belize",
    "BJ": "Benin",
    "BM": "Bermuda",
    "BT": "Bhutan",
    "BO": "Bolivia (Plurinational State of)",
    "BQ": "Bonaire, Sint Eustatius and Saba",
    "BA": "Bosnia and Herzegovina",
    "BW": "Botswana",
    "BV": "Bouvet Island",
    "BR": "Brazil",
    "IO": "British Indian Ocean Territory (the)",
    "BN": "Brunei Darussalam",
    "BG": "Bulgaria",
    "BF": "Burkina Faso",
    "BI": "Burundi",
    "CV": "Cabo Verde",
    "KH": "Cambodia",
    "CM": "Cameroon",
    "CA": "Canada",
    "KY": "Cayman Islands (the)",
    "CF": "Central African Republic (the)",
    "TD": "Chad",
    "CL": "Chile",
    "CN": "China",
    "CX": "Christmas Island",
    "CC": "Cocos (Keeling) Islands (the)",
    "CO": "Colombia",
    "KM": "Comoros (the)",
    "CD": "Congo (the Democratic Republic of the)",
    "CG": "Congo (the)",
    "CK": "Cook Islands (the)",
    "CR": "Costa Rica",
    "HR": "Croatia",
    "CU": "Cuba",
    "CW": "Curaçao",
    "CY": "Cyprus",
    "CZ": "Czechia",
    "CI": "Côte d'Ivoire",
    "DK": "Denmark",
    "DJ": "Djibouti",
    "DM": "Dominica",
    "DO": "Dominican Republic (the)",
    "EC": "Ecuador",
    "EG": "Egypt",
    "SV": "El Salvador",
    "GQ": "Equatorial Guinea",
    "ER": "Eritrea",
    "EE": "Estonia",
    "SZ": "Eswatini",
    "ET": "Ethiopia",
    "FK": "Falkland Islands (the) [Malvinas]",
    "FO": "Faroe Islands (the)",
    "FJ": "Fiji",
    "FI": "Finland",
    "FR": "France",
    "GF": "French Guiana",
    "PF": "French Polynesia",
    "TF": "French Southern Territories (the)",
    "GA": "Gabon",
    "GM": "Gambia (the)",
    "GE": "Georgia",
    "DE": "Germany",
    "GH": "Ghana",
    "GI": "Gibraltar",
    "GR": "Greece",
    "GL": "Greenland",
    "GD": "Grenada",
    "GP": "Guadeloupe",
    "GU": "Guam",
    "GT": "Guatemala",
    "GG": "Guernsey",
    "GN": "Guinea",
    "GW": "Guinea-Bissau",
    "GY": "Guyana",
    "HT": "Haiti",
    "HM": "Heard Island and McDonald Islands",
    "VA": "Holy See (the)",
    "HN": "Honduras",
    "HK": "Hong Kong",
    "HU": "Hungary",
    "IS": "Iceland",
    "IN": "India",
    "ID": "Indonesia",
    "IR": "Iran (Islamic Republic of)",
    "IQ": "Iraq",
    "IE": "Ireland",
    "IM": "Isle of Man",
    "IL": "Israel",
    "IT": "Italy",
    "JM": "Jamaica",
    "JP": "Japan",
    "JE": "Jersey",
    "JO": "Jordan",
    "KZ": "Kazakhstan",
    "KE": "Kenya",
    "KI": "Kiribati",
    "KP": "Korea (the Democratic People's Republic of)",
    "KR": "Korea (the Republic of)",
    "KW": "Kuwait",
    "KG": "Kyrgyzstan",
    "LA": "Lao People's Democratic Republic (the)",
    "LV": "Latvia",
    "LB": "Lebanon",
    "LS": "Lesotho",
    "LR": "Liberia",
    "LY": "Libya",
    "LI": "Liechtenstein",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "MO": "Macao",
    "MG": "Madagascar",
    "MW": "Malawi",
    "MY": "Malaysia",
    "MV": "Maldives",
    "ML": "Mali",
    "MT": "Malta",
    "MH": "Marshall Islands (the)",
    "MQ": "Martinique",
    "MR": "Mauritania",
    "MU": "Mauritius",
    "YT": "Mayotte",
    "MX": "Mexico",
    "FM": "Micronesia (Federated States of)",
    "MD": "Moldova (the Republic of)",
    "MC": "Monaco",
    "MN": "Mongolia",
    "ME": "Montenegro",
    "MS": "Montserrat",
    "MA": "Morocco",
    "MZ": "Mozambique",
    "MM": "Myanmar",
    "NA": "Namibia",
    "NR": "Nauru",
    "NP": "Nepal",
    "NL": "Netherlands (the)",
    "NC": "New Caledonia",
    "NZ": "New Zealand",
    "NI": "Nicaragua",
    "NE": "Niger (the)",
    "NG": "Nigeria",
    "NU": "Niue",
    "NF": "Norfolk Island",
    "MP": "Northern Mariana Islands (the)",
    "NO": "Norway",
    "OM": "Oman",
    "PK": "Pakistan",
    "PW": "Palau",
    "PS": "Palestine, State of",
    "PA": "Panama",
    "PG": "Papua New Guinea",
    "PY": "Paraguay",
    "PE": "Peru",
    "PH": "Philippines (the)",
    "PN": "Pitcairn",
    "PL": "Poland",
    "PT": "Portugal",
    "PR": "Puerto Rico",
    "QA": "Qatar",
    "MK": "Republic of North Macedonia",
    "RO": "Romania",
    "RU": "Russian Federation (the)",
    "RW": "Rwanda",
    "RE": "Réunion",
    "BL": "Saint Barthélemy",
    "SH": "Saint Helena, Ascension and Tristan da Cunha",
    "KN": "Saint Kitts and Nevis",
    "LC": "Saint Lucia",
    "MF": "Saint Martin (French part)",
    "PM": "Saint Pierre and Miquelon",
    "VC": "Saint Vincent and the Grenadines",
    "WS": "Samoa",
    "SM": "San Marino",
    "ST": "Sao Tome and Principe",
    "SA": "Saudi Arabia",
    "SN": "Senegal",
    "RS": "Serbia",
    "SC": "Seychelles",
    "SL": "Sierra Leone",
    "SG": "Singapore",
    "SX": "Sint Maarten (Dutch part)",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "SB": "Solomon Islands",
    "SO": "Somalia",
    "ZA": "South Africa",
    "GS": "South Georgia and the South Sandwich Islands",
    "SS": "South Sudan",
    "ES": "Spain",
    "LK": "Sri Lanka",
    "SD": "Sudan (the)",
    "SR": "Suriname",
    "SJ": "Svalbard and Jan Mayen",
    "SE": "Sweden",
    "CH": "Switzerland",
    "SY": "Syrian Arab Republic",
    "TW": "Taiwan",
    "TJ": "Tajikistan",
    "TZ": "Tanzania, United Republic of",
    "TH": "Thailand",
    "TL": "Timor-Leste",
    "TG": "Togo",
    "TK": "Tokelau",
    "TO": "Tonga",
    "TT": "Trinidad and Tobago",
    "TN": "Tunisia",
    "TR": "Turkey",
    "TM": "Turkmenistan",
    "TC": "Turks and Caicos Islands (the)",
    "TV": "Tuvalu",
    "UG": "Uganda",
    "UA": "Ukraine",
    "AE": "United Arab Emirates (the)",
    "GB": "United Kingdom of Great Britain and Northern Ireland (the)",
    "UM": "United States Minor Outlying Islands (the)",
    "US": "United States of America (the)",
    "UY": "Uruguay",
    "UZ": "Uzbekistan",
    "VU": "Vanuatu",
    "VE": "Venezuela (Bolivarian Republic of)",
    "VN": "Viet Nam",
    "VG": "Virgin Islands (British)",
    "VI": "Virgin Islands (U.S.)",
    "WF": "Wallis and Futuna",
    "EH": "Western Sahara",
    "YE": "Yemen",
    "ZM": "Zambia",
    "ZW": "Zimbabwe",
    "AX": "Åland Islands"
};
