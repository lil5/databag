package databag

import (
  "databag/internal/store"
  "github.com/pquerna/otp/totp"
  "gorm.io/gorm"
	"net/http"
  "errors"
  "time"
)

//SetMultiFactorAuth
func SetMultiFactorAuth(w http.ResponseWriter, r *http.Request) {

	account, ret, err := ParamAgentToken(r, true)
	if err != nil {
		ErrResponse(w, ret, err)
		return
	}

  if !account.MFAEnabled {
    ErrResponse(w, http.StatusMethodNotAllowed, errors.New("totp not enabled"))
    return;
  }
  code := r.FormValue("code")
  if code == "" {
    ErrResponse(w, http.StatusMethodNotAllowed, errors.New("totp code required"))
    return;
  }

  curTime := time.Now().Unix()
  if account.MFAFailedTime + APPMFAFailPeriod > curTime && account.MFAFailedCount > APPMFAFailCount {
    ErrResponse(w, http.StatusTooManyRequests, errors.New("temporarily locked"))
    return;
  }

  if !totp.Validate(account.MFASecret, code) {
    err := store.DB.Transaction(func(tx *gorm.DB) error {
      if account.MFAFailedTime + APPMFAFailPeriod > curTime {
        account.MFAFailedCount += 1
        if res := tx.Model(account).Update("mfa_failed_count", account.MFAFailedCount).Error; res != nil {
          return res
        }
      } else {
        account.MFAFailedTime = curTime
        if res := tx.Model(account).Update("mfa_failed_time", account.MFAFailedTime).Error; res != nil {
          return res
        }
        account.MFAFailedCount = 1
        if res := tx.Model(account).Update("mfa_failed_count", account.MFAFailedCount).Error; res != nil {
          return res
        }
      }
      return nil
    })
    if err != nil {
      LogMsg("failed to increment fail count");
    }

    ErrResponse(w, http.StatusUnauthorized, errors.New("invalid code"))
    return
  }

	SetStatus(account)
	WriteResponse(w, nil)
}
