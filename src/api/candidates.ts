import axios from "axios";

const request = axios.create({
  baseURL: "http://personio-fe-test.herokuapp.com/api/v1",
});

export const getCandidates = () => request.get("/candidates");
