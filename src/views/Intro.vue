<template>
  <div>我是<span>{{projectName}}</span>，我是{{projectOwner}}。</div>
</template>

<script>
import { ProjectName, ProjectOwner } from '../constants/index.js'

export default {
  name: 'Intro',
  computed: {
    projectName() {
      return ProjectName[process.env.PROJECT_ENV]
    },
    projectOwner() {
      return ProjectOwner[process.env.PROJECT_ENV]
    }
  }
}
</script>