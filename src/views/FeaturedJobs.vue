<template>
  <div class="container py-5">
    <h1 class="mb-4">Featured Jobs</h1>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="job in featuredJobs" :key="job.id">
        <div class="card border-0 shadow-sm h-100">
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
              <span class="badge bg-light text-dark">{{ job.location }}</span>
              <span class="text-primary">{{ job.salary }}/year</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useJobsStore } from '@/stores/jobs'

export default {
  name: 'FeaturedJobs',
  computed: {
    featuredJobs() {
      return this.jobsStore.getAllFeaturedJobs()
    }
  },
  setup() {
    const jobsStore = useJobsStore()
    return { jobsStore }
  }
}
</script>

<style scoped>
.company-logo {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
</style> 