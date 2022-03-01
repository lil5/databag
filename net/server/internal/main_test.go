package databag

import (
  "os"
  "testing"
  "databag/internal/store"
)

func TestMain(m *testing.M) {

//  SetHideLog(true)
  SetKeySize(2048)
  os.Remove("databag.db")
  os.RemoveAll("testdata")
  os.RemoveAll("testscripts")

  store.SetPath("databag.db")
  if err := os.Mkdir("testdata", os.ModePerm); err != nil {
    panic("failed to create testdata path")
  }
  if err := os.Mkdir("testscripts", os.ModePerm); err != nil {
    panic("failed to create testscripts path")
  }
  script := []byte("#!/bin/bash\n\ncp $1 $2\n")
  if err := os.WriteFile("testscripts/transform_copy.sh", script, 0555); err != nil {
    panic("failed to create P01 script")
  }

  r, w, _ := NewRequest("GET", "/admin/status", nil)
  GetNodeStatus(w, r)
  var available bool
  if ReadResponse(w, &available) != nil {
    panic("server not claimable")
  }

  // claim server
  r, w, _ = NewRequest("PUT", "/admin/status", nil)
  SetCredentials(r, "admin:pass");
  SetNodeStatus(w, r)
  if ReadResponse(w, nil) != nil {
    panic("failed to claim server")
  }

  // config data path 
  scripts := &store.Config{ ConfigId: CONFIG_SCRIPTPATH, StrValue: "./testscripts" }
  if err := store.DB.Save(scripts).Error; err != nil {
    panic("failed to configure scripts path")
  }

  // config data path 
  path := &store.Config{ ConfigId: CONFIG_ASSETPATH, StrValue: "./testdata" }
  if err := store.DB.Save(path).Error; err != nil {
    panic("failed to configure data path")
  }

  // config server
  config := NodeConfig{Domain: "example.com", PublicLimit: 1024, AccountStorage: 4096}
  r, w, _ = NewRequest("PUT", "/admin/config", &config)
  SetBasicAuth(r, "admin:pass")
  SetNodeConfig(w, r)
  if ReadResponse(w, nil) != nil {
    panic("failed to set config")
  }

  // check config
  r, w, _ = NewRequest("GET", "/admin/config", nil)
  SetBasicAuth(r, "admin:pass")
  GetNodeConfig(w, r)
  var check NodeConfig
  if ReadResponse(w, &check) != nil {
    panic("failed to get node config")
  }
  if check.Domain != "example.com" {
    panic("failed to set config domain");
  }
  if check.PublicLimit != 1024 {
    panic("failed to set public limit");
  }
  if check.AccountStorage != 4096 {
    panic("failed to set account storage");
  }

  go SendNotifications()

  m.Run()

  ExitNotifications()
}

