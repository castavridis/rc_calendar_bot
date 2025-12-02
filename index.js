const express = require('express')
const ics = require('ics')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello Disco!')
})


// email server email constant

// sample time: 2025-11-24T19:00:00+01:00 (Z or not)
// Required data
// time
// event organizer email
// event invitee email

/**025-01-
{
time: "2025-11-24T19:00:00+01:00"
organizer: "organizer@test.com"
attendees: [
  "attendee@test.com"
]
}
  */

// title (pairing | coffee) / zulip name
app.get('/get_invite/',  (req, res) => {
    const params = req.params
    // Keep to UTC, may need to strip +
    const calDate = new Date("224T19:00:00+01:00");
    const event = { 
      start: [
        calDate.getFullYear(),
        calDate.getMonth(), 
        calDate.getDay(),
        calDate.getHours(),
        calDate.getMinutes(),
      ],
      organizer: { email: "organizer@test.com" },
      attendees: [
        { email: "attendee@test.com" },
      ]
    };
    console.log(calDate, event.start, calDate.getMonth(), calDate.getUTCMonth());
    const calInvite = ics.createEvent(event);
    res.send(calInvite.value)
    // download ICS
    // email them ICS

    // generate unique uuid for calendar invitation
  // 
})

app.post('/post_zulip_data/', (req, res, next) => {
  console.log(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})