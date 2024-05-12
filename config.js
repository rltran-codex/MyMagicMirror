/* Config Sample
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 *
 * You can use environment variables using a `config.js.template` file instead of `config.js`
 * which will be converted to `config.js` while starting. For more information
 * see https://docs.magicmirror.builders/configuration/introduction.html#enviromnent-variables
 */
let config = {
  address: "localhost", // Address to listen on, can be:
  // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
  // - another specific IPv4/6 to listen on a specific interface
  // - "0.0.0.0", "::" to listen on any interface
  // Default, when address config is left out or empty, is "localhost"
  port: 8080,
  basePath: "/", // The URL path where MagicMirrorÂ² is hosted. If you are using a Reverse proxy
  // you must set the sub path here. basePath must end with a /
  ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
  // or add a specific IPv4 of 192.168.1.5 :
  // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
  // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
  // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

  useHttps: false, // Support HTTPS or not, default "false" will use HTTP
  httpsPrivateKey: "", // HTTPS private key path, only require when useHttps is true
  httpsCertificate: "", // HTTPS Certificate path, only require when useHttps is true

  language: "en",
  locale: "en-US",
  logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
  timeFormat: 24,
  units: "metric",

  modules: [
    {
      module: "clock",
      position: "top_left",
      config: {
        timeFormat: 12,
        showPeriodUpper: true,
      },
    },
    {
      module: "weather",
      position: "top_right",
      config: {
        weatherProvider: "openweathermap",
        type: "current",
        showPeriodUpper: true,
        timeFormat: 12,
        showFeelsLike: false,
        showHumidity: "temp",
        showSun: true,
        tempUnits: "imperial",
        location: "Silver Spring",
        locationID: "4369596", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
        apiKey: "${OPENWEATHER_API_KEY}",
      },
    },
    {
      module: "compliments",
      position: "middle_center",
      // Best results in one of the middle regions like: lower_third
      config: {
        updateInterval: 10 * 1000,
        classes: "large bright",
        remoteFile: "https://drive.google.com/uc?export=download&id=1Wbimd2lDuWZumi2JElXae0u3VfCcRYE2",
      },
    },
    {
      module: "calendar",
      header: "Calendar",
      position: "middle_center",
      config: {
        maximumNumberOfDays: 30,
        coloredSymbol: true,
        coloredText: true,
        tableClass: "small",
        fadePoint: 0.50,
        timeFormat : "absolute",
        urgency:1, 
        getRelative:6,
        dateFormat: "MM-DD [at] hh:mm a",
        fullDayEventDateFormat: "MM-DD",
        calendars: [
          {
            fetchInterval: 5 * 60 * 1000,
            symbol: "calendar-days",
            url: "${GMAIL_URL}",
            auth: {
              user: "${GMAIL_ACC}",
              pass: "${GMAIL_PSWRD}",
              method: "basic",
            },
          },
        ],
        customEvents: [
          {
            keyword: 'Payday',
            symbol: 'sack-dollar',
            color: '#b4d273'
          },
          {
            keyword: 'Anniversary',
            symbol: 'heart',
            color: '#b05279'
          },
          {
            keyword: 'Birthday',
            symbol: 'birthday-cake',
            color: '#00e1b3'
          },
        ],
      },
    },
    {
      module: "MMM-DCMetroTimes",
      position: "middle_center",
      config: {
        // general
        // visit the url below for the wmata api key
        // https://developer.wmata.com/
        wmata_api_key: "${WMATA_API_KEY}",
        // trains
        // use the station codes file ./stationcodes/stationcodes.md for
        // more on these values
        stationsToShowList: ["B10", "A08"],
        // buses
        // visit the url below to find the Stop ID
        // https://www.wmata.com/schedules/service-nearby/
        showBusStopTimes: true, // hide bus times by default
        stopsToShowList: ["2000477"], // Stop IDs as strings
        colorizeLines: true,
        showIncidents: false,
        refreshRateStationTrainTimes: 1 * 60 * 1000, // every 60 seconds
        maxTrainTimesPerStation: 3,

      },
    },
    {
      module: "newsfeed",
      position: "bottom_bar",
      config: {
        feeds: [
          {
            title: "New York Times: World",
            url: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
          },
          {
            title: "Tech Radar",
            url: "https://www.techradar.com/feeds/articletype/news",
          },
        ],
        showSourceTitle: true,
        showPublishDate: true,
        broadcastNewsFeeds: true,
        broadcastNewsUpdates: true,
      },
    },
  ],
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {
  module.exports = config;
}
