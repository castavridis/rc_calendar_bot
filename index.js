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

// NOTE: Zulip <time: format == <time:2025-12-10T17:00:00+01:00>
// Structure for bot input e.g. couches bot

// Is it possible to add a button to the message bar?
// 
app.get('/get_invite/', (req, res) => {
  const time = "<time:2025-12-10T17:00:00+01:00>"
  const date = new Date(time.replace("<time:", "").replace(">", "")) 
  
  const recipients = req.body.message.display_recipient
  const title = "Pairing: " + recipients.map(recipient => recipient.full_name).join(", ")

  const event = { 
    start: date.getTime(), // .getTime() > UTC
    duration: { minutes: 30 },
    title,
  };
  const calInvite = ics.createEvent(event);
  res.send(calInvite.value)
})

app.post('/post_zulip_data/', (req, res, next) => {
  const time = req.body.data
  const date = new Date(time.replace("<time:", "").replace(">", "")) 
  
  const recipients = req.body.message.display_recipient
  const title = "Pairing: " + recipients.map(recipient => recipient.full_name).join(", ")

  const event = { 
    start: date.getTime(), // .getTime() > UTC
    duration: { minutes: 30 },
    title,
  };
  const calInvite = ics.createEvent(event);
  res.send({
    "ics_data": JSON.stringify(calInvite.value)
  })
  // console.log(req.body.)
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})