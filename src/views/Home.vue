<template>
  <div>
    <!-- Welcome hero section with a cool gradient background -->
    <section class="hero-section text-white position-relative">
      <div class="hero-overlay"></div>
      <div class="container position-relative">
        <div class="row min-vh-75 align-items-center py-5">
          <div class="col-lg-8 text-center text-lg-start">
            <h1 class="display-4 fw-bold mb-4">
              Find Your Dream Job in Nigeria
            </h1>
            <p class="lead mb-4">
              Discover thousands of job opportunities across Nigeria. From
              tech to finance, entry-level to executive positions - your next
              career move starts here.
            </p>
            <div
              class="d-flex gap-3 justify-content-center justify-content-lg-start"
            >
              <a href="#featured-jobs" class="btn btn-light btn-lg">
                <i class="bi bi-search me-2"></i>Hunt Jobs
              </a>
              <router-link to="/signup" class="btn btn-outline-light btn-lg">
                <i class="bi bi-person-plus me-2"></i>Join Us
              </router-link>
            </div>
          </div>
          <div class="col-lg-4 d-none d-lg-block">
            <div class="hero-stats p-4 bg-white text-dark rounded-3 shadow">
              <h4 class="mb-3">Quick Stats</h4>
              <div class="d-flex justify-content-between mb-3">
                <div class="text-center">
                  <h3 class="fw-bold text-primary">
                    {{ jobsStore.jobs.length }}
                  </h3>
                  <p class="text-muted mb-0">Active Jobs</p>
                </div>
                <div class="text-center">
                  <h3 class="fw-bold text-primary">
                    {{ Object.keys(jobsByState).length }}
                  </h3>
                  <p class="text-muted mb-0">Locations</p>
                </div>
                <div class="text-center">
                  <h3 class="fw-bold text-primary">
                    {{ Object.keys(jobsByField).length }}
                  </h3>
                  <p class="text-muted mb-0">Categories</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Search bar section -->
    <section class="search-section bg-light sticky-top" style="top: 0;">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <div class="card border-0 shadow-sm">
              <div class="card-body">
                <form
                  @submit.prevent="handleSearch"
                  class="row g-2 align-items-center"
                >
                  <div class="col-12 col-md-3">
                    <input
                      type="text"
                      class="form-control"
                      size="sm"
                      placeholder="Job title or company"
                      v-model="searchFilters.query"
                    />
                  </div>
                  <div class="col-md-2 d-none d-md-block">
                    <select
                      class="form-select form-select-sm"
                      v-model="searchFilters.location"
                    >
                      <option value="">Select Location</option>
                      <option
                        v-for="location in jobsStore.filterOptions.locations"
                        :key="location"
                        :value="location"
                      >
                        {{ location }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-2 d-none d-md-block">
                    <select
                      class="form-select form-select-sm"
                      v-model="searchFilters.field"
                    >
                      <option value="">Select Field</option>
                      <option
                        v-for="field in jobsStore.filterOptions.fields"
                        :key="field"
                        :value="field"
                      >
                        {{ field }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-2 d-none d-md-block">
                    <select
                      class="form-select form-select-sm"
                      v-model="searchFilters.education"
                    >
                      <option value="">Education Level</option>
                      <option
                        v-for="level in jobsStore.filterOptions.educationLevels"
                        :key="level"
                        :value="level"
                      >
                        {{ level }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-2 d-none d-md-block position-relative">
                    <select
                      class="form-select form-select-sm"
                      v-model="searchFilters.jobType"
                    >
                      <option value="">Job Type</option>
                      <option
                        v-for="type in jobsStore.filterOptions.jobTypes"
                        :key="type"
                        :value="type"
                      >
                        {{ type }}
                      </option>
                    </select>
                    <button
                      type="submit"
                      class="btn btn-primary rounded-circle position-absolute top-50 translate-middle-y"
                      style="width: 32px; height: 32px; right: -40px"
                    >
                      <i class="bi bi-search"></i>
                    </button>
                  </div>
                  <!-- Mobile Filter Button -->
                  <div class="col-12 d-md-none mt-1">
                    <div class="d-flex gap-2">
                      <button
                        type="submit"
                        class="btn btn-primary rounded-circle flex-shrink-0"
                        style="width: 35px; height: 35px"
                      >
                        <i class="bi bi-search"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-primary flex-grow-1"
                        @click="showMobileFilters = true"
                      >
                        <i class="bi bi-funnel me-2"></i>More Filters
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- This popup shows extra filters on mobile - helps save space! -->
    <div
      class="modal fade"
      id="mobileFiltersModal"
      tabindex="-1"
      :class="{ show: showMobileFilters }"
      v-if="showMobileFilters"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Filter Jobs</h5>
            <button
              type="button"
              class="btn-close"
              @click="showMobileFilters = false"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Location</label>
              <select class="form-select" v-model="searchFilters.location">
                <option value="">Select Location</option>
                <option
                  v-for="location in jobsStore.filterOptions.locations"
                  :key="location"
                  :value="location"
                >
                  {{ location }}
                </option>
              </select>
            </div>
            <!-- Repeat for other filters -->
            <div class="mb-3">
              <label class="form-label">Field</label>
              <select class="form-select" v-model="searchFilters.field">
                <option value="">Select Field</option>
                <option
                  v-for="field in jobsStore.filterOptions.fields"
                  :key="field"
                  :value="field"
                >
                  {{ field }}
                </option>
              </select>
            </div>
            <!-- Add education and job type filters similarly -->
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="showMobileFilters = false"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="applyMobileFilters"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>

    <div id="job-section" class="container py-5">
      <!-- VIP Jobs - These are the special featured ones -->
      <div id="featured-jobs"></div>
      <section class="mb-5">
        <div class="featured-jobs-container border rounded-3 bg-white p-4">
          <div class="mb-4">
            <h2 class="m-0">Featured Jobs</h2>
          </div>
          <div class="row g-3">
            <div class="col-md-6" v-for="job in featuredJobs" :key="job.id">
              <div class="job-card border-0 shadow-sm p-3 bg-white">
                <div class="d-flex align-items-start gap-3">
                  <img
                    :src="job.companyLogo"
                    alt="Company Logo"
                    class="company-logo flex-shrink-0"
                    width="40"
                    height="40"
                  />
                  <div>
                    <h5 class="mb-1">{{ job.title }}</h5>
                    <p class="text-muted mb-2 small">{{ job.company }}</p>
                    <div class="d-flex gap-2">
                      <span class="badge bg-light text-dark">{{
                        job.location
                      }}</span>
                      <span class="badge bg-light text-dark">{{
                        job.type
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center mt-4 pt-3 border-top">
            <router-link
              to="/featured-jobs"
              class="btn btn-outline-primary"
            >
              See All Featured Jobs
            </router-link>
          </div>
        </div>
      </section>

      <!-- Fresh Jobs - Shows the most recent postings -->
      <section>
        <h2 class="mb-4">Latest Jobs</h2>
        <div class="row g-3">
          <div class="col-12" v-for="job in latestJobs" :key="job.id">
            <div class="job-card border-0 shadow-sm p-4 bg-white">
              <div class="d-flex align-items-start gap-4">
                <img
                  :src="job.companyLogo"
                  alt="Company Logo"
                  class="company-logo flex-shrink-0"
                  width="60"
                  height="60"
                />
                <div>
                  <h5 class="mb-1">{{ job.title }}</h5>
                  <p class="text-muted mb-2 small">{{ job.company }}</p>
                  <p class="text-muted mb-2 small">
                    <i class="bi bi-calendar3 me-2"></i>
                    {{ formatJobDate(job.postedDate) }}
                  </p>
                  <p class="mb-3">{{ job.description }}</p>
                  <div class="d-flex gap-2">
                    <span class="badge bg-light text-dark">{{
                      job.location
                    }}</span>
                    <span class="badge bg-light text-dark">{{
                      job.type
                    }}</span>
                    <span class="badge bg-light text-dark"
                      >{{ job.salary }}/year</span
                    >
                  </div>
                  <div class="mt-3">
                    <router-link
                      :to="'/jobs/' + job.id"
                      class="btn btn-outline-primary btn-sm"
                    >
                      View Details
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Right side - Quick stats and filters -->
      <div class="col-lg-4">
        <div class="sticky-sidebar custom-scrollbar">
          <!-- Super fresh jobs - Just posted! -->
          <div class="sidebar-widget mb-4">
            <h4 class="mb-3">Recent Postings</h4>
            <div class="list-group">
              <a
                v-for="job in recentPostings"
                :key="job.id"
                href="#"
                class="list-group-item list-group-item-action border-0 mb-2 rounded"
              >
                <h6 class="mb-1">{{ job.title }}</h6>
                <p class="mb-1 small text-muted">{{ job.company }}</p>
                <small class="text-muted"
                  >Posted {{ formatDate(job.postedDate) }}</small
                >
              </a>
            </div>
          </div>

          <!-- Jobs grouped by states - helps find local work -->
          <div class="sidebar-widget mb-4">
            <h4 class="mb-3">Jobs by State</h4>
            <div class="list-group">
              <a
                v-for="(count, state) in jobsByState"
                :key="state"
                href="#"
                class="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center mb-2 rounded"
              >
                {{ state }}
                <span class="badge bg-primary rounded-pill">{{ count }}</span>
              </a>
            </div>
          </div>

          <!-- Most popular job types - what's hot right now -->
          <div class="sidebar-widget">
            <h4 class="mb-3">Popular Categories</h4>
            <div class="list-group">
              <a
                v-for="(count, field) in jobsByField"
                :key="field"
                href="#"
                class="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center mb-2 rounded"
              >
                {{ field }}
                <span class="badge bg-primary rounded-pill">{{ count }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useJobsStore } from "@/stores/jobs";

export default {
  name: "Home",
  data() {
    return {
      // These are the filters users can play with to find their perfect job
      searchFilters: {
        query: "",
        location: "",
        field: "",
        education: "",
        jobType: "",
      },
      // Controls if the mobile filter menu is showing or not
      showMobileFilters: false,
    };
  },
  computed: {
    // Grabs the special featured jobs - limited to 6 to keep it snappy
    featuredJobs() {
      return this.jobsStore.getFeaturedJobs();
    },
    // Gets the newest jobs - fresh off the press!
    latestJobs() {
      return this.jobsStore.getLatestJobs();
    },
    // Super fresh jobs for the sidebar - just the last 5
    recentPostings() {
      return [...this.jobsStore.jobs]
        .sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
        .slice(0, 5);
    },
    // Counts how many jobs we have in each state
    jobsByState() {
      return this.jobsStore.jobs.reduce((acc, job) => {
        acc[job.location] = (acc[job.location] || 0) + 1;
        return acc;
      }, {});
    },
    // Finds the most popular job categories - top 5 only
    jobsByField() {
      const fields = this.jobsStore.jobs.reduce((acc, job) => {
        acc[job.field] = (acc[job.field] || 0) + 1;
        return acc;
      }, {});

      // Sort by count and get top 5
      return Object.fromEntries(
        Object.entries(fields)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
      );
    },
  },
  methods: {
    // When someone hits the search button - let's find them some jobs!
    handleSearch() {
      this.jobsStore.searchFilters = { ...this.searchFilters };
      this.jobsStore.filterJobs();
      this.$router.push("/jobs");
    },
    // Handles the mobile filter menu submission
    applyMobileFilters() {
      this.showMobileFilters = false;
      this.handleSearch();
    },
    // Formats the date to show like "13 December"
    formatJobDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "long" });
      return `${day} ${month}`;
    },
    // Makes dates look nice and friendly - like "2 days ago" instead of a boring date
    formatDate(dateString) {
      const days = Math.floor(
        (new Date() - new Date(dateString)) / (1000 * 60 * 60 * 24)
      );
      return days === 0
        ? "Today"
        : days === 1
        ? "Yesterday"
        : `${days} days ago`;
    },
  },
  setup() {
    // Gets everything ready when the page loads
    const jobsStore = useJobsStore();
    jobsStore.initializeJobs();
    return { jobsStore };
  },
};
</script>

<style scoped>
/* Hero section styles */
.hero-section {
  background: linear-gradient(135deg, #1e88e5 0%, #1565c0 100%);
  position: relative;
  overflow: hidden;
  min-height: 400px;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("/hero-pattern.svg") center/cover;
  opacity: 0.1;
}

.min-vh-75 {
  min-height: 75vh;
}

.hero-stats {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95) !important;
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Update search section styles */
.search-section {
  padding: 1rem 0;
  z-index: 1020;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  background-color: rgba(248, 249, 250, 0.95);
  backdrop-filter: blur(8px);
  transform: translateY(72px);
  transition: transform 0.2s;
}

.company-logo {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
}

.form-control {
  padding-right: 2.5rem;
}

.btn-link:hover {
  background: none;
}

.btn-link i {
  font-size: 1rem;
}

.btn i {
  font-size: 1rem;
}

.btn.rounded-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

/* Makes job cards look nice and bouncy on hover */
.job-card {
  transition: transform 0.2s;
  cursor: pointer;
  border-radius: 8px;
}

.job-card:hover {
  transform: translateY(-2px);
}

/* Sidebar stuff - keeps it in view while scrolling */
.sticky-sidebar {
  position: sticky;
  top: 100px;
}

.sidebar-widget {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.list-group-item {
  background: #f8f9fa;
  transition: background-color 0.2s;
}

.list-group-item:hover {
  background: #e9ecef;
}

@media (max-width: 991.98px) {
  .sticky-sidebar {
    position: static;
    margin-top: 2rem;
  }
}

.featured-jobs-container {
  border: 1px solid #e5e5e5;
}

/* Pretty scrollbar that doesn't take up too much space */
.custom-scrollbar {
  max-height: calc(100vh - 150px);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Adjust spacing when search bar becomes sticky */
.search-section.sticky-top {
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transform: translateY(72px);
}

/* Adjust for mobile screens */
@media (max-width: 991.98px) {
  .search-section {
    transform: translateY(56px);
  }
  .search-section.sticky-top {
    transform: translateY(56px);
  }
}
</style>
