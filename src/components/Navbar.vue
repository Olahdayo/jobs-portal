<template>
  <nav
    class="navbar navbar-expand-lg bg-white navbar-light sticky-top shadow-sm"
  >
    <div class="container">
      <!-- Brand -->
      <a class="navbar-brand fw-bold text-primary" href="/">
        <i class="bi bi-briefcase-fill me-2"></i>JobHunter
      </a>

      <!-- Toggle Button -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar Links -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/jobs">Explore Jobs</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/create-job"
              >Create Jobs</router-link
            >
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              Help Center
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="/faq">FAQ</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/contact"
                  >Contact Us</router-link
                >
              </li>
            </ul>
          </li>
        </ul>

        <!-- Auth Buttons -->
        <div class="d-flex gap-2">
          <router-link to="/login" class="btn btn-outline-primary"
            >Login</router-link
          >
          <router-link to="/signup" class="btn btn-primary"
            >Sign Up</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped>
.navbar {
  z-index: 1000;
}
</style>
