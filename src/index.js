const puppeteer = require("puppeteer");

const roster = process.argv[2] || [
  {
    name: "Matthew Stafford",
    position: "QB"
  },
  {
    name: "Kirk Cousins",
    position: "QB"
  },
  {
    name: "David Johnson",
    position: "RB"
  },
  {
    name: "Devonta Freeman",
    position: "RB"
  },
  {
    name: "Kenyan Drake",
    position: "RB"
  },
  {
    name: "Tarik Cohen",
    position: "RB"
  },
  {
    name: "Kerryon Johnson",
    position: "RB"
  },
  {
    name: "Julio Jones",
    position: "WR"
  },
  {
    name: "Mike Evans",
    position: "WR"
  },
  {
    name: "Adam Thielen",
    position: "WR"
  },
  {
    name: "Juju Smith-Schuster",
    position: "WR"
  },
  {
    name: "Corey Davis",
    position: "WR"
  },
  {
    name: "Kyle Rudolph",
    position: "TE"
  },
  {
    name: "Mike Gesicki",
    position: "TE"
  }
];
const positionLists = [
  {
    position: "QB",
    url: "https://s3-us-west-1.amazonaws.com/fftiers/out/text_QB.txt"
  },
  {
    position: "RB",
    url: "https://s3-us-west-1.amazonaws.com/fftiers/out/text_RB-PPR.txt"
  },
  {
    position: "WR",
    url: "https://s3-us-west-1.amazonaws.com/fftiers/out/text_WR-PPR.txt"
  },
  {
    position: "TE",
    url: "https://s3-us-west-1.amazonaws.com/fftiers/out/text_TE-PPR.txt"
  }
];

async function getData(positionList) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(positionList.url);
  let data = await page.evaluate(() => {
    const fullData = document.body.textContent.split("\n").map(tier => {
      const splitTier = tier
        .split(": ")
        .join(", ")
        .split(", ");
      return {
        tier: Number(splitTier[0].replace(/^\D+/g, "")),
        players: splitTier.slice(1).map(player => player)
      };
    });
    fullData.pop();
    return fullData;
  });
  console.log(data);
  await browser.close();
}

positionLists.forEach(list => getData(list));
