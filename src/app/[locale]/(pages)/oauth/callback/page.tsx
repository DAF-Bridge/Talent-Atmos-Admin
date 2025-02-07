import React, { Suspense } from 'react'
import OAuthCallbackPage from './OAuthCallback'

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <OAuthCallbackPage />
    </Suspense>
    
  )
}
