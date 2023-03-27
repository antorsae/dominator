// pages/api/checkDomainAvailability.js

import axios from "axios";

const apiKey = "your_whoisxml_api_key";

export default async function handler(req, res) {
  const { domain, tld } = req.query;

  try {

    apiKey = process.env.WHOISXML_API_KEY;
    const response = await axios.get(`https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${domain}.${tld}&outputFormat=json`);

    const availability = response.data.DomainInfo.domainAvailability;
    res.status(200).json({ availability });
  } catch (error) {
    res.status(500).json({ message: "Error calling WhoisXML API" });
  }
}
