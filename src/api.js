import axios from 'axios';

export const fetchResponseData = (value) => {
  const userPromise = responseData(value);
  return {
    results: wrapPromise(userPromise),
  };
};

const wrapPromise = (promise) => {
  let status = "pending";
  let result;

  let suspender = promise.then(
    (res) => {
      status = "success";
      result = res;
    },
    (err) => {
      status = "error";
      result = err;
    }
  );

  console.log("status",status)

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
};

export const responseData = (value) => {
    // console.log("check", /^\d/.test(value))
  const BASE_URL = (/^\d{6}$/.test(value)) ?  `https://api.postalpincode.in/pincode/${value}` : `https://api.postalpincode.in/postoffice/${value}`;
// const BASE_URL = `https://api.postalpincode.in/pincode/${value}`
  return axios.get(BASE_URL).then((res) => res.data);
};