<template>
  <div>
    <!-- Search Form -->
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
          <select
            class="form-select form-select-sm"
            v-model="searchFilters.location"
          >
            <option value="">Select Location</option>
            <option
              v-for="location in filterOptions.locations"
              :key="location"
            >
              {{ location }}
            </option>
          </select>
        </div>
        <div class="col-sm-6">
          <select
            class="form-select form-select-sm"
            v-model="searchFilters.field"
          >
            <option value="">Select Field</option>
            <option
              v-for="field in filterOptions.fields"
              :key="field"
            >
              {{ field }}
            </option>
          </select>
        </div>
        <div class="col-sm-6">
          <select
            class="form-select form-select-sm"
            v-model="searchFilters.education"
          >
            <option value="">Education Level</option>
            <option
              v-for="level in filterOptions.educationLevels"
              :key="level"
            >
              {{ level }}
            </option>
          </select>
        </div>
        <div class="col-sm-6">
          <select
            class="form-select form-select-sm"
            v-model="searchFilters.jobType"
          >
            <option value="">Job Type</option>
            <option
              v-for="type in filterOptions.jobTypes"
              :key="type"
            >
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
</template>

<script>
export default {
  props: {
    searchFilters: Object,
    filterOptions: Object,
    handleSearch: Function,
  },
};
</script>

<style scoped>
/* Add any specific styles for the forms here */
</style>
