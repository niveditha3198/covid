const API_URL = "https://cdn-api.co-vin.in/api/v2/admin/location/states";
const DIS_URL = "https://cdn-api.co-vin.in/api/v2/admin/location/districts";
const form = document.getElementById("form");
const input = document.getElementById("input");
// const btn = document.getElementsByTagName("button");
const searchResultsWrapper = document.getElementById("search-results-wrapper");
const dbtn = document.querySelector(".dropbtn");
const dropdownContent = document.querySelector(".dropdown-content");

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
  const sN = await fetch(DIS_URL + `/${stateId}`);
  window.DistrictNames = await sN.json();
  console.log(DistrictNames);
  DistrictNames.districts.forEach(
    ({ district_id: districtId, district_name: districtName }) => {
      const dropDownResult = document.createElement("div");
      dbtn.onclick = () => {
        dropDownResult.innerText = districtName;
        dropdownContent.appendChild(dropDownResult);
      };
    }
  );
}
