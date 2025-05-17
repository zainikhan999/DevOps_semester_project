pipeline {
  agent any

  stages {
    stage('Checkout Code') {
      steps {
        git branch: 'main', url: 'https://github.com/zainikhan999/DevOps_semester_project'
      }
    }
    stage('Check Docker') {
       steps {
    sh 'which docker || echo "Docker not installed"'
    sh 'docker --version || echo "Docker not working"'
    sh 'docker compose version || echo "Docker Compose not working"'
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
    sh '''
      echo "Checking if frontend container is ready..."
      for i in {1..15}; do
        if docker-compose exec frontend curl -s http://localhost:3000; then
          echo "App is up!"
          break
        else
          echo "Waiting for app to be ready..."
          sleep 2
        fi
      done
    '''
  }
}


  }
}
