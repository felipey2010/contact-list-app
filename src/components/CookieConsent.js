import React from 'react'
import CookieConsent from 'react-cookie-consent'

export default function AppCookieConsent() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept & Close"
      cookieName="contact-list-cookie"
      style={{ background: '#2B373B' }}
      buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
      expires={150}
    >
      This website uses cookies to enhance the user experience. By continuing to
      use this website, you agree to our use of cookies.
    </CookieConsent>
  )
}
