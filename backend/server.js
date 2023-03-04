const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const rateLimit = require('axios-rate-limit');

async function getJobs(jobTitle, location) {
  const http = rateLimit(axios.create(), {
    maxRequests: 20,
    perMilliseconds: 1000,
    maxRPS: 20,
  });
  let allJobOffers = [];
  let serachKeywords = jobTitle,
    searchLocation = location;
  try {
    let jobId = 0;
    for (let pageNumber = 0; pageNumber < 400; pageNumber += 25) {
      const jobsUrl = `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${serachKeywords}&location=${searchLocation}&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0&start=${pageNumber}`;
      const { data } = await http.get(jobsUrl);
      const $ = cheerio.load(data);
      const jobs = $('li');
      jobs.each((index, element) => {
        const offer = $(element)
          .find('h3.base-search-card__title')
          .text()
          .trim();
        const company = $(element)
          .find('h4.base-search-card__subtitle')
          .text()
          .trim();
        const location = $(element)
          .find('span.job-search-card__location')
          .text()
          .trim();
        const link = $(element).find('a.base-card__full-link').attr('href');
        const state = $(element).find('.result-benefits__text').text().trim();
        const salary = $(element)
          .find('.job-search-card__salary-info')
          .text()
          .replace(/\n/g, '')
          .replace(/\s/g, '')
          .trim();
        const jobDate = $(element)
          .find('.job-search-card__listdate')
          .text()
          .trim();

        allJobOffers.push({
          Id: (jobId++).toString(),
          Offer: offer ? offer : 'N/A',
          Company: company ? company : 'N/A',
          Location: location ? location : 'N/A',
          State: state ? state : 'N/A',
          Salary: salary ? salary : 'N/A',
          Date: jobDate ? jobDate : 'N/A',
          Link: link ? link : 'N/A',
        });
      });
    }
    return allJobOffers;
  } catch (err) {
    console.error(err.message);
  }
}

const app = express();

app.get(
  '/api/linkedjob-offers/jobtitle/:jobtitle/location/:location',
  async (req, res) => {
    try {
      const allJobOffers = await getJobs(
        req.params.jobtitle,
        req.params.location
      );
      return res.status(200).json(allJobOffers);
    } catch (err) {
      return res.status(500).json({
        err: err.toString(),
      });
    }
  }
);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
