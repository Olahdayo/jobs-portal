<template>
  <div>
    <!-- Search Section -->
    <section class="search-section bg-light sticky-top">
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
                  <div class="col-md-3 d-none d-md-block">
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
                  <div class="col-md-2 d-none d-md-block">
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
                  </div>
                  <div class="col-12 col-md-2">
                    <button type="submit" class="btn btn-primary w-100">
                      <i class="bi bi-search me-2"></i>Search
                    </button>
                  </div>
                  <!-- Mobile Filter Button -->
                  <div class="col-12 d-md-none mt-1">
                    <button
                      type="button"
                      class="btn btn-outline-primary w-100"
                      @click="showMobileFilters = true"
                    >
                      <i class="bi bi-funnel me-2"></i>More Filters
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mobile Filters Modal -->
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

    <!-- Featured Jobs -->
    <section class="py-5">
      <div class="container">
        <h2 class="mb-4">Featured Jobs</h2>
        <div class="row">
          <div class="col-md-4 mb-4" v-for="job in featuredJobs" :key="job.id">
            <div class="card h-100">
              <div class="card-body">
                <div class="d-flex align-items-center mb-3">
                  <img
                    :src="job.companyLogo"
                    alt="Company Logo"
                    class="company-logo me-3"
                  />
                  <div>
                    <h5 class="card-title mb-1">{{ job.title }}</h5>
                    <h6 class="text-muted">{{ job.company }}</h6>
                  </div>
                </div>
                <p class="card-text">{{ job.description }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="badge bg-light text-dark">{{
                    job.location
                  }}</span>
                  <span class="text-primary">{{ job.salary }}/year</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest Jobs -->
    <section class="py-5 bg-light">
      <div class="container">
        <h2 class="mb-4">Latest Jobs</h2>
        <div class="row">
          <div class="col-md-6 mb-4" v-for="job in latestJobs" :key="job.id">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div>
                    <h5 class="card-title">{{ job.title }}</h5>
                    <h6 class="text-muted">{{ job.company }}</h6>
                  </div>
                  <img
                    :src="job.companyLogo"
                    alt="Company Logo"
                    class="company-logo"
                  />
                </div>
                <p class="card-text mt-3">{{ job.description }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <span class="badge bg-light text-dark me-2">{{
                      job.location
                    }}</span>
                    <span class="badge bg-light text-dark">{{ job.type }}</span>
                  </div>
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
  </div>
</template>

<script>
import { useJobsStore } from "@/stores/jobs";

export default {
  name: "Home",
  data() {
    return {
      searchFilters: {
        query: "",
        location: "",
        field: "",
        education: "",
        jobType: "",
      },
      showMobileFilters: false,
    };
  },
  computed: {
    featuredJobs() {
      return this.jobsStore.getFeaturedJobs();
    },
    latestJobs() {
      return this.jobsStore.getLatestJobs();
    },
  },
  methods: {
    handleSearch() {
      this.jobsStore.searchFilters = { ...this.searchFilters };
      this.jobsStore.filterJobs();
      this.$router.push("/jobs");
    },
    applyMobileFilters() {
      this.showMobileFilters = false;
      this.handleSearch();
    },
  },
  setup() {
    const jobsStore = useJobsStore();
    jobsStore.initializeJobs();
    return { jobsStore };
  },
};
</script>

<style scoped>
.search-section {
  margin-top: -24px;
  z-index: 1000;
  padding: 0.5rem 0;
}

.search-section.sticky-top {
  margin-top: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.25rem 0;
}

/* Modal styles for mobile filters */
@media (max-width: 767px) {
  .modal.show {
    display: block;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .search-section .card {
    border: none;
    box-shadow: none !important;
  }

  .search-section .card-body {
    padding: 0.25rem 0.5rem;
  }

  .search-section input,
  .search-section button {
    height: 35px;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }
}

.company-logo {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
}
</style>
