const API_URL = "https://cdn-api.co-vin.in/api/v2/admin/location/states";
const DIS_URL = "https://cdn-api.co-vin.in/api/v2/admin/location/districts";
const SESSION_URL =
  "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict";
const form = document.getElementById("form");
const input = document.getElementById("input");
const searchResultsWrapper = document.getElementById("search-results-wrapper");
const districtSection = document.getElementById("district");
const districtSelect = document.getElementById("district-select");
const sessionDetails = document.getElementById("sessions");

async function getStateNames() {
  const stateNamesAPIResponse = await fetch(API_URL);
  window.stateNamesJSON = await stateNamesAPIResponse.json();
  console.log(stateNamesJSON);
  // getDistrictNames();
}

getStateNames();

input.addEventListener("input", updateValue);

function updateValue(e) {
  const matchingStates = stateNamesJSON.states.filter((state) =>
    state.state_name.toLowerCase().startsWith(e.target.value.toLowerCase())
  );
  console.log(matchingStates);
  matchingStates.forEach(({ state_id: stateId, state_name: stateName }) => {
    const searchResult = document.createElement("div");
    searchResult.className = "search-result";
    searchResult.onclick = () => {
      getDistrictNames(stateId);
    };
    searchResult.innerText = stateName;
    searchResultsWrapper.appendChild(searchResult);
  });
  // const searchResultsWrapper = `<div class="search-results-wrapper">${searchResults.join(
  //   ""
  // )}</div>`;
}

async function getDistrictNames(stateId) {
  const districtsAPIResponse = await fetch(DIS_URL + `/${stateId}`);
  window.districtNames = await districtsAPIResponse.json();
  console.log(districtNames);
  districtNames.districts.forEach(
    ({ district_id: districtId, district_name: districtName }) => {
      const dropDownResult = document.createElement("option");
      districtSelect.onclick = () => {
        getSessionsByDistricId(districtId);
      };
      dropDownResult.value = districtName;
      dropDownResult.innerText = districtName;
      districtSelect.appendChild(dropDownResult);
    }
  );
}

dateEntry = new Date();
dateEntry =
  dateEntry.getDate() +
  "-" +
  (dateEntry.getMonth() + 1) +
  "-" +
  dateEntry.getFullYear();
console.log(dateEntry);

async function getSessionsByDistricId(districtId) {
  const sessionApiResponse = await fetch(
    SESSION_URL + `?district_id=${districtId}` + `&date=${dateEntry}`
  );
  window.sessionsAvailable = await sessionApiResponse.json();
  console.log(sessionsAvailable);
  sessionsAvailable.sessions.forEach(
    ({
      address: location,
      // available_capacity_dose1: dose1Availability
      // available_capacity_dose2: dose2Availability,
      // max_age_limit: maxAge,
      // min_age_limit: minAge,
      // name: locationName,
      // slots: availableSlots,
      // pincode: pinCode,
    }) => {
      const sessionsDetail = document.createElement("p");
      sessionsDetail.innerText = location;
      // sessionsDetail.innerText = dose1Availability;
      // (sessionsDetail.innerText = dose2Availability),
      //   (sessionsDetail.innerText = maxAge);
      // sessionsDetail.innerText = minAge;
      // sessionsDetail.innerText = locationName;
      // sessionsDetail.innerText = availableSlots;
      // sessionsDetail.innerText = pinCode;
      sessionDetails.appendChild(sessionsDetail);
    }
  );
}
