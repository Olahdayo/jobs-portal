<template>
  <nav
    class="navbar navbar-expand-lg bg-white navbar-light sticky-top shadow-sm"
    :class="{ 'navbar-scrolled': isScrolled }"
  >
    <div class="container-fluid">
      <a class="navbar-brand fw-bold text-primary" href="/">
        <i class="bi bi-briefcase-fill me-2"></i>JobHunter
      </a>

      <!-- Navbar Links -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/jobs">Explore Jobs</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/create-job">Create Jobs</router-link>
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
                <router-link class="dropdown-item" to="/contact">Contact Us</router-link>
              </li>
            </ul>
          </li>
          <!-- Search Icon Moved Here -->
          <div class="nav-item dropdown order-lg-last ms-lg-3 me-2">
            <button
              class="btn btn-link text-dark p-0 position-relative"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-search fs-5"></i>
            </button>
            <!-- Search Dropdown -->
            <div class="dropdown-menu dropdown-menu-end p-3 mt-1 shadow-sm search-dropdown">
              <form @submit.prevent="handleSearch" class="search-form">
                <!-- ... existing search form code ... -->
              </form>
            </div>
          </div>
        </ul>

        <!-- Auth Buttons -->
        <div class="d-flex gap-2">
          <Button to="/login" label="Login" buttonType="btn-outline-primary" size="btn-sm" />
          <Button to="/signup" label="Sign Up" buttonType="btn-primary" size="btn-sm" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useJobsStore } from "@/stores/jobs";
import { useRouter } from "vue-router";
import Button from "@/components/Button.vue";
import Forms from "@/components/Forms.vue";

export default {
  name: "Navbar",
  components: {
    Button,
    Forms,
  },
  data() {
    return {
      isScrolled: false,
      searchFilters: {
        query: "",
        location: "",
        field: "",
        education: "",
        jobType: "",
      },
      filterOptions: {
        locations: [],
        fields: [],
        educationLevels: [],
        jobTypes: [],
      },
    };
  },
  setup() {
    const jobsStore = useJobsStore();
    const router = useRouter();
    return { jobsStore, router };
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 100;
    },
    handleSearch() {
      this.jobsStore.searchFilters = { ...this.searchFilters };
      this.jobsStore.filterJobs();
      this.router.push("/jobs");
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    const jobsStore = useJobsStore();
    this.filterOptions.locations = jobsStore.filterOptions.locations;
    this.filterOptions.fields = jobsStore.filterOptions.fields;
    this.filterOptions.educationLevels = jobsStore.filterOptions.educationLevels;
    this.filterOptions.jobTypes = jobsStore.filterOptions.jobTypes;
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.navbar {
  z-index: 1030;
  height: 72px;
  transition: all 0.3s ease;
  border-bottom: none;
}

.navbar.navbar-scrolled {
  height: 56px;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

.navbar.navbar-scrolled .navbar-brand {
  font-size: 1.1rem;
}

/* Align brand logo to the left and remove left margin */
.navbar-brand {
  margin-left: 0; 
  padding-left: 0;
}

/* Add space between brand and nav links */
.navbar-nav {
  margin-left: 20px; 
}

/* Search dropdown styles */
.search-dropdown {
  width: 320px;
  border: none;
  border-radius: 8px;
}

@media (max-width: 991.98px) {
  .search-dropdown {
    position: fixed !important;
    top: 60px !important;
    left: 0 !important;
    right: 0 !important;
    width: auto !important;
    margin: 0 1rem !important;
  }
}

@media (max-width: 991.98px) {
  .navbar {
    height: 56px;
  }
}
</style>
