pipeline {
  agent any

  stages {
    stage('Checkout Code') {
      steps {
        git 'https://github.com/zainikhan999/DevOps_semester_project'
      }
    }

    stage('Build Containers') {
      steps {
        sh 'docker-compose build'
      }
    }

    stage('Run Containers') {
      steps {
        sh 'docker-compose up -d'
      }
    }

    stage('Test App') {
      steps {
        sh 'curl http://localhost:3000'
      }
    }
  }
}
