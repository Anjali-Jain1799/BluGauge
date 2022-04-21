//export const API_BASE_URL = 'http://ec2-3-109-238-23.ap-south-1.compute.amazonaws.com:8080/api';  // || process.env.REACT_APP_API_BASE_URL
// export const API_BASE_URL = 'https://maideneasydesign.com/api';  // || process.env.REACT_APP_API_BASE_URL
export const API_BASE_URL = "http://localhost:80/api"; // || process.env.REACT_APP_API_BASE_URL
export const ACCESS_TOKEN = "accessToken";

const request = (options) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  headers.append("Accept", "application/json");
  // headers.append('Access-Control-Allow-Origin', 'https://bgapp-v1-dev.herokuapp.com');
  // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  headers.append(
    "Access-Control-Allow-Origin",
    "https://blugauge.maideneasydesign.com/"
  );
  headers.append("Access-Control-Allow-Credentials", "true");
  headers.append("GET", "POST", "OPTIONS");

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function login(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/signin",
    method: "POST",
    body: JSON.stringify(loginRequest),
  });
}

export function signup(signupRequest) {
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: "POST",
    body: JSON.stringify(signupRequest),
  });
}

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL + "/user/me",
    method: "GET",
  });
}

export function getBinData(user) {
  return request({
    url: API_BASE_URL + `/bins/${user}`,
    method: "GET",
  });
}

export function getBinsHistory() {
  return request({
    url: API_BASE_URL + "/binshistory",
    method: "GET",
  });
}

// Single Bin History
export function getBinHistory(bin_id) {
  return request({
    url: API_BASE_URL + `/binshistory/${bin_id}`,
    method: "GET",
  });
}

// Pagination
export function getBinsHistoryP(offset, page_size) {
  return request({
    url: API_BASE_URL + `/binshistory/pagination/${offset}/${page_size}`,
    method: "GET",
  });
}

// History Table Rows Count
export function getHistoryCount() {
  return request({
    url: API_BASE_URL + "/binshistory/count",
    method: "GET",
  });
}

export function getHistoryData(sdate, edate) {
  return request({
    url:
      API_BASE_URL + `/binshistory/date?startDate=${sdate}&endDate=${edate} `,
    method: "GET",
  });
}

export function getFilledHistoryData(sdate, edate) {
  return request({
    url: API_BASE_URL + `/binshistory/data?start=${sdate}&end=${edate}`,
    method: "GET",
  });
}
