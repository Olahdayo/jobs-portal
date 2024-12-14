<template>
  <div class="sidebar">
    <!-- Recent Postings -->
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
          <small class="text-muted">Posted {{ formatDate(job.postedDate) }}</small>
        </a>
      </div>
    </div>

    <!-- Jobs by State -->
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

    <!-- Popular Categories -->
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
</template>

<script>
export default {
  props: {
    recentPostings: Array,
    jobsByState: Object,
    jobsByField: Object,
    formatDate: Function,
  },
};
</script>

<style scoped>
/* Sidebar styles */
.sidebar {
  position: relative;
  margin-top: -20px;
  max-height: calc(100vh - 40px);
  z-index: 1000;
}

/* Remove overflow property to show all content */
.sidebar-widget {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
}

.list-group-item {
  background: #f8f9fa;
  transition: background-color 0.2s;
}

.list-group-item:hover {
  background: #e9ecef;
}
</style> 