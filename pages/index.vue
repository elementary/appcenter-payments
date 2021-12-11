<template>
  <main class="px-4 py-4">
    <h1>AppCenter Payments</h1>

    <p>
      This site is responsible for connecting to Stripe, grabbing the needed
      keys, and processing payments from AppCenter. Both for the older method
      with a native Stripe dialog, and the newer method using flatpak
      authenticator.
    </p>

    <p>
      If you want to test out routes, you can access
      <nuxt-link to="/monetize">/monetize</nuxt-link> to see your Stripe
      credentials.
    </p>
  </main>
</template>
