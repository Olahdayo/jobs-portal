<template>
  <nav
    class="navbar navbar-expand-lg bg-white navbar-light sticky-top shadow-sm"
    :class="{ 'navbar-scrolled': isScrolled }"
  >
    <div class="container">
      <!-- Brand -->
      <a class="navbar-brand fw-bold text-primary" href="/">
        <i class="bi bi-briefcase-fill me-2"></i>JobHunter
      </a>

      <!-- Navbar Links -->
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
                <div class="mb-2">
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="Job title or company"
                    v-model="searchFilters.query"
                  />
                </div>
                <div class="row g-2">
                  <div class="col-sm-6">
                    <select class="form-select form-select-sm" v-model="searchFilters.location">
                      <option value="">Select Location</option>
                      <option v-for="location in jobsStore.filterOptions.locations" :key="location">
                        {{ location }}
                      </option>
                    </select>
                  </div>
                  <div class="col-sm-6">
                    <select class="form-select form-select-sm" v-model="searchFilters.field">
                      <option value="">Select Field</option>
                      <option v-for="field in jobsStore.filterOptions.fields" :key="field">
                        {{ field }}
                      </option>
                    </select>
                  </div>
                  <div class="col-sm-6">
                    <select class="form-select form-select-sm" v-model="searchFilters.education">
                      <option value="">Education Level</option>
                      <option v-for="level in jobsStore.filterOptions.educationLevels" :key="level">
                        {{ level }}
                      </option>
                    </select>
                  </div>
                  <div class="col-sm-6">
                    <select class="form-select form-select-sm" v-model="searchFilters.jobType">
                      <option value="">Job Type</option>
                      <option v-for="type in jobsStore.filterOptions.jobTypes" :key="type">
                        {{ type }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="mt-3 d-flex justify-content-end">
                  <button type="submit" class="btn btn-primary btn-sm">
                    <i class="bi bi-search me-1"></i>Search Jobs
                  </button>
                </div>
              </form>
            </div>
          </div>
        </ul>

        <!-- Auth Buttons -->
        <div class="d-flex gap-2">
          <router-link to="/login" class="btn btn-outline-primary">Login</router-link>
          <router-link to="/signup" class="btn btn-primary">Sign Up</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useJobsStore } from '@/stores/jobs'
import { useRouter } from 'vue-router'

export default {
  name: "Navbar",
  data() {
    return {
      isScrolled: false,
      searchFilters: {
        query: '',
        location: '',
        field: '',
        education: '',
        jobType: ''
      }
    }
  },
  setup() {
    const jobsStore = useJobsStore()
    const router = useRouter()
    return { jobsStore, router }
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 100
    },
    handleSearch() {
      this.jobsStore.searchFilters = { ...this.searchFilters }
      this.jobsStore.filterJobs()
      this.router.push('/jobs')
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll)
  }
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
