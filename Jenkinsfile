pipeline {
  agent any

  stages {
    stage('Checkout Code') {
      steps {
        git branch: 'main', url: 'https://github.com/zainikhan999/DevOps_semester_project'
      }
    }

    stage('Build Containers') {
      steps {
        sh 'docker-compose.yml build'
      }
    }

    stage('Run Containers') {
      steps {
        sh 'docker-compose.yml up -d'
      }
    }

    stage('Test App') {
      steps {
        sh 'curl http://localhost:3000'
      }
    }
  }
}
