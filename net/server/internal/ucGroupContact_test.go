package databag

import (
  "time"
  "testing"
  "encoding/json"
  "github.com/gorilla/mux"
  "github.com/gorilla/websocket"
  "github.com/stretchr/testify/assert"
)

func TestGroupContact(t *testing.T) {
  var subject *Subject
  var group Group
  var groups []Group
  var groupRevision int64
  var cardRevision int64
  var revision Revision
  var vars map[string]string
  var cardData CardData
  var contactRevision int64
  var card Card
  var contactCardRevision int64

  // start notification thread
  go SendNotifications()

  // connect contacts
  _, a, _ := AddTestAccount("groupcontact0")
  _, b, _ := AddTestAccount("groupcontact1")
  aCard, _ := AddTestCard(a, b)
  bCard, _ := AddTestCard(b, a)
  OpenTestCard(a, aCard)
  OpenTestCard(b, bCard)

  // app connects websocket
  wsA := getTestWebsocket()
  announce := Announce{ AppToken: a }
  data, _ := json.Marshal(&announce)
  wsA.WriteMessage(websocket.TextMessage, data)
  wsB := getTestWebsocket()
  announce = Announce{ AppToken: b }
  data, _ = json.Marshal(&announce)
  wsB.WriteMessage(websocket.TextMessage, data)

  // receive revision
  wsA.SetReadDeadline(time.Now().Add(2 * time.Second))
  _, data, _ = wsA.ReadMessage()
  assert.NoError(t, json.Unmarshal(data, &revision))
  groupRevision = revision.Group
  wsB.SetReadDeadline(time.Now().Add(2 * time.Second))
  _, data, _ = wsB.ReadMessage()
  assert.NoError(t, json.Unmarshal(data, &revision))
  contactRevision = revision.Card

  // add group to conatact 0
  subject = &Subject{
    DataType: "imagroup",
    Data: "group data with name and logo",
  }
  r, w, _ := NewRequest("POST", "/share/groups", subject)
  SetBearerAuth(r, a)
  AddGroup(w, r)
  assert.NoError(t, ReadResponse(w, &group))

  // receive revision
  wsA.SetReadDeadline(time.Now().Add(2 * time.Second))
  _, data, _ = wsA.ReadMessage()
  assert.NoError(t, json.Unmarshal(data, &revision))
  assert.NotEqual(t, groupRevision, revision.Group)
  cardRevision = revision.Card

  // get contact revision
  r, w, _ = NewRequest("GET", "/contact/cards/{cardId}", nil)
  vars = map[string]string{ "cardId": bCard }
  r = mux.SetURLVars(r, vars)
  SetBearerAuth(r, b)
  GetCard(w, r)
  assert.NoError(t, ReadResponse(w, &card))
  contactCardRevision = card.ContentRevision

  // set contact group
  r, w, _ = NewRequest("PUT", "/contact/cards/{cardId}/groups/{groupId}", nil)
  vars = make(map[string]string)
  vars["groupId"] = group.GroupId
  vars["cardId"] = aCard 
  r = mux.SetURLVars(r, vars)
  SetBearerAuth(r, a)
  SetCardGroup(w, r)
  assert.NoError(t, ReadResponse(w, &cardData))
  assert.Equal(t, 1, len(cardData.Groups))

  // get contact revision
  r, w, _ = NewRequest("GET", "/contact/cards/{cardId}", nil)
  vars = map[string]string{ "cardId": aCard }
  r = mux.SetURLVars(r, vars)
  SetBearerAuth(r, a)
  GetCard(w, r)
  card = Card{}
  assert.NoError(t, ReadResponse(w, &card))
  assert.Equal(t, len(card.CardData.Groups), 1)

  // receive revision
  wsA.SetReadDeadline(time.Now().Add(2 * time.Second))
  _, data, _ = wsA.ReadMessage()
  assert.NoError(t, json.Unmarshal(data, &revision))
  assert.NotEqual(t, cardRevision, revision.Card)
  groupRevision = revision.Group
  wsB.SetReadDeadline(time.Now().Add(2 * time.Second))
  _, data, _ = wsB.ReadMessage()
  assert.NoError(t, json.Unmarshal(data, &revision))
  assert.NotEqual(t, contactRevision, revision.Card)
  contactRevision = revision.Card

  // get contact revision
  r, w, _ = NewRequest("GET", "/contact/cards/{cardId}", nil)
  vars = map[string]string{ "cardId": bCard }
  r = mux.SetURLVars(r, vars)
  SetBearerAuth(r, b)
  GetCard(w, r)
  assert.NoError(t, ReadResponse(w, &card))
  assert.NotEqual(t, contactCardRevision, card.ContentRevision)
  contactCardRevision = card.ContentRevision

  // show group view
  r, w, _ = NewRequest("GET", "/share/groups", nil)
  SetBearerAuth(r, a)
  GetGroups(w, r)
  assert.NoError(t, ReadResponse(w, &groups))
  assert.Equal(t, 1, len(groups))

  // update group in conatact 0
  subject = &Subject{
    DataType: "imagroupEDIT",
    Data: "group data with name and logo",
  }
  r, w, _ = NewRequest("POST", "/share/groups", subject)
  vars = make(map[string]string)
  vars["groupId"] = group.GroupId
  r = mux.SetURLVars(r, vars)
  SetBearerAuth(r, a)
  UpdateGroup(w, r)
  assert.NoError(t, ReadResponse(w, &group))
  assert.Equal(t, group.DataType, "imagroupEDIT")

  // receive revision
  wsA.SetReadDeadline(time.Now().Add(2 * time.Second))
  _, data, _ = wsA.ReadMessage()
  assert.NoError(t, json.Unmarshal(data, &revision))
  assert.NotEqual(t, groupRevision, revision.Group)
  groupRevision = revision.Group

  // delete group
  r, w, _ = NewRequest("DELETE", "/share/groups", nil)
  vars = make(map[string]string)
  vars["groupId"] = group.GroupId
  r = mux.SetURLVars(r, vars)
  SetBearerAuth(r, a)
  RemoveGroup(w, r)
  assert.NoError(t, ReadResponse(w, &group))

  // get contact revision
  r, w, _ = NewRequest("GET", "/contact/cards/{cardId}", nil)
  vars = map[string]string{ "cardId": aCard }
  r = mux.SetURLVars(r, vars)
  SetBearerAuth(r, a)
  GetCard(w, r)
  card = Card{}
  assert.NoError(t, ReadResponse(w, &card))
  assert.Equal(t, len(card.CardData.Groups), 0)

  // receive revision
  wsA.SetReadDeadline(time.Now().Add(2 * time.Second))
  _, data, _ = wsA.ReadMessage()
  assert.NoError(t, json.Unmarshal(data, &revision))
  assert.NotEqual(t, groupRevision, revision.Group)
  wsB.SetReadDeadline(time.Now().Add(2 * time.Second))
  _, data, _ = wsB.ReadMessage()
  assert.NoError(t, json.Unmarshal(data, &revision))
  assert.NotEqual(t, contactRevision, revision.Card)

  // get contact revision
  r, w, _ = NewRequest("GET", "/contact/cards/{cardId}", nil)
  vars = map[string]string{ "cardId": bCard }
  r = mux.SetURLVars(r, vars)
  SetBearerAuth(r, b)
  GetCard(w, r)
  assert.NoError(t, ReadResponse(w, &card))
  assert.NotEqual(t, contactCardRevision, card.ContentRevision)

  // show group view
  r, w, _ = NewRequest("GET", "/share/groups", nil)
  SetBearerAuth(r, a)
  GetGroups(w, r)
  assert.NoError(t, ReadResponse(w, &groups))
  assert.Equal(t, 0, len(groups))

  // stop notification thread
  ExitNotifications()
}
