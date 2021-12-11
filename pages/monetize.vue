<template>
  <main class="px-4 py-4 dark:bg-gray-700">
    <section class="submissions">
      <h1>Enable Monetization</h1>

      <p>
        You can optionally monetize your app by connecting with Stripe.
        Monetized apps are presented in AppCenter as a pay-what-you-can purchase
        with your suggested price set as the default.
      </p>

      <p>
        <a
          href="https://docs.elementary.io/develop/appcenter/monetizing-your-app"
          target="_blank"
          >More info &amp; documentation</a
        >
      </p>

      <ol>
        <li>
          <p>
            <strong>Set the suggested price</strong> as a whole USD value in
            your app's <code>x-appcenter-suggested-price</code> AppStream key.
          </p>
        </li>

        <li>
          <p>
            <strong><a href="/auth/stripe">Connect with Stripe</a></strong>
          </p>
        </li>
      </ol>

      <div class="buttons">
        <a
          class="button suggested"
          href="https://beta.developer.elementary.io/submissions"
          >Dashboard</a
        >
      </div>
    </section>
  </main>
</template>
