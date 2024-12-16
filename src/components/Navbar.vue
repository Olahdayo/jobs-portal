<template>
  <nav
    class="navbar navbar-expand-lg bg-white navbar-light sticky-top shadow-sm"
    :class="{ 'navbar-scrolled': isScrolled }"
  >
    <div class="container-fluid">
      <a class="navbar-brand fw-bold text-primary" href="/">
        <i class="bi bi-briefcase-fill me-2"></i>NestHub
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
        </ul>

        <!-- Search Filter Moved Here -->
        <div class="d-flex align-items-center me-3">
          <input
            type="text"
            class="form-control form-control-sm me-2"
            placeholder="Job title or company"
            v-model="searchFilters.query"
            @input="handleInput"
            @focus="showDropdown = true"
          />
          <div class="position-relative">
            <input
              type="text"
              class="form-control form-control-sm me-2"
              placeholder="Location"
              v-model="searchFilters.location"
              @focus="showDropdown = true"
              @input="handleLocationInput"
              @blur="hideDropdown"
            />
          </div>
          <button
            class="btn btn-primary btn-sm btn-search"
            @click="handleSearch"
          >
            <i class="bi bi-search me-1"></i>Search
          </button>
        </div>

        <!-- Auth Buttons -->
        <div class="d-flex gap-2">
          <Button to="/login" label="Login" buttonType="btn-outline-primary" size="btn-sm" />
          <Button to="/signup" label="Sign Up" buttonType="btn-primary" size="btn-sm" />
        </div>
      </div>
    </div>

    <!-- Display Filtered Jobs in a Centered Dropdown -->
    <div v-if="showDropdown" class="job-dropdown">
      <div class="dropdown-content">
        <h5>Filtered Jobs:</h5>
        <ul class="list-group">
          <li v-for="job in filteredJobs" :key="job.id" class="list-group-item">
            <Button 
              :to="'/jobs/' + job.id" 
              :label="job.title + ' - ' + job.location" 
              buttonType="btn-link" 
              class="no-underline"
            />
          </li>
          <li v-if="filteredJobs.length === 0 && (searchFilters.query || searchFilters.location)" class="list-group-item text-danger">
            No jobs found.
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useJobsStore } from "@/stores/jobs";
import { useRouter } from "vue-router";
import Button from "@/components/Button.vue";
import filterOptions from '@/data/filterOptions.json'; 

export default {
  name: "Navbar",
  components: {
    Button,
  },
  data() {
    return {
      showSearch: false,
      showDropdown: false,
      searchFilters: {
        query: "",
        location: "", 
        education: [],
        field: [],
        jobType: [],
      },
      isScrolled: false,
      filterOptions, 
      showLocationDropdown: false,
    };
  },
  setup() {
    const jobsStore = useJobsStore();
    const router = useRouter();
    return { jobsStore, router };
  },
  computed: {
    filteredJobs() {
      return this.jobsStore.jobs.filter(job => {
        const matchesQuery = job.title.toLowerCase().includes(this.searchFilters.query.toLowerCase()) ||
                             job.company.toLowerCase().includes(this.searchFilters.query.toLowerCase());
        const matchesLocation = job.location.toLowerCase().includes(this.searchFilters.location.toLowerCase());
        return matchesQuery && matchesLocation;
      });
    },
  },
  methods: {
    hideDropdown() {
      setTimeout(() => {
        this.showLocationDropdown = false;
      }, 100);
    },
    handleSearch() {
      this.jobsStore.searchFilters = { ...this.searchFilters };
      this.jobsStore.filterJobs(); 
      this.showDropdown = this.filteredJobs.length > 0;
      this.$router.push("/jobs");
    },
    handleInput() {
      this.showDropdown = true;
    },
    handleLocationInput() {
      this.showDropdown = true;
    },
    handleClickOutside(event) {
      const dropdown = this.$el.querySelector('.job-dropdown');
      const searchInput = this.$el.querySelector('input[placeholder="Job title or company"]');
      const locationInput = this.$el.querySelector('input[placeholder="Location"]');

      if (!dropdown.contains(event.target) && !searchInput.contains(event.target) && !locationInput.contains(event.target)) {
        this.showDropdown = false;
        this.searchFilters.query = "";
        this.searchFilters.location = "";
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("click", this.handleClickOutside);
    const jobsStore = useJobsStore();
    this.filterOptions = jobsStore.filterOptions; 
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("click", this.handleClickOutside);
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

/* Remove underline from links */
.no-underline {
  text-decoration: none !important; /* Remove underline */
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

/* Add your styles here */
.navbar .form-control {
  width: 150px; /* Adjust width for the location input */
}

.navbar .btn-search {
  padding: 0.25rem 0.5rem; /* Adjust padding for smaller button */
  font-size: 0.875rem; /* Adjust font size if needed */
}

.dropdown-menu {
  max-height: 200px; /* Limit height of dropdown */
  overflow-y: auto; /* Enable scrolling if needed */
}

/* Centered Dropdown for Filtered Jobs */
.job-dropdown {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1050; /* Above other elements */
  width: 300px; /* Set a width for the dropdown */
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.dropdown-content {
  max-height: 300px; /* Limit height of dropdown */
  overflow-y: auto; /* Enable scrolling if needed */
}
</style>
