<template>
  <a :href="repoUrl" 
     target="_blank" 
     rel="noopener noreferrer"
     class="source-link">
    <svg height="20" width="20" viewBox="0 0 16 16" class="github-icon">
      <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
    </svg>
    View Code in GitHub
  </a>
</template>

<script>
export default {
  name: 'SourceLink',
  props: {
    repoUrl: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.source-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #333;
  color: white;
  color: rgba(255, 255, 255, 0.5);
  padding: 8px 12px;
  border-radius: 5px;
/*  background-color: #f6f8fa;
  background-color: black;*/
  border: 1px solid #d1d5da;
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: background-color 0.2s;
  z-index: 1000;
  font-size: 15px;
}

.source-link:hover {
  background-color: #444444;
  color: white;
  border: 1px solid white;
}

.github-icon {
  display: inline-block;
}

</style> 